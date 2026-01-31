
import React, { useState } from 'react';
import { ListTodo, FileText, BarChart3, Clock, Search, Briefcase } from 'lucide-react';
import Task1Todo from './components/Task1Todo';
import Task2Form from './components/Task2Form';
import Task3ProgressBar from './components/Task3ProgressBar';
import Task4Timer from './components/Task4Timer';
import Task5Search from './components/Task5Search';

type TabId = 'task1' | 'task2' | 'task3' | 'task4' | 'task5';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('task1');

  const tabs = [
    { id: 'task1', label: 'Todo List', icon: ListTodo, description: 'Task 1: Managed todos with priority' },
    { id: 'task2', label: 'Forms', icon: FileText, description: 'Task 2: Dynamic validation form' },
    { id: 'task3', label: 'Progress', icon: BarChart3, description: 'Task 3: Aggregated progress bars' },
    { id: 'task4', label: 'Timer', icon: Clock, description: 'Task 4: Persisted precision timer' },
    { id: 'task5', label: 'Search', icon: Search, description: 'Task 5: Highlighting live search' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'task1': return <Task1Todo />;
      case 'task2': return <Task2Form />;
      case 'task3': return <Task3ProgressBar />;
      case 'task4': return <Task4Timer />;
      case 'task5': return <Task5Search />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <Briefcase size={28} />
            <span>Frontend Intern Assignment</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm text-gray-400 font-medium">
            <span>React 18</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:w-72 space-y-2 shrink-0">
          <div className="p-4 bg-blue-50 rounded-xl mb-4">
            <h2 className="text-blue-800 font-bold text-sm uppercase tracking-wider mb-1">Task Suite</h2>
            <p className="text-blue-600 text-xs">Selection of frontend engineering tasks for internship review.</p>
          </div>
          
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabId)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                    isActive 
                      ? 'bg-white shadow-sm ring-1 ring-gray-200 text-blue-600 font-semibold translate-x-1' 
                      : 'text-gray-500 hover:bg-gray-200 hover:text-gray-800'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em] mb-4">Project Stats</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Tasks Completed</span>
                <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">5 / 5</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Persistence</span>
                <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded">Active</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <section className="flex-1 min-w-0">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[600px] overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50/50 p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                {tabs.find(t => t.id === activeTab)?.label}
              </h1>
              <p className="text-gray-500 text-sm">
                {tabs.find(t => t.id === activeTab)?.description}
              </p>
            </div>
            <div className="p-6 sm:p-10">
              {renderContent()}
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-4 mt-12 text-center text-gray-400 text-xs">
        <p>© 2024 Intern Assignment Suite • Built with React & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default App;
