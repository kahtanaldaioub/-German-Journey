import React from 'react';
import PronounceButton from '../components/PronounceButton';
import { days } from '../data/days';

const DaysPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">📅 Days of the Week</h2>
          <p className="text-center text-gray-600 mb-6">Learn the German names for each day – click the speaker to hear pronunciation</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {days.map(day => (
              <div key={day.german} className="bg-white p-4 rounded-xl shadow flex items-center justify-between hover:shadow-md transition">
                <div>
                  <span className="text-xl font-bold text-purple-700">{day.german}</span>
                  <span className="text-gray-500 ml-2">– {day.english}</span>
                </div>
                <PronounceButton word={day.german} />
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-center">
            <p className="text-sm">💡 Tip: All days in German are masculine (der), so you say "am Montag" (on Monday).</p>
          </div>
        </div>
    </div>
  );
};

export default DaysPage;