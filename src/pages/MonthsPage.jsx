import React from 'react';
import PronounceButton from '../components/PronounceButton';
import { months } from '../data/months';

const MonthsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">📆 Months of the Year</h2>
          <p className="text-center text-gray-600 mb-6">Learn the German names for each month</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {months.map(month => (
              <div key={month} className="bg-white p-4 rounded-xl shadow flex items-center justify-between hover:shadow-md transition">
                <span className="text-lg font-semibold text-green-700">{month}</span>
                <PronounceButton word={month} />
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-xl text-center">
            <p className="text-sm">💡 Use "im" + month: "im Januar" (in January). All months are masculine (der).</p>
          </div>
        </div>

    </div>
  );
};

export default MonthsPage;