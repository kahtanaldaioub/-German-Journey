import React from 'react';
import PronounceButton from '../components/PronounceButton';
import { modalParticles } from '../data/modalParticles';

const ParticlesPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">✨ Modal Particles – Add Natural Flavour</h2>
          <p className="text-center text-gray-600 mb-6">
            Small words that convey emotion, attitude, or emphasis. Click the speaker to hear pronunciation.
          </p>
          
          <div className="space-y-4">
            {modalParticles.map(p => (
              <div key={p.particle} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-2xl text-purple-700">{p.particle}</span>
                    <PronounceButton word={p.particle} />
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">Modal particle</span>
                </div>
                
                <p className="text-sm text-gray-600 mt-2">{p.usage}</p>
                
                <div className="mt-3 pl-3 border-l-3 border-purple-300">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-semibold text-gray-700">📖 Example:</span>
                    <span className="italic">{p.example}</span>
                    <PronounceButton word={p.example} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm mt-1">
                    <span className="font-semibold text-gray-500">→</span>
                    <span>{p.exampleEnglish}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-yellow-50 rounded-xl text-sm">
            <p className="font-semibold">💡 What are modal particles?</p>
            <p>They add <strong>feeling</strong> and <strong>attitude</strong> to a sentence. They don't change the literal meaning but show the speaker's mood – surprise, certainty, doubt, or softening a command.</p>
            <p className="mt-2 text-xs text-gray-500">Tip: These are very common in spoken German. Try using "mal" and "doch" to sound more natural!</p>
          </div>
        </div>
    </div>
  );
};

export default ParticlesPage;