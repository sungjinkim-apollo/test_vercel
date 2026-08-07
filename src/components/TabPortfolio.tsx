import { useState } from 'react';
import { useGame } from '../store/GameContext';

export function TabPortfolio() {
    const { state, dispatch } = useGame();
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('value_desc');
    
    const isLockout = state.secondsRemaining <= 60;
    
    const allActive = state.ownedCards
        .filter(c => !c.isLiquidated)
        .filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
        
    allActive.sort((a, b) => {
        const activeA = state.activeCards.find(c => c.id === a.id && c.season === a.season);
        const activeB = state.activeCards.find(c => c.id === b.id && c.season === b.season);
        
        const priceA = activeA?.currentPrice || 0;
        const priceB = activeB?.currentPrice || 0;
        
        const valA = priceA * a.quantity;
        const valB = priceB * b.quantity;
        
        const costA = a.averageBuyPrice * a.quantity;
        const costB = b.averageBuyPrice * b.quantity;
        
        if (sortBy === 'value_desc') return valB - valA;
        if (sortBy === 'value_asc') return valA - valB;
        if (sortBy === 'pnl_desc') return (valB - costB) - (valA - costA);
        if (sortBy === 'pnl_asc') return (valA - costA) - (valB - costB);
        if (sortBy === 'qty_desc') return b.quantity - a.quantity;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        
        return 0;
    });
    
    const activeOwned = allActive;
    
    const frozenOwned = state.ownedCards
        .filter(c => c.isLiquidated)
        .filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    
    const packPrice = Math.floor(state.activeCards.reduce((sum, c) => sum + c.currentPrice, 0) / 10);
    const packsTotalValue = state.packsOwned * packPrice;
    const packsTotalCost = state.packsOwned * state.packsAverageBuyPrice;
    const packsPnl = packsTotalValue - packsTotalCost;
    const packsPnlPercent = packsTotalCost > 0 ? (packsPnl / packsTotalCost) * 100 : 0;
    const packsIsUp = packsPnl >= 0;
    
    return (
        <div className="pb-28 pt-32 px-4 space-y-8 max-w-2xl mx-auto">
            
            <div className="flex gap-2">
                <input 
                    type="text" 
                    placeholder="Search Portfolio..." 
                    className="flex-1 bg-slate-800 text-white border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    className="bg-slate-800 text-white border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                >
                    <option value="value_desc">₩ ↓</option>
                    <option value="value_asc">₩ ↑</option>
                    <option value="pnl_desc">PnL ↓</option>
                    <option value="pnl_asc">PnL ↑</option>
                    <option value="qty_desc">Qty ↓</option>
                    <option value="name">A-Z</option>
                </select>
            </div>
            
            {state.packsOwned > 0 && (
                <div>
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">ETF Packs</h2>
                    <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl p-5 border border-indigo-700/30 shadow-lg">
                        <div className="flex justify-between items-start mb-5">
                            <div>
                                <div className="font-black text-white text-xl">Standard ETF Pack</div>
                                <div className="text-sm font-medium text-slate-400 mt-1"><span className="text-indigo-400">{state.packsOwned} owned</span></div>
                            </div>
                            <div className="text-right">
                                <div className="font-black text-white text-xl">₩{packsTotalValue.toLocaleString()}</div>
                                <div className={`text-sm font-bold mt-1 ${packsIsUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {packsIsUp ? '+' : ''}{packsPnlPercent.toFixed(1)}% (₩{packsPnl.toLocaleString()})
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex gap-3 items-center mb-5">
                            <div className="flex-1 bg-slate-900/80 rounded-xl p-3 border border-slate-700/50">
                                <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider block mb-1">Avg Buy</span>
                                <span className="text-slate-200 font-bold">₩{Math.floor(state.packsAverageBuyPrice).toLocaleString()}</span>
                            </div>
                            <div className="flex-1 bg-slate-900/80 rounded-xl p-3 border border-slate-700/50">
                                <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider block mb-1">Current</span>
                                <span className="text-slate-200 font-bold">₩{packPrice.toLocaleString()}</span>
                            </div>
                        </div>
                        
                        <div className="flex gap-2">
                            <button
                                onClick={() => dispatch({ type: 'SELL_PACKS', payload: { amount: 1 }})}
                                disabled={isLockout || state.packsOwned < 1}
                                className="flex-1 py-3 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-xl font-bold transition-colors disabled:opacity-50 active:scale-95 disabled:active:scale-100 text-sm border border-rose-500/30"
                            >
                                Sell 1
                            </button>
                            <button
                                onClick={() => dispatch({ type: 'SELL_PACKS', payload: { amount: 10 }})}
                                disabled={isLockout || state.packsOwned < 10}
                                className="flex-1 py-3 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-xl font-bold transition-colors disabled:opacity-50 active:scale-95 disabled:active:scale-100 text-sm border border-rose-500/30"
                            >
                                Sell 10
                            </button>
                            <button
                                onClick={() => dispatch({ type: 'SELL_PACKS', payload: { amount: state.packsOwned }})}
                                disabled={isLockout}
                                className="flex-[2] py-3 bg-rose-600 text-white hover:bg-rose-500 rounded-xl font-black transition-colors disabled:opacity-50 active:scale-95 disabled:active:scale-100 text-sm shadow-lg shadow-rose-900/20 border border-rose-500/30"
                            >
                                Sell All
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeOwned.length > 0 && (
                <div>
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">Active Positions</h2>
                    <div className="space-y-4">
                        {activeOwned.map((oc, i) => {
                            const activeData = state.activeCards.find(c => c.id === oc.id && c.season === oc.season);
                            const currentPrice = activeData?.currentPrice || 0;
                            const totalValue = currentPrice * oc.quantity;
                            const totalCost = oc.averageBuyPrice * oc.quantity;
                            const pnl = totalValue - totalCost;
                            const pnlPercent = totalCost > 0 ? (pnl / totalCost) * 100 : 0;
                            const isUp = pnl >= 0;
                            
                            return (
                                <div key={`${oc.id}-${oc.season}-${i}`} className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-lg">
                                    <div className="flex justify-between items-start mb-5">
                                        <div>
                                            <div className="font-black text-white text-xl">{oc.name}</div>
                                            <div className="text-sm font-medium text-slate-400 mt-1">Season {oc.season} • <span className="text-indigo-400">{oc.quantity} owned</span></div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-black text-white text-xl">₩{totalValue.toLocaleString()}</div>
                                            <div className={`text-sm font-bold mt-1 ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {isUp ? '+' : ''}{pnlPercent.toFixed(1)}% (₩{pnl.toLocaleString()})
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-3 items-center mb-5">
                                        <div className="flex-1 bg-slate-900/80 rounded-xl p-3 border border-slate-700/50">
                                            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider block mb-1">Avg Buy</span>
                                            <span className="text-slate-200 font-bold">₩{Math.floor(oc.averageBuyPrice).toLocaleString()}</span>
                                        </div>
                                        <div className="flex-1 bg-slate-900/80 rounded-xl p-3 border border-slate-700/50">
                                            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider block mb-1">Current</span>
                                            <span className="text-slate-200 font-bold">₩{currentPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => dispatch({ type: 'SELL_CARD', payload: { id: oc.id, season: oc.season, quantity: 1 }})}
                                            disabled={isLockout}
                                            className="flex-1 py-3 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-xl font-bold transition-colors disabled:opacity-50 active:scale-95 disabled:active:scale-100 text-sm"
                                        >
                                            Sell 1
                                        </button>
                                        <button
                                            onClick={() => dispatch({ type: 'SELL_CARD', payload: { id: oc.id, season: oc.season, quantity: 10 }})}
                                            disabled={isLockout || oc.quantity < 10}
                                            className="flex-1 py-3 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-xl font-bold transition-colors disabled:opacity-50 active:scale-95 disabled:active:scale-100 text-sm"
                                        >
                                            Sell 10
                                        </button>
                                        <button
                                            onClick={() => dispatch({ type: 'SELL_CARD', payload: { id: oc.id, season: oc.season, quantity: oc.quantity }})}
                                            disabled={isLockout}
                                            className="flex-[2] py-3 bg-rose-600 text-white hover:bg-rose-500 rounded-xl font-black transition-colors disabled:opacity-50 active:scale-95 disabled:active:scale-100 text-sm shadow-lg shadow-rose-900/20"
                                        >
                                            Sell All
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
            
            {frozenOwned.length > 0 && (
                <div>
                    <h2 className="text-sm font-bold text-rose-500/80 uppercase tracking-widest mb-4 px-1 flex items-center gap-2">
                        <span>❄️</span> Liquidated (Frozen)
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {frozenOwned.map((oc, i) => {
                            const liqPrice = oc.liquidatedPrice !== undefined ? oc.liquidatedPrice : 50;
                            const totalVal = liqPrice * oc.quantity;
                            return (
                                <div key={`frozen-${oc.id}-${oc.season}-${i}`} className="bg-slate-900/50 border border-rose-900/30 rounded-xl p-4 opacity-70">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="text-slate-400 font-bold text-sm mb-1">{oc.name}</div>
                                            <div className="text-slate-500 font-medium text-xs">Season {oc.season} • {oc.quantity}x</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-rose-400 font-bold text-sm">₩{totalVal.toLocaleString()}</div>
                                            <div className="text-slate-500 text-[10px]">₩{liqPrice.toLocaleString()} ea</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => dispatch({ type: 'SELL_CARD', payload: { id: oc.id, season: oc.season, quantity: 1 }})}
                                            disabled={isLockout}
                                            className="flex-1 text-rose-400 text-[10px] uppercase font-bold tracking-widest text-center bg-rose-950/50 hover:bg-rose-900/50 py-2 rounded-lg border border-rose-900/50 transition-colors disabled:opacity-50"
                                        >
                                            Sell 1
                                        </button>
                                        <button
                                            onClick={() => dispatch({ type: 'SELL_CARD', payload: { id: oc.id, season: oc.season, quantity: oc.quantity }})}
                                            disabled={isLockout}
                                            className="flex-[2] text-rose-400 text-xs uppercase font-bold tracking-widest text-center bg-rose-950/50 hover:bg-rose-900/50 py-2 rounded-lg border border-rose-900/50 transition-colors disabled:opacity-50"
                                        >
                                            Sell All
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            
            {activeOwned.length === 0 && frozenOwned.length === 0 && state.packsOwned === 0 && (
                <div className="text-center py-24 text-slate-500">
                    <div className="text-6xl mb-6 opacity-50">💼</div>
                    <p className="font-medium text-lg">Your portfolio is empty.</p>
                    <p className="text-sm mt-2 opacity-70">Buy cards from the Market or open Packs.</p>
                </div>
            )}
        </div>
    );
}
