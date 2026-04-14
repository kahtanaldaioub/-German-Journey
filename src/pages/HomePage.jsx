import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
const navigate=useNavigate()
  const quizRoutes = [
    '/verb-quiz',
    '/noun-quiz',
    '/phrase-quiz',
    '/article-quiz'
  ];
  const handleRandomQuiz = () => {
    const randomIndex = Math.floor(Math.random() * quizRoutes.length);
    navigate(quizRoutes[randomIndex]);
  };
  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-pink-600"
        >
          🇩🇪 German Journey
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mt-6 text-gray-700 max-w-2xl"
        >
          Master German from A to Z with interactive flashcards, quizzes, grammar guides, audio pronunciation, live radio, stories, and real conversations.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          <Link to="/flashcards" className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-purple-700 transition transform hover:scale-105">
            Start Learning →
          </Link>
           <button
              onClick={handleRandomQuiz}
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold shadow-lg border-2 border-purple-600 hover:bg-purple-50 transition transform hover:scale-105"
              >
              Take a Quiz
           </button>
          {/* New Radio Button */}
          <Link to="/radio" className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:from-purple-600 hover:to-pink-600 transition transform hover:scale-105">
            📻 Live Radio
          </Link>
        </motion.div>
      </section>

      <section className="py-16 bg-white/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Learn</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-xl font-bold mb-2">100+ Verbs & Nouns</h3>
              <p className="text-gray-600">Essential vocabulary with articles and conjugation tables.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-3">🗣️</div>
              <h3 className="text-xl font-bold mb-2">Audio Pronunciation</h3>
              <p className="text-gray-600">Click any speaker icon to hear native German pronunciation.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-2">Interactive Quizzes</h3>
              <p className="text-gray-600">Test your knowledge and track your progress.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-3">📻</div>
              <h3 className="text-xl font-bold mb-2">Live German Radio</h3>
              <p className="text-gray-600">Stream real German radio stations and improve listening comprehension.</p>
              
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-3">📖</div>
              <h3 className="text-xl font-bold mb-2">Short Stories</h3>
              <p className="text-gray-600">Read bilingual stories with audio – perfect for building vocabulary in context.</p>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;