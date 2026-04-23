import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { a1Lessons as importedLessons } from "../data/a1Lessons";

const A1LessonsPage = () => {
  const [lessons, setLessons] = useState(importedLessons);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompleted, setFilterCompleted] = useState('all');

  // Load saved progress and merge with imported lessons (runs once on mount)
  useEffect(() => {
    const saved = localStorage.getItem('a1LessonsProgress');
    if (saved) {
      const savedLessons = JSON.parse(saved);
      // Merge: keep completion status from saved, but use new lessons from import
      const mergedLessons = importedLessons.map(importedLesson => {
        const savedLesson = savedLessons.find(s => s.id === importedLesson.id);
        return savedLesson
          ? { ...importedLesson, completed: savedLesson.completed }
          : importedLesson;
      });
      setLessons(mergedLessons);
      // Save the merged list back to localStorage (so new lessons are stored)
      localStorage.setItem('a1LessonsProgress', JSON.stringify(mergedLessons));
    } else {
      // No saved progress, just use imported lessons
      setLessons(importedLessons);
    }
  }, []);

  const toggleCompleted = (id) => {
    const updatedLessons = lessons.map(lesson =>
      lesson.id === id ? { ...lesson, completed: !lesson.completed } : lesson
    );
    setLessons(updatedLessons);
    localStorage.setItem('a1LessonsProgress', JSON.stringify(updatedLessons));
  };

  // Load saved progress on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('a1LessonsProgress');
    if (saved) {
      setLessons(JSON.parse(saved));
    }
  }, []);

  // Filter lessons
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCompleted === 'all' ||
                          (filterCompleted === 'completed' && lesson.completed) ||
                          (filterCompleted === 'pending' && !lesson.completed);
    return matchesSearch && matchesFilter;
  });

  const completedCount = lessons.filter(l => l.completed).length;
  const progressPercentage = (completedCount / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🇩🇪 A1 German Course
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Complete all {lessons.length} lessons to master A1 level German
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-4 shadow-md mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Your Progress</span>
            <span className="text-sm text-purple-600 font-bold">{completedCount}/{lessons.length} lessons</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={filterCompleted}
            onChange={(e) => setFilterCompleted(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Lessons</option>
            <option value="completed">Completed</option>
            <option value="pending">Not Started</option>
          </select>
        </div>

        {/* Lessons Grid */}
        <div className="space-y-4">
          {filteredLessons.map((lesson, idx) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg ${
                lesson.completed ? 'border-l-8 border-green-500' : 'border-l-8 border-purple-500'
              }`}
            >
              <div className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{lesson.icon}</span>
                      <h3 className="text-lg md:text-xl font-bold text-purple-700">
                        Lesson {lesson.id}: {lesson.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{lesson.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-gray-400">⏱️ {lesson.duration}</span>
                      <button
                        onClick={() => toggleCompleted(lesson.id)}
                        className={`text-xs px-2 py-1 rounded-full transition ${
                          lesson.completed
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {lesson.completed ? '✅ Completed' : '○ Mark Complete'}
                      </button>
                    </div>
                  </div>
                  <Link
                    to={lesson.path}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full font-medium transition transform hover:scale-105 whitespace-nowrap"
                  >
                    Start Lesson →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No lessons found. Try a different search term.</p>
          </div>
        )}

        {/* Reset progress button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (confirm('Reset all progress? This cannot be undone.')) {
                const resetLessons = lessons.map(l => ({ ...l, completed: false }));
                setLessons(resetLessons);
                localStorage.setItem('a1LessonsProgress', JSON.stringify(resetLessons));
              }
            }}
            className="text-sm text-gray-400 hover:text-red-500 transition"
          >
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default A1LessonsPage;