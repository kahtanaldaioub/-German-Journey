import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';
import { adjComparatives } from '../data/comparatives';

const ComparativesPage = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpanded = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="bg-white/70 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">📈 Comparative & Superlative</h2>
          <p className="text-center text-gray-600 mb-6 text-sm md:text-base">
            How to say "bigger", "the biggest" etc. Tap any card to see examples.
          </p>
          
          <div className="space-y-4">
            {adjComparatives.map((adj, idx) => (
              <div 
                key={adj.positive} 
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >

                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition flex flex-wrap items-center justify-between gap-2"
                  onClick={() => toggleExpanded(idx)}
                >
                  <div className="flex-1 min-w-[120px]">
                    <div className="font-bold text-lg text-purple-700">{adj.positive}</div>
                    <div className="text-xs text-gray-500">{adj.meaning}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-md font-medium text-blue-600">{adj.comparative}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-md font-medium text-green-600">{adj.superlative}</div>
                  </div>
                  <div className="flex gap-1">
                    <PronounceButton word={adj.positive} />
                    <PronounceButton word={adj.comparative} />
                    <PronounceButton word={adj.superlative} />
                  </div>
                  <svg
                    className={`w-5 h-5 text-purple-500 transition-transform ${expanded === idx ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {expanded === idx && (
                  <div className="p-4 pt-0 border-t border-gray-100 space-y-3 animate-fadeIn">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="font-semibold text-green-600 text-sm">Positive:</span>
                          <p className="text-sm italic mt-1">{adj.examplePositive}</p>
                          <p className="text-xs text-gray-500 mt-1">→ {adj.examplePositiveEn}</p>
                        </div>
                        <PronounceButton word={adj.examplePositive} />
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="font-semibold text-blue-600 text-sm">Comparative:</span>
                          <p className="text-sm italic mt-1">{adj.exampleComparative}</p>
                          <p className="text-xs text-gray-500 mt-1">→ {adj.exampleComparativeEn}</p>
                        </div>
                        <PronounceButton word={adj.exampleComparative} />
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="font-semibold text-purple-600 text-sm">Superlative:</span>
                          <p className="text-sm italic mt-1">{adj.exampleSuperlative}</p>
                          <p className="text-xs text-gray-500 mt-1">→ {adj.exampleSuperlativeEn}</p>
                        </div>
                        <PronounceButton word={adj.exampleSuperlative} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-yellow-50 rounded-xl text-sm">
            <p className="font-semibold text-base md:text-lg">📝 Formation Rules:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs md:text-sm">
              <li><strong>Comparative</strong>: add <strong>"-er"</strong> (schnell → schneller)</li>
              <li><strong>Superlative</strong>: use <strong>"am ... -sten"</strong> (am schnellsten)</li>
              <li>Adjectives with <strong>a, o, u</strong> often add an umlaut: groß → größer, alt → älter</li>
              <li><strong>Irregular</strong>: gut → besser → am besten; gern → lieber → am liebsten</li>
            </ul>
            <p className="mt-3 text-xs text-gray-500">✨ Tip: Tap any card to see example sentences with pronunciation.</p>
          </div>
        </div>
    </div>
  );
};

export default ComparativesPage;