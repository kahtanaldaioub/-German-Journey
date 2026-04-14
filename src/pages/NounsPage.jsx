import React from 'react';
import PronounceButton from '../components/PronounceButton';
import { nouns } from '../data/nouns';

const NounsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">🏷️ {nouns.length} Nouns (with Articles)</h2>
          <p className="text-center text-gray-600 mb-6">der, die, das – master the gender</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[600px] overflow-y-auto p-2">
            {nouns.map((noun, idx) => (
              <div key={idx} className={`p-2 rounded-xl shadow-sm border-l-8 flex items-center justify-between ${noun.article === 'der' ? 'border-blue-400 bg-blue-50' : noun.article === 'die' ? 'border-pink-400 bg-pink-50' : 'border-green-400 bg-green-50'}`}>
                <div>
                  <span className="font-bold">{noun.article} {noun.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {noun.english}</span>
                </div>
                <PronounceButton word={`${noun.article} ${noun.german}`} />
              </div>
            ))}
          </div>
          <div className="text-center mt-6 text-sm font-semibold text-green-700">✅ Total nouns: {nouns.length}</div>
        </div>
    </div>
  );
};

export default NounsPage;