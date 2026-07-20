// components/LectureCard.tsx
import { motion } from "framer-motion";
import { Heart, Clock, User, Star, Users } from "lucide-react";

interface LectureCardProps {
  title: string;
  instructor: string;
  date: string;
  image: string;
  duration: string;
  level: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
  viewMode?: "grid" | "list";
  category?: string;
  rating?: number;
  students?: number;
}

const levelColors = {
  Beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Intermediate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function LectureCard({
  title,
  instructor,
  date,
  image,
  duration,
  level,
  isFavorite,
  onToggleFavorite,
  onClick,
  viewMode = "grid",
  category,
  rating = 4.5,
  students = 0,
}: LectureCardProps) {
  if (viewMode === "list") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row cursor-pointer border border-gray-100 dark:border-gray-700"
        onClick={onClick}
      >
        <div className="relative sm:w-48 h-48 sm:h-auto flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </button>
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <User className="w-4 h-4" />
                {instructor}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${levelColors[level as keyof typeof levelColors]}`}>
              {level}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {duration}
            </span>
            {category && (
              <span className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400">
                {category}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {students.toLocaleString()} students
            </span>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            📅 {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700"
      onClick={onClick}
    >
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${levelColors[level as keyof typeof levelColors]}`}>
            {level}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 mb-2">
          <User className="w-4 h-4" />
          {instructor}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {duration}
          </span>
          <span>📅 {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
        {category && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full text-blue-600 dark:text-blue-400">
              {category}
            </span>
            <span className="text-xs flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}