'use client';

import { useState, useEffect } from 'react';
import { Lecture } from '../types';

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<Lecture[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch {
        setRecentlyViewed([]);
      }
    }
  }, []);

  const addToRecentlyViewed = (lecture: Lecture) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(l => l.id !== lecture.id);
      const newList = [lecture, ...filtered].slice(0, 8);
      localStorage.setItem('recentlyViewed', JSON.stringify(newList));
      return newList;
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem('recentlyViewed');
  };

  return { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed };
}