// components/LectureModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Clock, User, Star, Users, BookOpen, Calendar, Award } from "lucide-react";

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
    category?: string;
    rating?: number;
    students?: number;
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
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white dark:bg-gray-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Header */}
          <div className="relative h-64">
            <img
              src={lecture.image}
              alt={lecture.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={onToggleFavorite}
              className="absolute top-4 right-16 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                {lecture.level}
              </span>
              {lecture.category && (
                <span className="inline-block ml-2 px-4 py-1.5 bg-blue-500/30 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {lecture.category}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {lecture.title}
            </h2>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {lecture.instructor}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(lecture.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {lecture.duration}
              </span>
              {lecture.rating && (
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {lecture.rating.toFixed(1)}
                </span>
              )}
              {lecture.students && (
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {lecture.students.toLocaleString()} students
                </span>
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                About this lecture
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {lecture.description}
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-shadow">
                Enroll Now
              </button>
              <button className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Save for Later
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}