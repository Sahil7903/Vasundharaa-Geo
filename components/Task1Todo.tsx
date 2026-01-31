
import React, { useState, useMemo } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, Filter } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo, Priority, TodoFilter } from '../types';

const Task1Todo: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('task1_todos', []);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [filter, setFilter] = useState<TodoFilter>('All');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      priority,
      completed: false,
      createdAt: Date.now(),
    };
    
    setTodos([newTodo, ...todos]);
    setText('');
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(t => {
      if (filter === 'Active') return !t.completed;
      if (filter === 'Completed') return t.completed;
      return true;
    });
  }, [todos, filter]);

  const priorityStyles = {
    Low: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    High: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="p-3 border rounded-lg bg-white outline-none"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={20} />
          <span>Add</span>
        </button>
      </form>

      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2 text-gray-500">
          <Filter size={18} />
          <span className="font-medium">Filter:</span>
        </div>
        <div className="flex gap-2">
          {(['All', 'Active', 'Completed'] as TodoFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-10 text-gray-400">No tasks found</div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`transition-colors ${todo.completed ? 'text-blue-500' : 'text-gray-300 hover:text-gray-400'}`}
                >
                  {todo.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
                <div className="flex flex-col">
                  <span className={`text-lg transition-all ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
                    {todo.text}
                  </span>
                  <span className={`w-fit mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${priorityStyles[todo.priority]}`}>
                    {todo.priority}
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-300 hover:text-red-500 p-2 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Task1Todo;
