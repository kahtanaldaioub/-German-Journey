import React from 'react';
import PronounceButton from '../components/PronounceButton';
import { commonPhrases } from '../data/chunks';

const CommonPhrasesLessonPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">💬 Common German Phrases</h2>
          <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
            Essential everyday phrases for basic conversations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commonPhrases.map((chunk, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl shadow flex justify-between items-center hover:shadow-md transition">
                <div>
                  <span className="font-medium text-lg">{chunk.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {chunk.english}</span>
                </div>
                <PronounceButton word={chunk.german} />
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-xl text-center text-sm">
            💡 <strong>Tip:</strong> Practice these daily – they're the most frequently used phrases in German.
          </div>
        </div>
    </div>
  );
};

export default CommonPhrasesLessonPage;