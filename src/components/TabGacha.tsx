import { useGame } from '../store/GameContext';

export function TabGacha() {
    const { state, dispatch } = useGame();
    
    const packPrice = Math.floor(state.activeCards.reduce((sum, c) => sum + c.currentPrice, 0) / 10);
    const isLockout = state.secondsRemaining <= 60;
    
    let groupedOpened: { id: number; name: string; season: number; price: number; count: number }[] = [];
    let acquiredValue = 0;
    if (state.lastOpenedCards) {
        const counts: Record<number, number> = {};
        const meta: Record<number, any> = {};
        state.lastOpenedCards.forEach(c => {
            counts[c.id] = (counts[c.id] || 0) + 1;
            meta[c.id] = c;
            acquiredValue += c.currentPrice;
        });
        groupedOpened = Object.keys(counts).map(id => ({
            id: Number(id),
            name: meta[Number(id)].name,
            season: meta[Number(id)].season,
            price: meta[Number(id)].currentPrice,
            count: counts[Number(id)]
        })).sort((a, b) => b.price - a.price);
    }
    
    const openCost = state.lastOpenedCost || 0;
    const pnl = acquiredValue - openCost;
    const pnlPercent = openCost > 0 ? (pnl / openCost) * 100 : 0;
    const isUp = pnl >= 0;
    
    return (
        <div className="pb-28 pt-32 px-4 space-y-6 max-w-lg mx-auto">
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-6 border border-indigo-700/50 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <div className="text-8xl">📦</div>
                </div>
                <h2 className="text-2xl font-black text-white italic mb-1">STANDARD ETF PACK</h2>
                <p className="text-indigo-200 text-sm mb-6 font-medium">Contains 5 random active cards. 2% drop rate each.</p>
                
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <div className="text-sm text-indigo-300 uppercase tracking-widest font-bold mb-1">Current Price</div>
                        <div className="text-4xl font-black text-emerald-400 drop-shadow-md">₩{packPrice.toLocaleString()}</div>
                    </div>
                </div>
                
                <div className="flex gap-3">
                    <button 
                        onClick={() => dispatch({ type: 'BUY_PACKS', payload: { amount: 1 }})}
                        disabled={isLockout || state.cash < packPrice}
                        className="flex-1 bg-white text-indigo-900 font-black py-4 rounded-xl hover:bg-indigo-50 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 shadow-xl"
                    >
                        BUY 1
                    </button>
                    <button 
                        onClick={() => dispatch({ type: 'BUY_PACKS', payload: { amount: 10 }})}
                        disabled={isLockout || state.cash < packPrice * 10}
                        className="flex-1 bg-indigo-500 text-white font-black py-4 rounded-xl hover:bg-indigo-400 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                    >
                        BUY 10
                    </button>
                </div>
            </div>
            
            <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">Pack Storage</h3>
                    <div className="bg-slate-900 px-4 py-2 rounded-lg font-black text-indigo-400 border border-slate-700">
                        {state.packsOwned} Packs
                    </div>
                </div>
                
                <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-xl mb-6 border border-slate-700/50">
                    <span className="text-slate-300 font-bold text-sm">Auto-Open on Buy</span>
                    <button 
                        onClick={() => dispatch({ type: 'TOGGLE_AUTO_OPEN' })}
                        className={`w-14 h-8 rounded-full transition-colors relative shadow-inner ${state.autoOpenPacks ? 'bg-emerald-500' : 'bg-slate-600'}`}
                    >
                        <div className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform shadow-sm ${state.autoOpenPacks ? 'translate-x-6' : ''}`} />
                    </button>
                </div>
                
                <div className="flex gap-3">
                    <button 
                        onClick={() => dispatch({ type: 'OPEN_PACKS', payload: { amount: 1 }})}
                        disabled={isLockout || state.packsOwned < 1}
                        className="flex-1 py-4 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-600 disabled:opacity-50 transition-colors active:scale-95 disabled:active:scale-100"
                    >
                        Open 1
                    </button>
                    <button 
                        onClick={() => dispatch({ type: 'OPEN_PACKS', payload: { amount: 10 }})}
                        disabled={isLockout || state.packsOwned < 10}
                        className="flex-1 py-4 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-600 disabled:opacity-50 transition-colors active:scale-95 disabled:active:scale-100"
                    >
                        Open 10
                    </button>
                    <button 
                        onClick={() => dispatch({ type: 'OPEN_PACKS', payload: { amount: state.packsOwned }})}
                        disabled={isLockout || state.packsOwned < 1}
                        className="flex-[2] py-4 bg-indigo-600 text-white rounded-xl font-black hover:bg-indigo-500 disabled:opacity-50 transition-colors active:scale-95 disabled:active:scale-100 shadow-lg"
                    >
                        Open All
                    </button>
                </div>
            </div>

            {state.lastOpenedCards && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-slate-900 w-full max-w-md rounded-3xl border border-slate-700 shadow-2xl flex flex-col max-h-[80vh] overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                            <h3 className="text-2xl font-black text-white text-center">🎉 Pack Opened!</h3>
                            <p className="text-emerald-400 text-center font-bold mt-1">Acquired {state.lastOpenedCards.length} cards</p>
                            
                            <div className="mt-4 bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                                <div>
                                    <div className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Total Value</div>
                                    <div className="text-xl font-black text-white">₩{acquiredValue.toLocaleString()}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Return</div>
                                    <div className={`text-lg font-black ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {isUp ? '+' : ''}{pnlPercent.toFixed(1)}%
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-slate-950">
                            {groupedOpened.map(gc => (
                                <div key={gc.id} className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
                                    <div>
                                        <div className="font-bold text-white text-lg">{gc.name} <span className="text-sm font-medium text-slate-400">S{gc.season}</span></div>
                                        <div className="text-indigo-400 font-bold text-sm mt-1">x{gc.count}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-emerald-400 font-bold">₩{(gc.price * gc.count).toLocaleString()}</div>
                                        <div className="text-xs text-slate-500 font-medium">₩{gc.price.toLocaleString()} ea</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="p-6 border-t border-slate-800 bg-slate-900">
                            <button 
                                onClick={() => dispatch({ type: 'CLEAR_LAST_OPENED' })}
                                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black shadow-lg shadow-indigo-900/50 hover:bg-indigo-500 active:scale-95 transition-all"
                            >
                                Awesome!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
