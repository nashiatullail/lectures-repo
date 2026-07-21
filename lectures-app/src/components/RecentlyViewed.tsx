'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, ChevronRight } from 'lucide-react';
import { Lecture } from '../types';
import Image from 'next/image';

interface RecentlyViewedProps {
  lectures: Lecture[];
  onLectureClick: (lecture: Lecture) => void;
  onClear: () => void;
}

export default function RecentlyViewed({ lectures, onLectureClick, onClear }: RecentlyViewedProps) {
  if (lectures.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recently Viewed
          </h2>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({lectures.length})
          </span>
        </div>
        <button
          onClick={onClear}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors flex items-center gap-1"
        >
          <X className="w-3 h-3" />
          Clear
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        <AnimatePresence>
          {lectures.map((lecture, index) => (
            <motion.div
              key={lecture.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onLectureClick(lecture)}
              className="flex-shrink-0 w-48 cursor-pointer group"
            >
              <div className="relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all group-hover:scale-[1.02]">
                <div className="relative h-24">
                  <Image
                    src={lecture.image}
                    alt={lecture.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-xs font-medium text-white bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {lecture.duration}
                    </span>
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="text-xs font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {lecture.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {lecture.instructor}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {lectures.length >= 8 && (
          <div className="flex-shrink-0 w-12 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}