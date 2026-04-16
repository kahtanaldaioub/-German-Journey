import React, { useState, useRef, useEffect } from 'react';
import PronounceButton from '../components/PronounceButton';
import { dailyStories } from '../data/todaysStory';

// Speak the entire story sentence by sentence
const speakStory = (text) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  
  // Split by sentences (period, exclamation, question mark)
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  
  let index = 0;
  const speakNext = () => {
    if (index >= sentences.length) return;
    const utterance = new SpeechSynthesisUtterance(sentences[index].trim());
    utterance.lang = 'de-DE';
    utterance.rate = 0.85;
    utterance.onend = () => {
      index++;
      setTimeout(speakNext, 700);
    };
    window.speechSynthesis.speak(utterance);
  };
  speakNext();
};

const DailyStoryPage = () => {
  const story = dailyStories[0]; // Always the first (and only) story
  const [isPlaying, setIsPlaying] = useState(false);
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    // Format today's date correctly (no year issue)
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setTodayDate(now.toLocaleDateString('en-US', options));
  }, []);

  const handlePlayStory = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      speakStory(story.german);
      setIsPlaying(true);
      // Reset playing flag when speech ends
      const checkEnd = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          setIsPlaying(false);
          clearInterval(checkEnd);
        }
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 py-6 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            📖 Daily German Story
          </h1>
          <p className="text-gray-500 text-xs mt-1">
            {todayDate}
          </p>
        </div>

        {/* Story Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image */}
          <div className="relative h-64 w-full">
            <img
              src={story.imageUrl}
              alt={story.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <h2 className="text-white text-xl font-bold drop-shadow-md">
                {story.title}
              </h2>
            </div>
          </div>

          {/* Story Text */}
          <div className="p-5">
            {/* German text */}
            <div className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-purple-600 font-semibold text-sm">🇩🇪 Deutsch</span>
                <div className="flex gap-2">
                  <button
                    onClick={handlePlayStory}
                    className={`p-2 rounded-full transition ${
                      isPlaying ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'
                    }`}
                    aria-label={isPlaying ? 'Stop' : 'Play story'}
                  >
                    {isPlaying ? '⏹️' : '🔊'}
                  </button>
                  <PronounceButton word={story.german} />
                </div>
              </div>
              <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                {story.german}
              </p>
            </div>

            {/* English translation */}
            <div className="bg-gray-50 rounded-xl p-3">
              <span className="text-blue-600 font-semibold text-sm"> English</span>
              <p className="text-gray-700 text-sm mt-1 leading-relaxed whitespace-pre-line">
                {story.english}
              </p>
            </div>
          </div>
        </div>

        {/* Update reminder */}
        <div className="mt-6 text-center text-xs text-gray-400">
          ✨ A new story appears here every day. Check back tomorrow!
        </div>
      </div>
    </div>
  );
};

export default DailyStoryPage;