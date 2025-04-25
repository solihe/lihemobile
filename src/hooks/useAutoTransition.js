// src/hooks/useAutoTransition.js
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to handle automatic transitions between items
 * @param {number} itemCount - Total number of items
 * @param {Array<number>} delays - Array of delay times in ms for each item
 * @returns {Object} - Controls for the transition
 */
const useAutoTransition = (itemCount, delays = []) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Use a default delay if not provided
  const getDelay = (index) => {
    if (Array.isArray(delays) && delays.length > index) {
      return delays[index];
    }
    return 3000; // Default delay
  };
  
  // Move to next item
  const goToNext = useCallback((targetIndex = null) => {
    if (targetIndex !== null) {
      setCurrentIndex(targetIndex);
      return;
    }
    
    setCurrentIndex(prevIndex => (prevIndex + 1) % itemCount);
  }, [itemCount]);
  
  // Move to previous item
  const goToPrev = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + itemCount) % itemCount);
  }, [itemCount]);
  
  // Toggle pause state
  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);
  
  // Auto advance timer
  useEffect(() => {
    if (isPaused) return;
    
    const delay = getDelay(currentIndex);
    const timer = setTimeout(() => {
      goToNext();
    }, delay);
    
    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, goToNext]);
  
  return {
    currentIndex,
    isPaused,
    togglePause,
    goToNext,
    goToPrev
  };
};

export default useAutoTransition;