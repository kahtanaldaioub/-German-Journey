import React from 'react';
import PronounceButton from '../components/PronounceButton';

import { chunks } from '../data/chunks';

const ChunksPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">💬 {chunks.length} German Chunks</h2>
          <p className="text-center text-gray-600 mb-6">Speak naturally from day one – each phrase with English translation</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto p-2">
            {chunks.map((chunk, idx) => (
              <div key={idx} className="bg-amber-50 p-2 rounded-xl shadow flex items-center justify-between hover:bg-amber-100">
                <div>
                  <span className="font-medium">{chunk.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {chunk.english}</span>
                </div>
                <PronounceButton word={chunk.german} />
              </div>
            ))}
          </div>
          <div className="text-center mt-6 text-sm font-semibold text-green-700">✅ {chunks.length} practical chunks + English meanings!</div>
        </div>

    </div>
  );
};

export default ChunksPage;