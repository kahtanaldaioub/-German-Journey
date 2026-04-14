import React from 'react';
import PronounceButton from '../components/PronounceButton';
import { pastExamples } from '../data/pastExamples';

const PastTensePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="bg-white/70 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">⏳ Past Tense: Präteritum & Perfekt</h2>
          <p className="text-center text-gray-600 mb-6 text-sm md:text-base">
            How to talk about the past – two common forms. Tap any speaker to hear the full sentence.
          </p>

          <div className="space-y-5">
            {pastExamples.map((v, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 bg-linear-to-r from-purple-50 to-indigo-50 border-b border-gray-100">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xl font-bold text-purple-700">{v.verb}</span>
                      <span className="text-sm text-gray-500 ml-2">({v.meaning})</span>
                    </div>
                    <div className="flex gap-1">
                      <PronounceButton word={v.verb} />
                    </div>
                  </div>
                </div>

                <div className="p-4 border-b border-gray-100">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-blue-600 text-sm uppercase tracking-wide">Präteritum (simple past)</h3>
                      <div className="mt-2">
                        <span className="font-mono text-lg font-semibold text-gray-800">{v.präteritum}</span>
                        <div className="mt-2 bg-gray-50 p-2 rounded-lg">
                          <div className="flex justify-between items-start gap-2">
                            <span className="italic">{v.examplePräteritum}</span>
                            <PronounceButton word={v.examplePräteritum} />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">→ {v.examplePräteritumEn}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-green-600 text-sm uppercase tracking-wide">Perfekt (present perfect)</h3>
                      <div className="mt-2">
                        <span className="font-mono text-lg font-semibold text-gray-800">{v.perfekt}</span>
                        <div className="mt-2 bg-gray-50 p-2 rounded-lg">
                          <div className="flex justify-between items-start gap-2">
                            <span className="italic">{v.examplePerfekt}</span>
                            <PronounceButton word={v.examplePerfekt} />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">→ {v.examplePerfektEn}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-yellow-50 rounded-xl text-sm">
            <p className="font-semibold text-base">📌 When to use which?</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs md:text-sm">
              <li><strong>Präteritum</strong> – mostly used in writing, stories, and with modal/auxiliary verbs in speech.</li>
              <li><strong>Perfekt</strong> – the most common spoken past tense (used in daily conversation).</li>
              <li>Most verbs form Perfekt with <strong>"haben"</strong>; verbs of movement or change of state use <strong>"sein"</strong>.</li>
            </ul>
            <p className="mt-3 text-xs text-gray-500">💡 Tip: In southern Germany and Austria, Perfekt is used almost exclusively, even for "sein" and "haben".</p>
          </div>
        </div>
    </div>
  );
};

export default PastTensePage;