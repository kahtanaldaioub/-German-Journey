import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { stories } from '../data/stories';

const speakGerman = (text, onEnd) => {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.9;
  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
};

const StoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = stories.find(s => s.id === parseInt(id));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!story) navigate('/stories');
  }, [story, navigate]);

  if (!story) return null;

  const handlePlayStory = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      speakGerman(story.german, () => setIsPlaying(false));
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-6 px-4">
      <div className="max-w-md mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/stories')}
          className="mb-4 flex items-center gap-1 text-purple-600 hover:text-purple-800 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all stories
        </button>

        {/* Story Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image */}
          <div className="relative h-56 w-full">
            <img
              src={story.imageUrl}
              alt={story.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-4">
              <h2 className="text-white text-xl font-bold drop-shadow-md">{story.title}</h2>
              <p className="text-white/80 text-sm">{story.titleEn}</p>
            </div>
          </div>

          {/* Play All Button */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-600">🔊 Listen to story</span>
            <button
              onClick={handlePlayStory}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                isPlaying ? 'bg-red-500 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {isPlaying ? '⏹️ Stop' : '▶️ Play Story'}
            </button>
          </div>

          {/* Story Text */}
          <div className="p-4 space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-purple-600 mb-2">🇩🇪 Deutsch</h3>
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {story.german}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-blue-600 mb-2"> English</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {story.english}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          💡 Tap "Play Story" to hear the entire story read aloud in German.
        </div>
      </div>
    </div>
  );
};

export default StoryDetailPage;