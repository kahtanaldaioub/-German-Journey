import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const CasesPage = () => {
  const [selectedCase, setSelectedCase] = useState('Nominative');

  // Case data with expanded examples (5 per case)
  const casesData = {
    Nominative: {
      usage: "subject of the sentence – who/what is doing the action",
      color: "blue",
      articles: { der: "der", die: "die", das: "das", plural: "die" },
      examples: [
        { german: "Der Hund schläft.", english: "The dog sleeps." },
        { german: "Die Katze miaut.", english: "The cat meows." },
        { german: "Das Kind spielt.", english: "The child plays." },
        { german: "Der Lehrer erklärt die Grammatik.", english: "The teacher explains the grammar." },
        { german: "Die Sonne scheint hell.", english: "The sun shines brightly." }
      ],
      extraNote: "The nominative case is used for the subject of the sentence – the person or thing performing the action."
    },
    Accusative: {
      usage: "direct object – who/what receives the action",
      color: "green",
      articles: { der: "den", die: "die", das: "das", plural: "die" },
      examples: [
        { german: "Ich sehe den Hund.", english: "I see the dog." },
        { german: "Sie liest die Zeitung.", english: "She reads the newspaper." },
        { german: "Wir kaufen das Buch.", english: "We buy the book." },
        { german: "Er hat den Schlüssel verloren.", english: "He lost the key." },
        { german: "Kannst du die Tasche finden?", english: "Can you find the bag?" }
      ],
      extraNote: "Accusative is also used after certain prepositions (durch, für, gegen, ohne, um) and with two‑way prepositions when movement is involved (e.g., 'Ich gehe in den Park')."
    },
    Dative: {
      usage: "indirect object – to/for whom something is done",
      color: "orange",
      articles: { der: "dem", die: "der", das: "dem", plural: "den" },
      examples: [
        { german: "Ich gebe dem Hund einen Knochen.", english: "I give the dog a bone." },
        { german: "Er hilft der Frau.", english: "He helps the woman." },
        { german: "Wir folgen dem Auto.", english: "We follow the car." },
        { german: "Sie dankt ihrer Mutter.", english: "She thanks her mother." },
        { german: "Das Kind antwortet seinem Freund.", english: "The child answers his friend." }
      ],
      extraNote: "Dative is used after certain prepositions (aus, bei, mit, nach, von, zu) and with two‑way prepositions when location is expressed (e.g., 'Ich bin im Park')."
    },
    Genitive: {
      usage: "possession – whose",
      color: "purple",
      articles: { der: "des", die: "der", das: "des", plural: "der" },
      examples: [
        { german: "Das ist das Haus des Mannes.", english: "That is the man's house." },
        { german: "Die Farbe der Blume ist schön.", english: "The color of the flower is beautiful." },
        { german: "Das Ende des Films war spannend.", english: "The end of the movie was exciting." },
        { german: "Der Name des Lehrers ist Herr Schmidt.", english: "The teacher's name is Mr. Schmidt." },
        { german: "Die Schönheit der Natur ist beeindruckend.", english: "The beauty of nature is impressive." }
      ],
      extraNote: "Genitive is often replaced by 'von' + dative in everyday spoken German, but it's still common in formal writing."
    }
  };

  const cases = ['Nominative', 'Accusative', 'Dative', 'Genitive'];
  const current = casesData[selectedCase];

  const getColorClasses = (color) => {
    switch(color) {
      case 'blue': return 'border-blue-500 bg-blue-50';
      case 'green': return 'border-green-500 bg-green-50';
      case 'orange': return 'border-orange-500 bg-orange-50';
      case 'purple': return 'border-purple-500 bg-purple-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">📚 The Four German Cases</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Select a case to see its article declension, example sentences, and usage notes.
        </p>

        {/* Case selector buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {cases.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCase(c)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                selectedCase === c
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-purple-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Active case card */}
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-8 ${getColorClasses(current.color)}`}>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-purple-700 mb-2">{selectedCase}</h3>
            <p className="text-gray-700 text-sm mb-4">{current.usage}</p>

            {/* Article table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Gender</th>
                    <th className="p-2 text-left">Article</th>
                    <th className="p-2">Listen</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "der (masculine)", key: "der" },
                    { label: "die (feminine)", key: "die" },
                    { label: "das (neuter)", key: "das" },
                    { label: "plural", key: "plural" }
                  ].map(g => (
                    <tr key={g.key} className="border-b">
                      <td className="p-2">{g.label}</td>
                      <td className="p-2 font-mono font-bold">{current.articles[g.key]}</td>
                      <td className="p-2 text-center">
                        <PronounceButton word={current.articles[g.key]} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Example sentences (5 examples) */}
            <div className="mb-5">
              <h4 className="text-md font-semibold text-purple-600 mb-2">📖 Example sentences</h4>
              <div className="space-y-2">
                {current.examples.map((ex, idx) => (
                  <div key={idx} className="bg-gray-50 p-2 rounded flex justify-between items-center gap-2">
                    <div>
                      <p className="text-sm font-medium">{ex.german}</p>
                      <p className="text-xs text-gray-500">→ {ex.english}</p>
                    </div>
                    <PronounceButton word={ex.german} />
                  </div>
                ))}
              </div>
            </div>

            {/* Extra note (including two-way prepositions for Acc/Dat) */}
            <div className="p-3 rounded text-sm bg-yellow-50 border border-yellow-200">
              <span className="font-semibold">💡 {selectedCase} tip:</span> {current.extraNote}
            </div>
          </div>
        </div>

        {/* Additional global tip about two-way prepositions */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm">
          <p className="font-semibold">🔁 Two‑way prepositions (an, auf, hinter, in, neben, über, unter, vor, zwischen):</p>
          <p>→ <strong>Accusative</strong> = movement / direction (Wohin?)<br />
             → <strong>Dative</strong> = location / position (Wo?)</p>
        </div>
      </div>
    </div>
  );
};

export default CasesPage;