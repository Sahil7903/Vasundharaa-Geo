
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon, Bell } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TimerData, TimerStatus } from '../types';

const Task4Timer: React.FC = () => {
  const [timerData, setTimerData] = useLocalStorage<TimerData>('task4_timer', {
    remainingMs: 0,
    endTime: null,
    status: 'Idle',
  });
  
  const [inputSeconds, setInputSeconds] = useState<string>('60');
  const timerRef = useRef<number | null>(null);

  // Formatting time
  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    const mills = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${mills.toString().padStart(2, '0')}`;
  };

  // Sync logic for mount and updates
  useEffect(() => {
    if (timerData.status === 'Running' && timerData.endTime) {
      const startTimer = () => {
        timerRef.current = window.setInterval(() => {
          const now = Date.now();
          const diff = Math.max(0, timerData.endTime! - now);
          
          if (diff <= 0) {
            setTimerData({
              remainingMs: 0,
              endTime: null,
              status: 'Completed',
            });
            if (timerRef.current) clearInterval(timerRef.current);
          } else {
            setTimerData(prev => ({ ...prev, remainingMs: diff }));
          }
        }, 33); // ~30fps for smooth millisecond updates
      };

      startTimer();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerData.status, timerData.endTime]);

  const handleStart = () => {
    const durationMs = parseInt(inputSeconds) * 1000;
    if (isNaN(durationMs) || durationMs <= 0) return;

    setTimerData({
      remainingMs: durationMs,
      endTime: Date.now() + durationMs,
      status: 'Running',
    });
  };

  const handlePause = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerData(prev => ({
      ...prev,
      status: 'Paused',
      endTime: null, // EndTime is invalid when paused
    }));
  };

  const handleResume = () => {
    const newEndTime = Date.now() + timerData.remainingMs;
    setTimerData(prev => ({
      ...prev,
      status: 'Running',
      endTime: newEndTime,
    }));
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerData({
      remainingMs: 0,
      endTime: null,
      status: 'Idle',
    });
  };

  const isRunning = timerData.status === 'Running';
  const isPaused = timerData.status === 'Paused';
  const isCompleted = timerData.status === 'Completed';
  const isIdle = timerData.status === 'Idle';

  return (
    <div className="flex flex-col items-center gap-8 py-6">
      <div className="relative">
        {/* Visual ring */}
        <div className={`w-64 h-64 rounded-full border-8 flex flex-col items-center justify-center bg-white shadow-xl transition-all duration-500 ${
          isRunning ? 'border-blue-500 scale-105' : isCompleted ? 'border-green-500 scale-100' : 'border-gray-200 scale-100'
        }`}>
          <TimerIcon className={`mb-2 transition-colors ${isRunning ? 'text-blue-500 animate-pulse' : 'text-gray-400'}`} size={24} />
          <span className={`text-5xl font-mono font-bold tracking-tighter ${isCompleted ? 'text-green-600' : 'text-gray-800'}`}>
            {isCompleted ? '00:00.00' : formatTime(timerData.remainingMs || parseInt(inputSeconds || '0') * 1000)}
          </span>
          {isCompleted && <span className="text-green-500 font-bold mt-2 animate-bounce">Time's up!</span>}
        </div>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Set Seconds</label>
          <input
            type="number"
            value={inputSeconds}
            disabled={!isIdle && !isCompleted}
            onChange={(e) => setInputSeconds(e.target.value)}
            className="w-full p-4 text-2xl font-bold border rounded-xl text-center disabled:bg-gray-50 disabled:text-gray-400 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="0"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {isIdle || isCompleted ? (
            <button
              onClick={handleStart}
              className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              <Play size={20} fill="currentColor" />
              START TIMER
            </button>
          ) : (
            <>
              {isRunning ? (
                <button
                  onClick={handlePause}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all active:scale-95"
                >
                  <Pause size={20} fill="currentColor" />
                  PAUSE
                </button>
              ) : (
                <button
                  onClick={handleResume}
                  className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all active:scale-95"
                >
                  <Play size={20} fill="currentColor" />
                  RESUME
                </button>
              )}
              <button
                onClick={handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all active:scale-95"
              >
                <RotateCcw size={20} />
                RESET
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task4Timer;
