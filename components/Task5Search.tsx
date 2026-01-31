
import React, { useState } from 'react';
import { Search, UserCircle } from 'lucide-react';

const PREDEFINED_NAMES = [
  'Alice Wonderland',
  'Bob Builder',
  'Charlie Brown',
  'Diana Prince',
  'Edward Scissorhands',
  'Fiona Shrek',
  'George Washington',
  'Hannah Montana',
  'Ian Wright',
  'Jane Austen',
  'Kevin Heart',
  'Laura Palmer',
  'Michael Jordan',
  'Nathan Drake',
  'Olivia Rodrigo',
  'Peter Parker',
  'Quentin Tarantino',
  'Rose Tyler',
  'Steve Rogers',
  'Tony Stark'
];

const Task5Search: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredNames = PREDEFINED_NAMES.filter(name =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;
    
    // Use regex to split text while keeping the delimiter
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    
    return parts.map((part, i) => 
      part.toLowerCase() === search.toLowerCase() ? (
        <b key={i} className="text-blue-600 bg-blue-50 px-0.5 rounded transition-all">{part}</b>
      ) : (
        part
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search directory..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-blue-50 transition-all text-lg"
        />
      </div>

      <div className="flex items-center justify-between text-sm px-2">
        <span className="text-gray-500">
          Showing <span className="font-bold text-gray-700">{filteredNames.length}</span> of {PREDEFINED_NAMES.length} entries
        </span>
        {query && filteredNames.length === 0 && (
          <span className="text-red-500 font-medium">No matches found for "{query}"</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredNames.length > 0 ? (
          filteredNames.map((name, idx) => (
            <div
              key={name}
              className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all group animate-in fade-in slide-in-from-bottom-2 duration-200"
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <UserCircle size={24} />
              </div>
              <span className="text-gray-700 font-medium">
                {highlightText(name, query)}
              </span>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400 gap-2 opacity-50">
            <Search size={48} />
            <p className="text-lg">No results match your criteria</p>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default Task5Search;
