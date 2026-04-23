import React from 'react';
import PronounceButton from '../components/PronounceButton';
import { greetings } from '../data/chunks';

const GreetingsLessonPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">

        <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">👋 German Greetings & Goodbyes</h2>
          <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
            Master common German greetings – formal and informal.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {greetings.map((chunk, idx) => (
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
            💡 <strong>Tip:</strong> "Guten Morgen" (until 10 AM), "Guten Tag" (until 6 PM), "Guten Abend" (after 6 PM).
          </div>
        </div>
    </div>
  );
};

export default GreetingsLessonPage;