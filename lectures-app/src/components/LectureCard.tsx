'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Star, Clock, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Badges from './Badges';
import ShareButton from './ShareButton';

interface LectureCardProps {
  title: string;
  instructor: string;
  date: string;
  image: string;
  duration: string;
  level: string;
  category: string;
  rating: number;
  students: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
  viewMode?: 'grid' | 'list';
}

export default function LectureCard({
  title,
  instructor,
  date,
  image,
  duration,
  level,
  category,
  rating,
  students,
  isFavorite,
  onToggleFavorite,
  onClick,
  viewMode = 'grid',
}: LectureCardProps) {
  const isNew = new Date(date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const isPopular = students > 1000;

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all cursor-pointer"
        onClick={onClick}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, 192px"
              loading="eager"  // 👈 Added for LCP
              fetchPriority="high"  // 👈 Added for speed
              className="object-cover"
            />
            <Badges 
              isNew={isNew}
              isPopular={isPopular}
              duration={duration}
              className="absolute top-3 left-3"
            />
          </div>
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    By {instructor}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <ShareButton lectureTitle={title} lectureId={0} />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite();
                    }}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite
                          ? 'fill-pink-500 text-pink-500'
                          : 'text-gray-400 dark:text-gray-500'
                      }`}
                    />
                  </motion.button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {students}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {rating}
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {level}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="eager"  // 👈 Added for LCP
          fetchPriority="high"  // 👈 Added for speed
          className="object-cover"
        />
        <Badges 
          isNew={isNew}
          isPopular={isPopular}
          duration={duration}
          className="absolute top-3 left-3"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite
                ? 'fill-pink-500 text-pink-500'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          />
        </motion.button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {instructor}
        </p>

        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {rating}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {students}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
            level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {level}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
          <div className="ml-auto">
            <ShareButton lectureTitle={title} lectureId={0} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}