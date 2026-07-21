'use client';

import { motion } from 'framer-motion';
import { X, Heart, Users, Star, Clock, BookOpen, Calendar } from 'lucide-react';
import Image from 'next/image';
import ShareButton from './ShareButton';
import Badges from './Badges';

interface LectureModalProps {
  lecture: {
    id: number;
    title: string;
    instructor: string;
    date: string;
    image: string;
    description: string;
    duration: string;
    level: string;
    category: string;
    students: number;
    rating: number;
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
}

export default function LectureModal({
  lecture,
  isFavorite,
  onToggleFavorite,
  onClose,
}: LectureModalProps) {
  const isNew = new Date(lecture.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const isPopular = lecture.students > 1000;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64">
          <Image
  src={lecture.image}
  alt={lecture.title}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="eager"
  fetchPriority="high"
  className="object-cover"
/>
          <Badges 
            isNew={isNew}
            isPopular={isPopular}
            duration={lecture.duration}
            className="absolute top-4 left-4"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-2xl font-bold text-white">{lecture.title}</h2>
            <p className="text-gray-200">{lecture.instructor}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(lecture.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {lecture.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {lecture.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShareButton lectureTitle={lecture.title} lectureId={lecture.id} />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggleFavorite}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? 'fill-pink-500 text-pink-500' : 'text-gray-600 dark:text-gray-300'
                  }`}
                />
              </motion.button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4 text-sm">
            <span className={`px-3 py-1 rounded-full font-medium ${
              lecture.level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
              lecture.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {lecture.level}
            </span>
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {lecture.rating} ({lecture.students} students)
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              About this lecture
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {lecture.description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}