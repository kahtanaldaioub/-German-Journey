// src/pages/DailyConversationPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import PronounceButton from '../components/PronounceButton';
import { dailyConversations } from '../data/dailyConversations';

const speakConversation = (lines, onEnd) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  let index = 0;
  const speakNext = () => {
    if (index >= lines.length) {
      if (onEnd) onEnd();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(lines[index].german);
    utterance.lang = 'de-DE';
    utterance.rate = 0.9;
    utterance.onend = () => {
      index++;
      setTimeout(speakNext, 500);
    };
    window.speechSynthesis.speak(utterance);
  };
  speakNext();
};

const DailyConversationPage = () => {
  const conversation = dailyConversations[0];
  const [isPlaying, setIsPlaying] = useState(false);
  const [todayDate, setTodayDate] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    setTodayDate(now.toLocaleDateString('en-US', options));
  }, []);

  const handlePlayAll = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      speakConversation(conversation.lines, () => setIsPlaying(false));
      setIsPlaying(true);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-50 to-purple-50 overflow-hidden">
      {/* Fixed Header – always visible */}
      <div className="flex-none pt-8 px-4 text-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          💬 Daily German Conversation
        </h1>
        <p className="text-gray-500 text-xs mt-0.5">{todayDate}</p>
      </div>

      {/* Scrollable Content – fits rest of screen */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="max-w-md mx-auto">
          {/* Image – smaller, fits well */}
          <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-md mt-2">
            <img
              src={conversation.imageUrl}
              alt={conversation.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-4">
              <h2 className="text-white text-lg font-bold drop-shadow-md">
                {conversation.title}
              </h2>
              <p className="text-white/80 text-xs">{conversation.germanTitle}</p>
            </div>
          </div>

          {/* Play All Button */}
          <div className="flex justify-between items-center bg-white/80 backdrop-blur rounded-full p-2 px-4 mt-4 shadow-sm">
            <span className="text-xs font-semibold text-gray-600">🔊 Entire conversation</span>
            <button
              onClick={handlePlayAll}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                isPlaying
                  ? 'bg-red-500 text-white'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {isPlaying ? '⏹️ Stop' : '▶️ Play All'}
            </button>
          </div>

          {/* Dialogue Lines – compact bubbles */}
          <div className="mt-4 space-y-3">
            {conversation.lines.map((line, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-purple-600 text-xs">{line.speaker}</span>
                  <PronounceButton word={line.german} />
                </div>
                <p className="text-gray-800 text-sm mt-1">{line.german}</p>
                <p className="text-gray-500 text-xs mt-1 italic">→ {line.english}</p>
              </div>
            ))}
          </div>

          <div className="text-center text-[10px] text-gray-400 mt-6 pb-2">
            ✨ New conversation every day. Listen, repeat, and record!
          </div>
        </div>
      </div>

      {/* Optional: subtle recording hint */}
      <div className="flex-none bg-black/5 text-center py-1 text-[10px] text-gray-400">
        📱 Record your screen → speak along → post as reel
      </div>
    </div>
  );
};

export default DailyConversationPage;