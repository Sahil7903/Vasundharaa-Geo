
export type Priority = 'Low' | 'Medium' | 'High';

export interface Todo {
  id: string;
  text: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
}

export type TodoFilter = 'All' | 'Active' | 'Completed';

export interface FormData {
  name: string;
  email: string;
  id: string;
  password: string;
}

export type TimerStatus = 'Idle' | 'Running' | 'Paused' | 'Completed';

export interface TimerData {
  remainingMs: number;
  endTime: number | null;
  status: TimerStatus;
}
