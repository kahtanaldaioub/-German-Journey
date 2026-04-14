import React from 'react';
import PronounceButton from '../components/PronounceButton';
import { prepositions } from '../data/prepositions';

const PrepositionsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">📍 Prepositions & Their Cases</h2>
          <p className="text-center text-gray-600 mb-8">
            Always learn a preposition together with the case it triggers. Click the speaker to hear pronunciation.
          </p>
          
          <div className="space-y-8">
            {prepositions.map(p => (
              <div key={p.case} className={`bg-white rounded-xl p-6 shadow border-l-8 border-${p.color}-500`}>
                <h3 className={`text-xl font-bold mb-3 text-${p.color}-700`}>{p.case}</h3>
                <div className="space-y-4">
                  {p.preps.map((prep, idx) => (
                    <div key={idx} className="border-b border-gray-200 pb-3 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-lg text-purple-700">{prep.word}</span>
                          <PronounceButton word={prep.word} />
                        </div>
                        <span className="text-sm text-gray-500">→ {prep.meaning}</span>
                      </div>
                      
                      {!p.case.includes("Two‑way") && prep.example && (
                        <div className="mt-2 pl-3 border-l-2 border-gray-300">
                          <div className="flex justify-between items-start gap-2 text-sm">
                            <div>
                              <span className="text-gray-700">{prep.example.german}</span>
                              <br />
                              <span className="text-gray-500 italic">{prep.example.english}</span>
                            </div>
                            <PronounceButton word={prep.example.german} />
                          </div>
                        </div>
                      )}
                      
                      {p.case.includes("Two‑way") && (
                        <div className="mt-2 pl-3 space-y-2">
                          <div className="flex justify-between items-start gap-2 text-sm bg-blue-50 p-2 rounded">
                            <div className="flex-1">
                              <span className="font-semibold text-blue-700">Accusative (movement):</span>
                              <div>{prep.accExample.german}</div>
                              <div className="text-gray-500 italic">{prep.accExample.english}</div>
                            </div>
                            <PronounceButton word={prep.accExample.german} />
                          </div>
                          <div className="flex justify-between items-start gap-2 text-sm bg-green-50 p-2 rounded">
                            <div className="flex-1">
                              <span className="font-semibold text-green-700">Dative (location):</span>
                              <div>{prep.datExample.german}</div>
                              <div className="text-gray-500 italic">{prep.datExample.english}</div>
                            </div>
                            <PronounceButton word={prep.datExample.german} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-yellow-50 rounded-xl text-sm">
            <p className="font-semibold">🔁 Two‑way prepositions rule:</p>
            <p className="mt-1">• <strong>Accusative</strong> = movement / direction (where to?) – <em>Wohin?</em></p>
            <p>• <strong>Dative</strong> = location / position (where?) – <em>Wo?</em></p>
            <p className="mt-2 text-xs text-gray-500">💡 Tip: Memorize the list with a song or mnemonic: "an, auf, hinter, in, neben, über, unter, vor, zwischen"</p>
          </div>
        </div>
    </div>
  );
};

export default PrepositionsPage;