import React from 'react';
import PronounceButton from '../components/PronounceButton';
import { separableVerbs } from '../data/separableVerbs';

const SeparableVerbsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">✂️ Separable Verbs (trennbare Verben)</h2>
          <p className="text-center text-gray-600 mb-6">
            The prefix moves to the end in main clauses. Click the speaker to hear pronunciation.
          </p>
          
          <div className="space-y-4">
            {separableVerbs.map(v => (
              <div key={v.infinitive} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xl text-purple-700">{v.infinitive}</span>
                    <PronounceButton word={v.infinitive} />
                    <span className="text-gray-500 text-sm">({v.meaning})</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Prefix: <span className="font-mono">{v.infinitive.split(/[^a-zäöüß]/i)[0] || v.infinitive.slice(0,2)}</span>
                  </div>
                </div>
                
                <div className="mt-3 pl-0 md:pl-4 border-l-2 border-purple-200">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-semibold text-gray-700">Example:</span>
                    <span className="italic">{v.example}</span>
                    <PronounceButton word={v.example} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm mt-1">
                    <span className="font-semibold text-gray-500">→</span>
                    <span>{v.exampleEnglish}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    <span className="font-mono">Conjugated:</span> The prefix moves to the end → <span className="font-mono">{v.example}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-green-50 rounded-xl text-sm">
            <p className="font-semibold">📌 Rule:</p>
            <p>In present tense, the prefix is separated and placed at the <strong>end</strong> of the clause.</p>
            <p className="mt-2 italic">„Ich <strong>stehe</strong> früh <strong>auf</strong>.“ (I get up early.)</p>
            <p className="mt-2 text-xs text-gray-600">💡 Note: In subordinate clauses, the prefix stays attached and the whole verb goes to the end.</p>
          </div>
        </div>
    </div>
  );
};

export default SeparableVerbsPage;