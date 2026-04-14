import React from 'react';
import PronounceButton from '../components/PronounceButton';
import { numbersBasic, tens } from '../data/numbers';

const NumbersPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">🔢 German Numbers</h2>
          <p className="text-center text-gray-600 mb-6">Count from zero to one hundred and beyond</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-3">0–20</h3>
              <div className="grid grid-cols-2 gap-2">
                {numbersBasic.map(num => (
                  <div key={num.german} className="bg-white p-2 rounded-xl shadow flex items-center justify-between">
                    <span><span className="font-bold">{num.german}</span> – {num.english}</span>
                    <PronounceButton word={num.german} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Tens & 100</h3>
              <div className="grid grid-cols-2 gap-2">
                {tens.map(num => (
                  <div key={num.german} className="bg-white p-2 rounded-xl shadow flex items-center justify-between">
                    <span><span className="font-bold">{num.german}</span> – {num.english}</span>
                    <PronounceButton word={num.german} />
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                <p className="text-sm font-semibold">📌 How to form numbers 21–99:</p>
                <p className="text-sm">"einundzwanzig" = eins + und + zwanzig (one‑and‑twenty)</p>
                <p className="text-sm">"fünfundvierzig" = fünf + und + vierzig</p>
                <p className="text-sm">"hundert" = 100, "tausend" = 1000</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-4 text-sm font-semibold text-green-700">✅ Numbers from 0 to 100+ mastered!</div>
        </div>
    </div>
  );
};

export default NumbersPage;