import React, { useState, useEffect } from 'react';
import { stories } from '../data/stories';


const speakGerman = (text, onEnd) => {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.9;
  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
};

const StoriesPage = () => {
  const [openStory, setOpenStory] = useState(null);
  const [playingStoryId, setPlayingStoryId] = useState(null);

  const toggleStory = (id) => {
    setOpenStory(openStory === id ? null : id);
  };

  const handlePlayStory = (e, storyId, germanText) => {
    e.stopPropagation();
    if (playingStoryId === storyId) {
      window.speechSynthesis.cancel();
      setPlayingStoryId(null);
    } else {
      window.speechSynthesis.cancel();
      setPlayingStoryId(storyId);
      speakGerman(germanText, () => {
        setPlayingStoryId(null);
      });
    }
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-linear-to-r from-purple-100 to-purple-50 rounded-full mb-4 shadow-lg">
            <span className="text-5xl">📖</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent mb-3">
            German Short Stories
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Read, listen, and learn – each story includes German text, English translation, and audio.
          </p>
        </div>


        <div className="space-y-6">
          {stories.map((story, idx) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-purple-100 animate-fadeInUp"
              style={{ animationDelay: `${0.3 + idx * 0.05}s` }}
            >

              <div
                onClick={() => toggleStory(story.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleStory(story.id);
                  }
                }}
                role="button"
                tabIndex={0}
                className={`w-full text-left p-6 flex justify-between items-center transition-all duration-200 cursor-pointer
                  ${openStory === story.id ? 'bg-purple-50' : 'bg-white hover:bg-purple-50/50'}`}
              >
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-purple-700 mb-1">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {story.titleEn}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <button
                    onClick={(e) => handlePlayStory(e, story.id, story.german)}
                    className={`rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 ${
                      playingStoryId === story.id
                        ? 'bg-purple-700 text-white shadow-md scale-105'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
                    aria-label={playingStoryId === story.id ? "Stop story" : "Play story"}
                  >
                    <span className="text-lg">
                      {playingStoryId === story.id ? '⏹️' : '🔊'}
                    </span>
                  </button>
                  <svg
                    className={`w-5 h-5 text-purple-500 transition-transform duration-300 ${
                      openStory === story.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {openStory === story.id && (
                <div className="p-6 pt-0 border-t border-purple-100">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-linear-to-br from-gray-50 to-purple-50/30 p-5 rounded-2xl shadow-sm">
                      <h4 className="font-semibold text-purple-700 flex items-center gap-2 mb-3">
                        <span className="text-xl">🇩🇪</span> Deutsch
                      </h4>
                      <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                        {story.german}
                      </p>
                    </div>
                    <div className="bg-linear-to-br from-blue-50 to-indigo-50/30 p-5 rounded-2xl shadow-sm">
                      <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                        <span className="text-xl"></span> English
                      </h4>
                      <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                        {story.english}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 text-xs text-center text-purple-400 flex items-center justify-center gap-2">
                    <span>🔊</span>
                    <span>Click the speaker icon in the header to play or stop the full story</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 bg-linear-to-r from-amber-50 to-yellow-50 rounded-2xl shadow-sm border border-amber-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-bold text-amber-800 mb-1">Learning tip</h4>
              <p className="text-sm text-amber-700">
                Read the German story first, try to understand without looking at the translation, 
                then check the English. Listen to the pronunciation to improve your listening skills.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframes globally (in your main CSS file or here) */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default StoriesPage;