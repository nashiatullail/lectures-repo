'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, ChevronUp, Star, X } from 'lucide-react';
import { FilterOptions } from '../types';

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  onClose?: () => void;
}

export default function AdvancedFilters({ onFilterChange, onClose }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    level: [],
    duration: [],
    rating: null,
    dateRange: {
      from: '',
      to: ''
    }
  });

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const durations = ['< 30 min', '30-60 min', '60-90 min', '> 90 min'];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleLevelToggle = (level: string) => {
    const newLevels = filters.level.includes(level)
      ? filters.level.filter(l => l !== level)
      : [...filters.level, level];
    handleFilterChange('level', newLevels);
  };

  const handleDurationToggle = (duration: string) => {
    const newDurations = filters.duration.includes(duration)
      ? filters.duration.filter(d => d !== duration)
      : [...filters.duration, duration];
    handleFilterChange('duration', newDurations);
  };

  const clearFilters = () => {
    setFilters({
      level: [],
      duration: [],
      rating: null,
      dateRange: { from: '', to: '' }
    });
    onFilterChange({
      level: [],
      duration: [],
      rating: null,
      dateRange: { from: '', to: '' }
    });
  };

  const hasActiveFilters = () => {
    return filters.level.length > 0 || 
           filters.duration.length > 0 || 
           filters.rating !== null ||
           filters.dateRange.from ||
           filters.dateRange.to;
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
          hasActiveFilters()
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg border border-gray-200 dark:border-gray-700'
        }`}
      >
        <Filter className="w-4 h-4" />
        Filters
        {hasActiveFilters() && (
          <span className="w-5 h-5 text-xs flex items-center justify-center bg-white/20 rounded-full">
            {filters.level.length + filters.duration.length + (filters.rating ? 1 : 0)}
          </span>
        )}
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Advanced Filters</h3>
                  {hasActiveFilters() && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Level Filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {levels.map(level => (
                      <button
                        key={level}
                        onClick={() => handleLevelToggle(level)}
                        className={`px-3 py-1.5 text-xs rounded-full font-medium transition-all ${
                          filters.level.includes(level)
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {durations.map(duration => (
                      <button
                        key={duration}
                        onClick={() => handleDurationToggle(duration)}
                        className={`px-3 py-1.5 text-xs rounded-full font-medium transition-all ${
                          filters.duration.includes(duration)
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {duration}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minimum Rating</h4>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => handleFilterChange('rating', filters.rating === rating ? null : rating)}
                        className="flex items-center gap-0.5 px-2 py-1 rounded-lg transition-all"
                      >
                        {[...Array(rating)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              filters.rating && rating <= filters.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </button>
                    ))}
                    {filters.rating && (
                      <button
                        onClick={() => handleFilterChange('rating', null)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Range</h4>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={filters.dateRange.from}
                      onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, from: e.target.value })}
                      className="flex-1 px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                    <span className="text-gray-400 self-center">to</span>
                    <input
                      type="date"
                      value={filters.dateRange.to}
                      onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, to: e.target.value })}
                      className="flex-1 px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}