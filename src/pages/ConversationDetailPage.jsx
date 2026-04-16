import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PronounceButton from '../components/PronounceButton';
import { conversations } from '../data/conversations';

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

const ConversationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const conversation = conversations.find(c => c.id === parseInt(id));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!conversation) navigate('/conversations');
  }, [conversation, navigate]);

  if (!conversation) return null;

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-6 px-4">
      <div className="max-w-md mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/conversations')}
          className="mb-4 flex items-center gap-1 text-purple-600 hover:text-purple-800 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all conversations
        </button>

        {/* Conversation Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image */}
          <div className="relative h-56 w-full">
            <img
              src={conversation.imageUrl}
              alt={conversation.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-4">
              <h2 className="text-white text-xl font-bold drop-shadow-md">{conversation.title}</h2>
              <p className="text-white/80 text-sm">{conversation.titleEn}</p>
            </div>
          </div>

          {/* Play All Button */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-600">🔊 Play entire conversation</span>
            <button
              onClick={handlePlayAll}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                isPlaying ? 'bg-red-500 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {isPlaying ? '⏹️ Stop' : '▶️ Play All'}
            </button>
          </div>

          {/* Dialogue Lines */}
          <div className="p-4 space-y-4">
            {conversation.lines.map((line, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-3">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-purple-600 text-sm">{line.speaker}</span>
                  <PronounceButton word={line.german} />
                </div>
                <p className="text-gray-800 text-base mt-1">{line.german}</p>
                <p className="text-gray-500 text-sm mt-1 italic">→ {line.english}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          💡 Tap the speaker next to each line to hear a single sentence.
        </div>
      </div>
    </div>
  );
};

export default ConversationDetailPage;