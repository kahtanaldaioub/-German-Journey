import React from 'react';
import PronounceButton from '../components/PronounceButton';
import { colors } from '../data/colors';

const ColorsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">🎨 German Colors</h2>
          <p className="text-center text-gray-600 mb-6">Learn the colors – each with pronunciation</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colors.map(color => (
              <div 
                key={color.german} 
                className="bg-white p-4 rounded-xl shadow flex items-center justify-between hover:shadow-md transition"
                style={{ borderLeft: `8px solid ${color.english}` }}
              >
                <div>
                  <span className="text-xl font-bold text-purple-700">{color.german}</span>
                  <span className="text-gray-500 ml-2">– {color.english}</span>
                </div>
                <PronounceButton word={color.german} />
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-pink-50 rounded-xl text-center">
            <p className="text-sm">💡 Colors are adjectives – they change endings based on the noun's gender.</p>
          </div>
        </div>
    </div>
  );
};

export default ColorsPage;