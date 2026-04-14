import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { path: '/', label: '🏠 Home' },
  { path: '/flashcards', label: '📇 Flashcards' },
  { path: '/verb-quiz', label: '📝 Verb Quiz' },
  { path: '/noun-quiz', label: '🏷️ Noun Quiz' },
  { path: '/article-quiz', label: '🎯 Article Quiz' }, 
  { path: '/phrase-quiz', label: '💬 Phrase Quiz' },
  { path: '/numbers', label: '🔢 Numbers' },
  { path: '/days', label: '📅 Days' },        // NEW
  { path: '/months', label: '📆 Months' },    // NEW
  { path: '/colors', label: '🎨 Colors' },    // NEW
  { path: '/alphabet', label: '🔤 Alphabet' },
  { path: '/pronouns', label: '👤 Pronouns' },
  { path: '/sentence-structure', label: '📝 Structure' },
  { path: '/verbs', label: '⚡ Verbs' },
  { path: '/nouns', label: '🏷️ Nouns' },
  { path: '/chunks', label: '💬 Chunks' },
  { path: '/cases', label: '📚 Cases' },
  { path: '/prepositions', label: '📍 Prepositions' },
  { path: '/separable', label: '✂️ Separable' },
  { path: '/particles', label: '✨ Particles' },
  { path: '/comparatives', label: '📈 Comparatives' },
  { path: '/past', label: '⏳ Past Tense' },
  { path: '/stories', label: '📖 Stories' }, 
  { path: '/conversations', label: '💬 Conversations' },  
  { path: '/radio', label: '📻 Radio' }, 
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-2 z-40 bg-white/80 backdrop-blur-md rounded-full shadow-lg mx-4  px-4 py-2">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
        <span className="text-xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🇩🇪 German Journey
        </span>
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition focus:outline-none"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Dropdown Menu with solid background */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-3 mx-4 bg-white rounded-2xl shadow-xl border border-gray-100 max-h-[70vh] overflow-y-auto animate-fadeIn">
          <ul className="flex flex-col gap-1 p-3">
            {navLinks.map(link => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-base font-medium transition ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-purple-100'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;