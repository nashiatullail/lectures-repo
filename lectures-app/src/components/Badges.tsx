'use client';

import { motion } from 'framer-motion';
import { Sparkles, Flame, Clock } from 'lucide-react';

interface BadgesProps {
  isNew?: boolean;
  isPopular?: boolean;
  duration?: string;
  className?: string;
}

export default function Badges({ isNew, isPopular, duration, className = '' }: BadgesProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {isNew && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="badge-new inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white"
        >
          <Sparkles className="w-3 h-3" />
          New
        </motion.span>
      )}
      
      {isPopular && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white"
        >
          <Flame className="w-3 h-3" />
          Popular
        </motion.span>
      )}
      
      {duration && (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          <Clock className="w-3 h-3" />
          {duration}
        </span>
      )}
    </div>
  );
}