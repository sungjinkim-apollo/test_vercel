import { useGame } from '../store/GameContext';

export function TopBar() {
    const { state, dispatch } = useGame();
    
    const isLockout = state.secondsRemaining <= 60;
    const formatTime = (sec: number) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;
    
    const packPrice = Math.floor(state.activeCards.reduce((sum, c) => sum + c.currentPrice, 0) / 10);
    const packsValue = state.packsOwned * packPrice;

    const portfolioValue = state.ownedCards.reduce((sum, oc) => {
        if (oc.isLiquidated) {
            return sum + ((oc.liquidatedPrice !== undefined ? oc.liquidatedPrice : 50) * oc.quantity);
        }
        const active = state.activeCards.find(c => c.id === oc.id && c.season === oc.season);
        if (active) {
            return sum + (active.currentPrice * oc.quantity);
        }
        return sum;
    }, packsValue);
    
    return (
        <div className="fixed top-0 left-0 right-0 bg-slate-900 border-b border-slate-800 p-4 z-50 flex flex-col gap-2 shadow-md">
            <div className="flex justify-between items-center">
                <div className="text-emerald-400 font-bold text-xl">
                    ₩{state.cash.toLocaleString()}
                </div>
                <div className="text-slate-300 text-sm font-semibold">
                    Portfolio: ₩{portfolioValue.toLocaleString()}
                </div>
            </div>
            <div className="flex justify-between items-center bg-slate-950 p-2 rounded-lg">
                <div className={`font-mono font-bold text-lg flex items-center ${isLockout ? 'text-rose-500 animate-pulse' : 'text-blue-400'}`}>
                    ⏱ {formatTime(state.secondsRemaining)}
                    {isLockout && <span className="ml-2 text-[10px] uppercase tracking-wider bg-rose-500/20 px-2 py-1 rounded">Lockout</span>}
                </div>
                <button 
                    onClick={() => dispatch({ type: 'FAST_FORWARD' })}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md text-sm font-bold shadow-sm transition-colors active:scale-95"
                >
                    ⏩ FF 5m
                </button>
            </div>
        </div>
    );
}
