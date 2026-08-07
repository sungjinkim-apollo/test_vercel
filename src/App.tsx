import { useState } from 'react';
import { GameProvider } from './store/GameContext';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { TabMarket } from './components/TabMarket';
import { TabGacha } from './components/TabGacha';
import { TabPortfolio } from './components/TabPortfolio';

function AppContent() {
    const [activeTab, setActiveTab] = useState('market');
    
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
            <TopBar />
            
            <main>
                {activeTab === 'market' && <TabMarket />}
                {activeTab === 'gacha' && <TabGacha />}
                {activeTab === 'portfolio' && <TabPortfolio />}
            </main>
            
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
}

export default function App() {
    return (
        <GameProvider>
            <AppContent />
        </GameProvider>
    );
}
