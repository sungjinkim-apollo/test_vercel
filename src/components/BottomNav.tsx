import { BarChart3, Package, Briefcase } from 'lucide-react';

export function BottomNav({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 z-50">
            <div className="flex px-2 py-1 pb-4">
                {[
                    { id: 'market', icon: BarChart3, label: 'Market' },
                    { id: 'gacha', icon: Package, label: 'Gacha' },
                    { id: 'portfolio', icon: Briefcase, label: 'Portfolio' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex-1 flex flex-col items-center justify-center py-3 rounded-xl transition-all ${
                            activeTab === tab.id ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-400'
                        }`}
                    >
                        <tab.icon className={`w-6 h-6 mb-1 ${activeTab === tab.id ? 'scale-110' : ''} transition-transform`} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
