export interface CardDef {
    id: number;
    name: string;
    season: number;
    currentPrice: number;
    previousPrice: number;
}

export interface OwnedCard {
    id: number;
    name: string;
    season: number;
    quantity: number;
    averageBuyPrice: number;
    isLiquidated: boolean;
    liquidatedPrice?: number;
}

export interface GameState {
    cash: number;
    activeCards: CardDef[];
    ownedCards: OwnedCard[];
    packsOwned: number;
    packsAverageBuyPrice: number;
    autoOpenPacks: boolean;
    secondsRemaining: number;
    lastOpenedCards: CardDef[] | null;
    lastOpenedCost: number | null;
}

export type GameAction = 
    | { type: 'TICK_SECOND' }
    | { type: 'BUY_CARD', payload: { id: number, quantity: number } }
    | { type: 'SELL_CARD', payload: { id: number, season: number, quantity: number } }
    | { type: 'BUY_PACKS', payload: { amount: number } }
    | { type: 'SELL_PACKS', payload: { amount: number } }
    | { type: 'OPEN_PACKS', payload: { amount: number } }
    | { type: 'TOGGLE_AUTO_OPEN' }
    | { type: 'FAST_FORWARD' }
    | { type: 'CLEAR_LAST_OPENED' };

const initialCards = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Card #${i + 1}`,
    season: 1,
    currentPrice: 1000,
    previousPrice: 1000,
}));

export const initialState: GameState = {
    cash: 100000,
    activeCards: initialCards,
    ownedCards: [],
    packsOwned: 0,
    packsAverageBuyPrice: 0,
    autoOpenPacks: false,
    secondsRemaining: 300,
    lastOpenedCards: null,
    lastOpenedCost: null,
};
