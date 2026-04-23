import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { path: '/', label: '🏠 Home' },
  { path: '/a1-lessons', label: '🎓 A1 Course' },
  { path: '/flashcards', label: '📇 Flashcards' },
  { path: '/verb-quiz', label: '📝 Verb Quiz' },
  { path: '/noun-quiz', label: '🏷️ Noun Quiz' },
  { path: '/article-quiz', label: '🎯 Article Quiz' }, 
  { path: '/phrase-quiz', label: '💬 Phrase Quiz' },
  { path: '/sentence-structure', label: '📝 Structure' },
  { path: '/verbs', label: '⚡ Verbs' },
  { path: '/nouns', label: '🏷️ Nouns' },
  { path: '/chunks', label: '💬 Chunks' },
  { path: '/stories', label: '📖 Stories' }, 
  { path: '/conversations', label: '💬 Conversations' },  
  { path: '/radio', label: '📻 Radio' }, 
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Replace with your actual links
  const youtubeUrl = "https://www.youtube.com/@Germanjourney-kd";
  const telegramUrl = "https://t.me/sitesUse";

  return (
    <nav className="sticky top-2 z-40 bg-white/80 backdrop-blur-md rounded-full shadow-lg mx-4 px-4 py-2">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🇩🇪 German Journey
          </span>
        </Link>

        {/* Right side: Social Links + Hamburger */}
        <div className="flex items-center gap-2">
          {/* YouTube Icon - Official style */}
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-red-600 hover:bg-red-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
            aria-label="YouTube channel"
            title="Subscribe on YouTube"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>

          {/* Telegram Icon - Official paper plane inside circle */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-blue-500 hover:bg-blue-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Telegram channel"
            title="Join our Telegram"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.66-.35-1.02.22-1.61.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.2s-.18-.04-.26-.01c-.11.04-1.8 1.14-5.09 3.36-.48.33-.92.49-1.31.48-.43-.01-1.26-.24-1.88-.45-.75-.24-1.34-.38-1.29-.81.03-.33.5-.66 1.37-1 2.64-1.15 6.59-2.44 8.86-3.27 1.21-.44 2.19-.73 2.94-.73.16 0 .33.01.48.05.59.14.38.56.26 1z"/>
            </svg>
          </a>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition focus:outline-none focus:ring-2 focus:ring-purple-300"
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
      </div>

      {/* Dropdown Menu */}
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