import React from 'react';
import PronounceButton from '../components/PronounceButton';
import { personalPronouns } from '../data/pronouns';
import { questionWords } from '../data/questionWords';

const PronounsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">👤 Personal Pronouns & ❓ Question Words</h2>
          <p className="text-center text-gray-600 mb-6">The building blocks of every sentence</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-purple-700 mb-3">Personal Pronouns (Subjekt)</h3>
              <div className="grid grid-cols-2 gap-2">
                {personalPronouns.map((pron, idx) => (
                  <div key={idx} className="bg-white p-2 rounded-xl shadow flex items-center justify-between">
                    <span><span className="font-bold">{pron.german}</span> – {pron.english}</span>
                    <PronounceButton word={pron.german} />
                  </div>
                ))}
              </div>
              <div className="mt-3 text-sm text-gray-600">Note: "Sie" (capital S) = formal you; "sie" (lowercase) = she or they.</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-700 mb-3">Fundamental Question Words</h3>
              <div className="grid grid-cols-2 gap-2">
                {questionWords.map((qw, idx) => (
                  <div key={idx} className="bg-white p-2 rounded-xl shadow flex items-center justify-between">
                    <span><span className="font-bold">{qw.german}</span> – {qw.english}</span>
                    <PronounceButton word={qw.german.split('/')[0]} />
                  </div>
                ))}
              </div>
              <div className="mt-3 text-sm text-gray-600">Use these to form open questions. The verb follows immediately.</div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default PronounsPage;