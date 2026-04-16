import React from 'react';
import { Link } from 'react-router-dom';
import { conversations } from '../data/conversations';

const ConversationsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            💬 German Conversations
          </h1>
          <p className="text-gray-500 mt-2">Tap any conversation to practice</p>
        </div>

        <div className="space-y-4">
          {conversations.map(conv => (
            <Link
              key={conv.id}
              to={`/conversation/${conv.id}`}
              className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center">
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={conv.imageUrl}
                    alt={conv.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <h2 className="text-lg font-bold text-purple-700">{conv.title}</h2>
                  <p className="text-sm text-gray-500">{conv.titleEn}</p>
                  <p className="text-xs text-gray-400 mt-1">{conv.lines.length} lines</p>
                </div>
                <div className="pr-4 text-purple-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationsPage;