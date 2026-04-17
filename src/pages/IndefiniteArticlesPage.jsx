import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const IndefiniteArticlesPage = () => {
  const [activeCase, setActiveCase] = useState('nominative');

  const indefiniteArticles = {
    nominative: { masc: "ein", fem: "eine", neut: "ein", pl: "-" },
    accusative: { masc: "einen", fem: "eine", neut: "ein", pl: "-" },
    dative: { masc: "einem", fem: "einer", neut: "einem", pl: "-" },
    genitive: { masc: "eines", fem: "einer", neut: "eines", pl: "-" }
  };

  const negativeArticles = {
    nominative: { masc: "kein", fem: "keine", neut: "kein", pl: "keine" },
    accusative: { masc: "keinen", fem: "keine", neut: "kein", pl: "keine" },
    dative: { masc: "keinem", fem: "keiner", neut: "keinem", pl: "keinen" },
    genitive: { masc: "keines", fem: "keiner", neut: "keines", pl: "keiner" }
  };

  const positiveExamples = {
    nominative: [
      { german: "Ein Hund bellt.", english: "A dog barks." },
      { german: "Eine Katze schläft.", english: "A cat sleeps." }
    ],
    accusative: [
      { german: "Ich sehe einen Hund.", english: "I see a dog." },
      { german: "Sie kauft eine Tasche.", english: "She buys a bag." }
    ],
    dative: [
      { german: "Ich helfe einem Kind.", english: "I help a child." },
      { german: "Er gibt einer Frau die Hand.", english: "He gives a woman his hand." }
    ],
    genitive: [
      { german: "Das Haus eines Mannes ist groß.", english: "A man's house is big." },
      { german: "Die Farbe einer Blume ist rot.", english: "The color of a flower is red." }
    ]
  };

  const negativeExamples = {
    nominative: [
      { german: "Kein Hund bellt.", english: "No dog barks." },
      { german: "Keine Katze schläft.", english: "No cat sleeps." }
    ],
    accusative: [
      { german: "Ich sehe keinen Hund.", english: "I don't see a dog." },
      { german: "Sie kauft keine Tasche.", english: "She doesn't buy a bag." }
    ],
    dative: [
      { german: "Ich helfe keinem Kind.", english: "I don't help any child." },
      { german: "Er gibt keiner Frau die Hand.", english: "He doesn't give any woman his hand." }
    ],
    genitive: [
      { german: "Das Haus keines Mannes ist groß.", english: "No man's house is big." },
      { german: "Die Farbe keiner Blume ist rot.", english: "The color of no flower is red." }
    ]
  };

  const cases = ['nominative', 'accusative', 'dative', 'genitive'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">📌 Indefinite Articles</h2>
          <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
            "ein, eine, einen, einem, eines" and the negative "kein" – full declension with examples.
          </p>

          <div className="bg-white rounded-xl p-5 shadow-md">
            <p className="text-sm text-gray-600 mb-3">Choose a case to see the correct article forms:</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {cases.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveCase(c)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition capitalize ${
                    activeCase === c ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-purple-100'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="p-2 text-left">Gender</th>
                    <th className="p-2 text-left">Positive</th>
                    <th className="p-2 text-left">Negative (kein-)</th>
                    <th className="p-2">Listen</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "masculine (der)", key: "masc" },
                    { label: "feminine (die)", key: "fem" },
                    { label: "neuter (das)", key: "neut" },
                    { label: "plural (die)", key: "pl" }
                  ].map(g => (
                    <tr key={g.key} className="border-b">
                      <td className="p-2 font-medium">{g.label}</td>
                      <td className="p-2 font-mono">
                        {indefiniteArticles[activeCase][g.key] !== '-' ? indefiniteArticles[activeCase][g.key] : '—'}
                      </td>
                      <td className="p-2 font-mono">
                        {negativeArticles[activeCase][g.key] !== '-' ? negativeArticles[activeCase][g.key] : '—'}
                      </td>
                      <td className="p-2 text-center">
                        {indefiniteArticles[activeCase][g.key] !== '-' && (
                          <PronounceButton word={indefiniteArticles[activeCase][g.key]} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-green-700">✅ Positive examples ({activeCase})</p>
                <div className="mt-2 space-y-2">
                  {positiveExamples[activeCase].map((ex, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm italic">{ex.german}</span>
                      <PronounceButton word={ex.german} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-red-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-red-700">❌ Negative examples (kein)</p>
                <div className="mt-2 space-y-2">
                  {negativeExamples[activeCase].map((ex, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm italic">{ex.german}</span>
                      <PronounceButton word={ex.german} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-50 rounded text-sm">
              💡 <strong>Tip:</strong> "Kein" is used to negate indefinite nouns: "Ich habe keinen Hund" (I don't have a dog). For plural, "keine" is used.
            </div>
          </div>
        </div>
    </div>
  );
};

export default IndefiniteArticlesPage;