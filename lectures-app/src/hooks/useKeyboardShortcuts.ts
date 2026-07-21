'use client';

import { useEffect } from 'react';

interface KeyboardShortcuts {
  onSearch?: () => void;
  onEscape?: () => void;
  onFavorites?: () => void;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        shortcuts.onSearch?.();
      }
      
      // Escape for closing modals
      if (e.key === 'Escape') {
        shortcuts.onEscape?.();
      }
      
      // Ctrl/Cmd + F for favorites
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        shortcuts.onFavorites?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}