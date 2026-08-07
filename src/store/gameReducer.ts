import { GameState, GameAction } from '../types';

export function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'TICK_SECOND': {
            let nextSeconds = state.secondsRemaining - 1;
            if (nextSeconds <= 0) {
                return performMarketTick({ ...state, secondsRemaining: 300 });
            }
            return { ...state, secondsRemaining: nextSeconds };
        }
        case 'FAST_FORWARD': {
            return performMarketTick({ ...state, secondsRemaining: 300 });
        }
        case 'BUY_CARD': {
            const { id, quantity } = action.payload;
            const card = state.activeCards.find(c => c.id === id);
            if (!card) return state;
            
            const cost = card.currentPrice * quantity;
            if (state.cash < cost) return state;
            if (state.secondsRemaining <= 60) return state; // Lockout
            
            let newOwned = [...state.ownedCards];
            const existingIndex = newOwned.findIndex(c => c.id === id && c.season === card.season && !c.isLiquidated);
            
            if (existingIndex >= 0) {
                const existing = { ...newOwned[existingIndex] };
                const totalCost = (existing.quantity * existing.averageBuyPrice) + cost;
                const newQuantity = existing.quantity + quantity;
                existing.averageBuyPrice = totalCost / newQuantity;
                existing.quantity = newQuantity;
                newOwned[existingIndex] = existing;
            } else {
                newOwned.push({
                    id: card.id,
                    name: card.name,
                    season: card.season,
                    quantity,
                    averageBuyPrice: card.currentPrice,
                    isLiquidated: false
                });
            }
            
            return {
                ...state,
                cash: state.cash - cost,
                ownedCards: newOwned
            };
        }
        case 'SELL_CARD': {
            const { id, season, quantity } = action.payload;
            
            if (state.secondsRemaining <= 60) return state; // Lockout

            let newOwned = [...state.ownedCards];
            const existingIndex = newOwned.findIndex(c => c.id === id && c.season === season);
            if (existingIndex === -1) return state;
            
            const existing = { ...newOwned[existingIndex] };
            if (existing.quantity < quantity) return state;
            
            // Determine price
            let sellPrice = 50; // Fallback
            if (existing.isLiquidated && existing.liquidatedPrice !== undefined) {
                sellPrice = existing.liquidatedPrice;
            } else {
                const card = state.activeCards.find(c => c.id === id && c.season === season);
                if (card) {
                    sellPrice = card.currentPrice;
                }
            }
            
            const revenue = sellPrice * quantity;
            
            existing.quantity -= quantity;
            if (existing.quantity === 0) {
                newOwned.splice(existingIndex, 1);
            } else {
                newOwned[existingIndex] = existing;
            }
            
            return {
                ...state,
                cash: state.cash + revenue,
                ownedCards: newOwned
            };
        }
        case 'BUY_PACKS': {
            const { amount } = action.payload;
            if (state.secondsRemaining <= 60) return state;
            
            const packPrice = Math.floor(state.activeCards.reduce((sum, c) => sum + c.currentPrice, 0) / 10);
            const cost = packPrice * amount;
            
            if (state.cash < cost) return state;
            
            if (state.autoOpenPacks) {
                const newState = { ...state, cash: state.cash - cost };
                return openPacks(newState, amount, cost);
            }
            
            const totalPacksCost = (state.packsOwned * state.packsAverageBuyPrice) + cost;
            const newPacksOwned = state.packsOwned + amount;
            
            return {
                ...state,
                cash: state.cash - cost,
                packsOwned: newPacksOwned,
                packsAverageBuyPrice: totalPacksCost / newPacksOwned
            };
        }
        case 'SELL_PACKS': {
            const { amount } = action.payload;
            if (state.secondsRemaining <= 60) return state;
            if (state.packsOwned < amount) return state;
            
            const packPrice = Math.floor(state.activeCards.reduce((sum, c) => sum + c.currentPrice, 0) / 10);
            const revenue = packPrice * amount;
            
            const newPacksOwned = state.packsOwned - amount;
            
            return {
                ...state,
                cash: state.cash + revenue,
                packsOwned: newPacksOwned,
                packsAverageBuyPrice: newPacksOwned === 0 ? 0 : state.packsAverageBuyPrice
            };
        }
        case 'OPEN_PACKS': {
            const { amount } = action.payload;
            if (state.secondsRemaining <= 60) return state;
            if (state.packsOwned < amount) return state;
            
            const cost = amount * state.packsAverageBuyPrice;
            const newPacksOwned = state.packsOwned - amount;
            
            const newState = { 
                ...state, 
                packsOwned: newPacksOwned,
                packsAverageBuyPrice: newPacksOwned === 0 ? 0 : state.packsAverageBuyPrice
            };
            return openPacks(newState, amount, cost);
        }
        case 'TOGGLE_AUTO_OPEN': {
            return { ...state, autoOpenPacks: !state.autoOpenPacks };
        }
        case 'CLEAR_LAST_OPENED': {
            return { ...state, lastOpenedCards: null };
        }
        default:
            return state;
    }
}

function openPacks(state: GameState, amount: number, cost: number): GameState {
    let newOwned = state.ownedCards.map(c => ({...c}));
    const totalCards = amount * 5;
    const acquiredCards = [];
    
    const costPerCard = cost / totalCards;
    
    for (let i = 0; i < totalCards; i++) {
        const randomCard = state.activeCards[Math.floor(Math.random() * state.activeCards.length)];
        acquiredCards.push(randomCard);
        
        let existing = newOwned.find(c => c.id === randomCard.id && c.season === randomCard.season && !c.isLiquidated);
        if (existing) {
            const currentTotal = existing.averageBuyPrice * existing.quantity;
            existing.quantity += 1;
            existing.averageBuyPrice = (currentTotal + costPerCard) / existing.quantity;
        } else {
            newOwned.push({
                id: randomCard.id,
                name: randomCard.name,
                season: randomCard.season,
                quantity: 1,
                averageBuyPrice: costPerCard,
                isLiquidated: false
            });
        }
    }
    
    return { ...state, ownedCards: newOwned, lastOpenedCards: acquiredCards, lastOpenedCost: cost };
}

function performMarketTick(state: GameState): GameState {
    let newCash = state.cash;
    let newOwnedCards = [...state.ownedCards].map(c => ({...c}));
    let newActiveCards = [...state.activeCards];
    
    newActiveCards = newActiveCards.map(card => {
        const multiplier = 1 + (Math.random() - 0.5);
        let newPrice = Math.floor(card.currentPrice * multiplier);
        if (newPrice <= 0) newPrice = 1; 
        
        if (newPrice < 100) {
            newOwnedCards = newOwnedCards.map(oc => {
                if (oc.id === card.id && oc.season === card.season && !oc.isLiquidated) {
                    return { ...oc, isLiquidated: true, liquidatedPrice: newPrice };
                }
                return oc;
            });
            
            return {
                ...card,
                season: card.season + 1,
                currentPrice: 1000,
                previousPrice: card.currentPrice
            };
        } else {
            return {
                ...card,
                previousPrice: card.currentPrice,
                currentPrice: newPrice
            };
        }
    });
    
    newOwnedCards = newOwnedCards.filter(oc => oc.quantity > 0);
    
    return {
        ...state,
        cash: newCash,
        activeCards: newActiveCards,
        ownedCards: newOwnedCards
    };
}
