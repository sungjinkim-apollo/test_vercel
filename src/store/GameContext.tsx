import { createContext, useContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';
import { GameState, GameAction, initialState } from '../types';
import { gameReducer } from './gameReducer';

const GameContext = createContext<{ state: GameState, dispatch: Dispatch<GameAction> } | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    
    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: 'TICK_SECOND' });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    
    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within GameProvider');
    return context;
}
