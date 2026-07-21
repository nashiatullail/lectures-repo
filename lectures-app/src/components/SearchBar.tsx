'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, Sparkles } from 'lucide-react';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored).slice(0, 5));
      } catch {
        setRecentSearches([]);
      }
    }
  }, []);

  // Save search to recent
  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Get suggestions based on search term
  useEffect(() => {
    if (search.length > 1) {
      // Mock suggestions - in real app, fetch from API
      const mockSuggestions = [
        `${search} tutorial`,
        `${search} for beginners`,
        `Advanced ${search}`,
        `${search} 2026`,
        `Learn ${search}`
      ];
      setSuggestions(mockSuggestions.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  }, [search]);

  const handleSearch = (term: string) => {
    setSearch(term);
    saveRecentSearch(term);
    setSuggestions([]);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    setSearch('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  useKeyboardShortcuts({
    onSearch: () => inputRef.current?.focus(),
    onEscape: () => {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  });

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search lectures, instructors, or topics... (Ctrl+K)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-lg"
          />
          <AnimatePresence>
            {search && (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={clearSearch}
                className="absolute right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <span>Ctrl</span>
          <span>+</span>
          <span>K</span>
        </div>
      </div>

      <AnimatePresence>
        {(isFocused || search) && (suggestions.length > 0 || recentSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {suggestions.length > 0 && (
              <div className="p-2">
                <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <Sparkles className="w-3 h-3" />
                  Suggestions
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full px-3 py-2 text-left rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300 flex items-center gap-3"
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {recentSearches.length > 0 && !search && (
              <div className="p-2">
                <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3" />
                  Recent Searches
                </div>
                {recentSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(term)}
                    className="w-full px-3 py-2 text-left rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300 flex items-center gap-3"
                  >
                    <Clock className="w-4 h-4 text-gray-400" />
                    {term}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}