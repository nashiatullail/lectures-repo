"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Heart, Filter, Grid3x3, LayoutList } from "lucide-react";

// Components
import LectureCard from "../components/LectureCard";
import SearchBar from "../components/SearchBar";
import LectureModal from "../components/LectureModal";
import ThemeToggle from "../components/ThemeToggle";
import RecentlyViewed from "../components/RecentlyViewed";
import AdvancedFilters from "../components/AdvancedFilters";

// Hooks
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

// Types
import { FilterOptions } from "../types";

const lectures = [
  {
    id: 1,
    title: "Introduction to Artificial Intelligence",
    instructor: "Dr. Sarah Chen",
    date: "2026-01-15",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
    description:
      "An overview of AI fundamentals including machine learning, neural networks, and their real-world applications. Perfect for beginners.",
    duration: "45 min",
    level: "Beginner" as const,
    category: "AI & Machine Learning",
    students: 1243,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Advanced JavaScript: Promises & Async/Await",
    instructor: "Prof. Michael Rodriguez",
    date: "2026-01-18",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop",
    description:
      "Deep dive into asynchronous programming in JavaScript. Learn how to handle promises, async/await patterns, and error handling.",
    duration: "60 min",
    level: "Intermediate" as const,
    category: "Web Development",
    students: 876,
    rating: 4.6,
  },
  {
    id: 3,
    title: "Data Structures and Algorithms",
    instructor: "Dr. Emily Watson",
    date: "2026-01-20",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&h=300&fit=crop",
    description:
      "Master essential data structures including arrays, linked lists, trees, and graphs. Learn algorithm design and complexity analysis.",
    duration: "90 min",
    level: "Intermediate" as const,
    category: "Computer Science",
    students: 1567,
    rating: 4.9,
  },
  {
    id: 4,
    title: "Introduction to Python Programming",
    instructor: "Prof. David Kim",
    date: "2026-01-22",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&h=300&fit=crop",
    description:
      "Learn Python from scratch! Covers variables, loops, functions, and object-oriented programming principles.",
    duration: "50 min",
    level: "Beginner" as const,
    category: "Programming",
    students: 2134,
    rating: 4.7,
  },
  {
    id: 5,
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Rachel Thompson",
    date: "2026-01-25",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    description:
      "Understand supervised and unsupervised learning, regression, classification, and clustering algorithms.",
    duration: "75 min",
    level: "Advanced" as const,
    category: "AI & Machine Learning",
    students: 987,
    rating: 4.8,
  },
  {
    id: 6,
    title: "React.js: From Basics to Advanced",
    instructor: "Prof. James Wilson",
    date: "2026-01-28",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
    description:
      "Comprehensive React course covering hooks, context API, state management, and performance optimization.",
    duration: "80 min",
    level: "Intermediate" as const,
    category: "Web Development",
    students: 1543,
    rating: 4.8,
  },
  {
    id: 7,
    title: "Cloud Computing with AWS",
    instructor: "Dr. Lisa Park",
    date: "2026-02-01",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop",
    description:
      "Introduction to cloud services, EC2, S3, Lambda, and serverless architecture on Amazon Web Services.",
    duration: "70 min",
    level: "Intermediate" as const,
    category: "Cloud Computing",
    students: 654,
    rating: 4.5,
  },
  {
    id: 8,
    title: "Cybersecurity Essentials",
    instructor: "Prof. Robert Chang",
    date: "2026-02-03",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop",
    description:
      "Learn about network security, encryption, threat detection, and best practices for securing applications.",
    duration: "55 min",
    level: "Beginner" as const,
    category: "Cybersecurity",
    students: 1123,
    rating: 4.6,
  },
  {
    id: 9,
    title: "Database Design and SQL",
    instructor: "Dr. Maria Garcia",
    date: "2026-02-06",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&h=300&fit=crop",
    description:
      "Master relational database design, normalization, complex queries, and SQL optimization techniques.",
    duration: "65 min",
    level: "Intermediate" as const,
    category: "Data Science",
    students: 1345,
    rating: 4.7,
  },
  {
    id: 10,
    title: "DevOps and CI/CD Pipeline",
    instructor: "Prof. Thomas Lee",
    date: "2026-02-10",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=500&h=300&fit=crop",
    description:
      "Learn about continuous integration and deployment, Docker, Kubernetes, and modern DevOps practices.",
    duration: "85 min",
    level: "Advanced" as const,
    category: "DevOps",
    students: 765,
    rating: 4.7,
  },
  {
    id: 11,
    title: "Digital Marketing Strategies",
    instructor: "Dr. Amanda Foster",
    date: "2026-02-13",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop",
    description:
      "Explore SEO, social media marketing, content strategy, and analytics for modern digital marketing.",
    duration: "50 min",
    level: "Beginner" as const,
    category: "Marketing",
    students: 987,
    rating: 4.4,
  },
  {
    id: 12,
    title: "Mobile App Development with Flutter",
    instructor: "Prof. Kevin Patel",
    date: "2026-02-17",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
    description:
      "Build cross-platform mobile apps with Flutter and Dart. Covers widgets, state management, and API integration.",
    duration: "75 min",
    level: "Intermediate" as const,
    category: "Mobile Development",
    students: 876,
    rating: 4.6,
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedLecture, setSelectedLecture] = useState<typeof lectures[0] | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<FilterOptions>({
    level: [],
    duration: [],
    rating: null,
    dateRange: { from: '', to: '' }
  });

  // Get unique categories
  const categories = ["All", ...new Set(lectures.map(l => l.category))];

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Persist favorites whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Recently viewed hook
  const { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  // Handle lecture click
  const handleLectureClick = (lecture: typeof lectures[0]) => {
    setSelectedLecture(lecture);
    addToRecentlyViewed(lecture);
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSearch: () => {
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
      searchInput?.focus();
    },
    onEscape: () => setSelectedLecture(null),
    onFavorites: () => setShowFavoritesOnly(!showFavoritesOnly)
  });

  // Filter lectures
  const filteredLectures = lectures
    .filter((lecture) => 
      lecture.title.toLowerCase().includes(search.toLowerCase()) ||
      lecture.instructor.toLowerCase().includes(search.toLowerCase()) ||
      lecture.category.toLowerCase().includes(search.toLowerCase())
    )
    .filter((lecture) => (showFavoritesOnly ? favorites.includes(lecture.id) : true))
    .filter((lecture) => selectedCategory === "All" || lecture.category === selectedCategory)
    .filter((lecture) => {
      // Advanced filters
      if (filters.level.length > 0 && !filters.level.includes(lecture.level)) return false;
      if (filters.rating && lecture.rating < filters.rating) return false;
      
      // Duration filter
      if (filters.duration.length > 0) {
        const durationNum = parseInt(lecture.duration);
        let matchesDuration = false;
        filters.duration.forEach(d => {
          if (d === '< 30 min' && durationNum < 30) matchesDuration = true;
          if (d === '30-60 min' && durationNum >= 30 && durationNum < 60) matchesDuration = true;
          if (d === '60-90 min' && durationNum >= 60 && durationNum < 90) matchesDuration = true;
          if (d === '> 90 min' && durationNum >= 90) matchesDuration = true;
        });
        if (!matchesDuration) return false;
      }
      
      // Date range filter
      if (filters.dateRange.from) {
        const lectureDate = new Date(lecture.date);
        const fromDate = new Date(filters.dateRange.from);
        if (lectureDate < fromDate) return false;
      }
      if (filters.dateRange.to) {
        const lectureDate = new Date(lecture.date);
        const toDate = new Date(filters.dateRange.to);
        if (lectureDate > toDate) return false;
      }
      
      return true;
    });

  const totalLectures = lectures.length;
  const foundLectures = filteredLectures.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Lectures Explorer
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {totalLectures} premium lectures • Created by Nashia Tul Lail
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  showFavoritesOnly
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg border border-gray-200 dark:border-gray-700"
                }`}
              >
                <Heart className={`w-4 h-4 ${showFavoritesOnly ? "fill-white" : ""}`} />
                Favorites
              </motion.button>
              <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid" 
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list" 
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recently Viewed */}
        <RecentlyViewed 
          lectures={recentlyViewed}
          onLectureClick={handleLectureClick}
          onClear={clearRecentlyViewed}
        />

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <SearchBar search={search} setSearch={setSearch} />
            </div>
            <div className="flex items-center gap-2">
              <AdvancedFilters 
                onFilterChange={setFilters}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Filter className="w-4 h-4" />
              <span>Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{foundLectures}</span> of {totalLectures} lectures
            </p>
            {showFavoritesOnly && (
              <span className="text-pink-600 dark:text-pink-400 font-medium">
                ❤️ {favorites.length} favorites
              </span>
            )}
          </div>
        </motion.div>

        {/* Lectures Grid */}
        <AnimatePresence mode="wait">
          {foundLectures > 0 ? (
            <motion.div 
              key={viewMode + selectedCategory + showFavoritesOnly}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`${
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }`}
            >
              <AnimatePresence>
                {filteredLectures.map((lecture, index) => (
                  <motion.div
                    key={lecture.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <LectureCard
                      title={lecture.title}
                      instructor={lecture.instructor}
                      date={lecture.date}
                      image={lecture.image}
                      duration={lecture.duration}
                      level={lecture.level}
                      category={lecture.category}
                      rating={lecture.rating}
                      students={lecture.students}
                      isFavorite={favorites.includes(lecture.id)}
                      onToggleFavorite={() => toggleFavorite(lecture.id)}
                      onClick={() => handleLectureClick(lecture)}
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-xl"
            >
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {showFavoritesOnly ? "No favorite lectures yet" : "No lectures found"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {showFavoritesOnly 
                  ? "Start exploring and add lectures to your favorites!" 
                  : `No lectures match "${search}"`}
              </p>
              {showFavoritesOnly && favorites.length === 0 && (
                <button
                  onClick={() => setShowFavoritesOnly(false)}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
                >
                  Browse all lectures
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lecture Modal */}
      <AnimatePresence>
        {selectedLecture && (
          <LectureModal
            lecture={selectedLecture}
            isFavorite={favorites.includes(selectedLecture.id)}
            onToggleFavorite={() => toggleFavorite(selectedLecture.id)}
            onClose={() => setSelectedLecture(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}