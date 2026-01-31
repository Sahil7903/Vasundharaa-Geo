
import { useState, Dispatch, SetStateAction } from 'react';

// Enhanced useLocalStorage hook to support functional updates (prev => ...), 
// ensuring compatibility with components like Task4Timer that require the most recent state in asynchronous updates.
export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  // Get from local storage then parse stored json or return initialValue
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      // Use the functional form of setStoredValue to ensure we always operate on the most recent state value
      setStoredValue((prevStoredValue) => {
        // Determine the next value based on whether it's a functional update or a direct value
        const valueToStore = value instanceof Function ? value(prevStoredValue) : value;
        
        // Persist the new value to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        
        return valueToStore;
      });
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setValue];
}
