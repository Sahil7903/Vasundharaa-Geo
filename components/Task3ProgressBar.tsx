
import React, { useState } from 'react';
import { Sliders } from 'lucide-react';

const Task3ProgressBar: React.FC = () => {
  const [inputs, setInputs] = useState<number[]>([45, 65, 30]);

  const handleInputChange = (index: number, value: string) => {
    const newValue = Math.min(100, Math.max(0, parseInt(value) || 0));
    const newInputs = [...inputs];
    newInputs[index] = newValue;
    setInputs(newInputs);
  };

  const addInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, 0]);
    }
  };

  const removeInput = (index: number) => {
    if (inputs.length > 1) {
      setInputs(inputs.filter((_, i) => i !== index));
    }
  };

  const total = inputs.reduce((acc, val) => acc + val, 0);
  const average = total / inputs.length;

  const getBarColor = (val: number) => {
    if (val < 40) return 'bg-red-500';
    if (val > 70) return 'bg-green-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="space-y-10">
      {/* Main Bar */}
      <div className="bg-gray-100 p-8 rounded-2xl shadow-inner space-y-4">
        <div className="flex justify-between items-end mb-2">
          <h3 className="text-lg font-bold text-gray-700">Performance Index</h3>
          <span className="text-3xl font-black text-blue-600">{Math.round(average)}%</span>
        </div>
        <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-700 ease-out ${getBarColor(average)}`}
            style={{ width: `${average}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 text-center italic">Calculated average from all active sub-metrics</p>
      </div>

      {/* Individual Bars & Controls */}
      <div className="grid gap-6">
        {inputs.map((val, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase mb-1 px-1">
                <span>Metric {idx + 1}</span>
                <span>{val}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${getBarColor(val)}`}
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="100"
                value={val}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                className="w-16 p-2 border rounded-lg text-center font-bold focus:ring-2 focus:ring-blue-200 outline-none"
              />
              <button
                onClick={() => removeInput(idx)}
                className="text-gray-300 hover:text-red-500 transition-colors"
                title="Remove metric"
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>

      {inputs.length < 5 && (
        <button
          onClick={addInput}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 transition-all font-medium"
        >
          + Add Data Point
        </button>
      )}
    </div>
  );
};

export default Task3ProgressBar;
