import React from 'react';
import PronounceButton from '../components/PronounceButton';


const SentenceStructurePage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">📝 German Sentence Structure</h2>
          <p className="text-center text-gray-600 mb-6">How to build correct sentences – with English translations</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl">
              <h3 className="text-xl font-bold text-purple-700">1. Main Clause (Aussagesatz)</h3>
              <p className="mt-2"><span className="font-mono">SUBJECT + VERB + REST</span></p>
              <div className="mt-3 space-y-2">
                <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span>Ich <strong>lerne</strong> Deutsch. → <em>I learn German.</em></span>
                  <PronounceButton word="lerne" />
                </div>
                <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span>Er <strong>kommt</strong> morgen. → <em>He comes tomorrow.</em></span>
                  <PronounceButton word="kommt" />
                </div>
                <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span>Wir <strong>wohnen</strong> in Berlin. → <em>We live in Berlin.</em></span>
                  <PronounceButton word="wohnen" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-purple-700 mt-4">2. Yes/No Question (Entscheidungsfrage)</h3>
              <p className="mt-2"><span className="font-mono">VERB + SUBJECT + REST ?</span></p>
              <div className="mt-2 space-y-2">
                <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span><strong>Lernst</strong> du Deutsch? → <em>Do you learn German?</em></span>
                  <PronounceButton word="Lernst" />
                </div>
                <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span><strong>Kommt</strong> er morgen? → <em>Does he come tomorrow?</em></span>
                  <PronounceButton word="Kommt" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <h3 className="text-xl font-bold text-purple-700">3. W‑Questions (W-Fragen)</h3>
              <p className="mt-2"><span className="font-mono">QUESTION WORD + VERB + SUBJECT + REST ?</span></p>
              <div className="mt-3 space-y-2">
                <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span><strong>Wo</strong> wohnst du? → <em>Where do you live?</em></span>
                  <PronounceButton word="wohnst" />
                </div>
                <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span><strong>Was</strong> machst du? → <em>What are you doing?</em></span>
                  <PronounceButton word="machst" />
                </div>
                <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span><strong>Warum</strong> lernst du Deutsch? → <em>Why are you learning German?</em></span>
                  <PronounceButton word="lernst" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-purple-700 mt-4">4. Modal Verbs</h3>
              <p><span className="font-mono">MODAL + SUBJECT + ... + MAIN VERB (at end)</span></p>
              <div className="mt-2 space-y-2">
                <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span>Ich <strong>kann</strong> gut Deutsch <strong>sprechen</strong>. → <em>I can speak German well.</em></span>
                  <PronounceButton word="kann" />
                </div>
                <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span>Du <strong>musst</strong> jetzt <strong>gehen</strong>. → <em>You must go now.</em></span>
                  <PronounceButton word="musst" />
                </div>
                <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span>Wir <strong>wollen</strong> ein Auto <strong>kaufen</strong>. → <em>We want to buy a car.</em></span>
                  <PronounceButton word="wollen" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 rounded-xl text-center">
            <p className="font-semibold">✨ Key rule: The conjugated verb is ALWAYS in second position in main clauses.</p>
          </div>
        </div>
    </div>
  );
};

export default SentenceStructurePage;