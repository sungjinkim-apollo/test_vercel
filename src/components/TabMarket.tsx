import { useState } from 'react';
import { useGame } from '../store/GameContext';
import { CardDef } from '../types';

export function TabMarket() {
    const { state, dispatch } = useGame();
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('price_desc');
    const [selectedCard, setSelectedCard] = useState<CardDef | null>(null);
    const [buyQty, setBuyQty] = useState(1);
    
    let filteredCards = state.activeCards.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    
    filteredCards.sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'price_desc') return b.currentPrice - a.currentPrice;
        if (sortBy === 'price_asc') return a.currentPrice - b.currentPrice;
        
        const aChange = a.previousPrice ? ((a.currentPrice - a.previousPrice) / a.previousPrice) : 0;
        const bChange = b.previousPrice ? ((b.currentPrice - b.previousPrice) / b.previousPrice) : 0;
        
        if (sortBy === 'change_desc') return bChange - aChange;
        if (sortBy === 'change_asc') return aChange - bChange;
        
        return 0;
    });
    
    const isLockout = state.secondsRemaining <= 60;
    
    const handleBuy = () => {
        if (selectedCard) {
            dispatch({ type: 'BUY_CARD', payload: { id: selectedCard.id, quantity: buyQty }});
            setSelectedCard(null);
            setBuyQty(1);
        }
    }
    
    return (
        <div className="pb-28 pt-32 px-4 space-y-4 max-w-2xl mx-auto">
            <div className="flex gap-2">
                <input 
                    type="text" 
                    placeholder="Search Cards..." 
                    className="flex-1 bg-slate-800 text-white border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    className="bg-slate-800 text-white border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                >
                    <option value="price_desc">₩ ↓</option>
                    <option value="price_asc">₩ ↑</option>
                    <option value="change_desc">% ↓</option>
                    <option value="change_asc">% ↑</option>
                    <option value="name">A-Z</option>
                </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredCards.map(card => {
                    const priceDiff = card.currentPrice - card.previousPrice;
                    const percentChange = card.previousPrice ? (priceDiff / card.previousPrice) * 100 : 0;
                    const isUp = priceDiff >= 0;
                    
                    return (
                        <button 
                            key={card.id}
                            onClick={() => setSelectedCard(card)}
                            className="bg-slate-800 rounded-xl p-4 flex justify-between items-center border border-slate-700 hover:border-indigo-500 transition-colors text-left"
                        >
                            <div>
                                <div className="font-bold text-slate-100">{card.name}</div>
                                <div className="text-xs text-slate-400">Season {card.season}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-white">₩{card.currentPrice.toLocaleString()}</div>
                                <div className={`text-sm ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {isUp ? '+' : ''}{percentChange.toFixed(1)}%
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
            
            {/* Quick Trade Modal */}
            {selectedCard && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all">
                    <div className="bg-slate-900 w-full sm:w-96 rounded-t-3xl sm:rounded-2xl p-6 border-t sm:border border-slate-700 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-white">{selectedCard.name}</h3>
                                <p className="text-slate-400 font-medium">Season {selectedCard.season}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-black text-emerald-400">₩{selectedCard.currentPrice.toLocaleString()}</div>
                                <div className="text-xs text-slate-500 mt-1">Current Market Price</div>
                            </div>
                        </div>
                        
                        <div>
                            <label className="text-sm font-bold text-slate-400 block mb-3 uppercase tracking-wider">Quantity</label>
                            <div className="flex gap-2">
                                {[1, 10, 50, 100].map(q => (
                                    <button 
                                        key={q}
                                        onClick={() => setBuyQty(q)}
                                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${buyQty === q ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50 scale-105' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                            <span className="text-slate-400 font-medium">Total Cost</span>
                            <span className="text-white font-black text-xl">₩{(selectedCard.currentPrice * buyQty).toLocaleString()}</span>
                        </div>
                        
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setSelectedCard(null)}
                                className="flex-1 py-4 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleBuy}
                                disabled={isLockout || state.cash < selectedCard.currentPrice * buyQty}
                                className="flex-[2] py-4 rounded-xl bg-indigo-600 text-white font-black hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95"
                            >
                                {isLockout ? 'Market Lockout' : 'Buy Direct'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
