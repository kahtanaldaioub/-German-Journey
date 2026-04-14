import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';
import ConjugationModal from '../components/ConjugationModal';
import { verbs } from '../data/verbs';

const VerbsPage = () => {
  const [modalVerb, setModalVerb] = useState(null);
  const [modalEnglish, setModalEnglish] = useState("");
  const [modalInfinitive, setModalInfinitive] = useState("");

  const openModal = (verb, infinitive, english) => {
    setModalVerb(verb);
    setModalInfinitive(infinitive);
    setModalEnglish(english);
  };
  const closeModal = () => setModalVerb(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {modalVerb && (
        <ConjugationModal
          verb={modalVerb}
          infinitive={modalInfinitive}
          english={modalEnglish}
          onClose={closeModal}
        />
      )}
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">⚡ 100 Essential Verbs</h2>
          <p className="text-center text-gray-600 mb-6">Click 📖 to see full conjugation and hear every form</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {verbs.map((verb, idx) => (
              <div key={idx} className="bg-linear-to-r from-blue-50 to-indigo-50 p-2 rounded-xl hover:scale-105 transition flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-indigo-800">{verb.infinitive}</span>
                  <span className="text-xs text-gray-500 block">({verb.english})</span>
                </div>
                <div className="flex gap-1">
                  <PronounceButton word={verb.infinitive} />
                  <button onClick={() => openModal(verb.infinitive, verb.infinitive, verb.english)} className="text-gray-500 hover:text-purple-600 transition text-lg" title="Show conjugation">📖</button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 text-sm font-semibold text-green-700">✅ {verbs.length} verbs – click the book to see and hear each conjugated form.</div>
        </div>
    </div>
  );
};

export default VerbsPage;