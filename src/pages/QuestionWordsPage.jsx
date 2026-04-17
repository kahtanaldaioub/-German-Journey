import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';
import { questionWords } from '../data/questionWords';

const QuestionWordsPage = () => {
  const [welcherCase, setWelcherCase] = useState('nominative');

  const welcherDeclension = {
    nominative: { masc: "welcher", fem: "welche", neut: "welches", pl: "welche" },
    accusative: { masc: "welchen", fem: "welche", neut: "welches", pl: "welche" },
    dative: { masc: "welchem", fem: "welcher", neut: "welchem", pl: "welchen" },
    genitive: { masc: "welches", fem: "welcher", neut: "welches", pl: "welcher" }
  };

  const welcherExamples = {
    nominative: [
      { german: "Welcher Hund bellt?", english: "Which dog is barking?" },
      { german: "Welche Katze schläft?", english: "Which cat is sleeping?" },
      { german: "Welches Buch ist gut?", english: "Which book is good?" }
    ],
    accusative: [
      { german: "Welchen Hund siehst du?", english: "Which dog do you see?" },
      { german: "Welche Tasche kaufst du?", english: "Which bag are you buying?" },
      { german: "Welches Auto fährst du?", english: "Which car are you driving?" }
    ],
    dative: [
      { german: "Welchem Kind hilfst du?", english: "Which child are you helping?" },
      { german: "Welcher Frau gibst du das Buch?", english: "Which woman are you giving the book to?" },
      { german: "Welchem Problem folgst du?", english: "Which problem are you following?" }
    ],
    genitive: [
      { german: "Welches Hauses ist das?", english: "Which house is that?" },
      { german: "Welcher Blume Farbe gefällt dir?", english: "Which flower's color do you like?" }
    ]
  };

  const cases = ['nominative', 'accusative', 'dative', 'genitive'];

  const getDefaultExample = (qw) => {
    const defaults = {
      wer: "Wer ist das?",
      was: "Was ist das?",
      wo: "Wo wohnst du?",
      woher: "Woher kommst du?",
      wohin: "Wohin gehst du?",
      wann: "Wann kommst du?",
      warum: "Warum lernst du?",
      wie: "Wie geht es dir?"
    };
    return defaults[qw] || `Wie verwendet man "${qw}"?`;
  };

  const getDefaultExampleEnglish = (qw) => {
    const defaults = {
      wer: "Who is that?",
      was: "What is that?",
      wo: "Where do you live?",
      woher: "Where do you come from?",
      wohin: "Where are you going?",
      wann: "When are you coming?",
      warum: "Why are you learning?",
      wie: "How are you?"
    };
    return defaults[qw] || `How to use "${qw}"?`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">❓ German Question Words</h2>
          <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
            Essential W‑words and the interrogative "welcher" – with examples and pronunciation.
          </p>

          {/* Standard Question Words */}
          <div className="bg-white rounded-xl p-5 shadow-md mb-8">
            <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Standard Question Words</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questionWords.map((qw, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-bold text-purple-700">{qw.german}</span>
                      <span className="text-gray-500 text-sm ml-2">– {qw.english}</span>
                    </div>
                    <PronounceButton word={qw.german.split('/')[0]} />
                  </div>
                  <div className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">Example:</span>
                    <div className="flex justify-between items-center mt-1">
                      <span className="italic">{qw.example?.german || getDefaultExample(qw.german)}</span>
                      <PronounceButton word={qw.example?.german || getDefaultExample(qw.german)} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">→ {qw.example?.english || getDefaultExampleEnglish(qw.german)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-500 bg-blue-50 p-2 rounded">
              💡 Use these to form open questions. The verb follows immediately.
            </div>
          </div>

          {/* "welcher" Section */}
          <div className="bg-white rounded-xl p-5 shadow-md">
            <h3 className="text-xl font-bold text-purple-700 mb-3 flex items-center gap-2">
              <span>🔍</span> Interrogative Pronoun "welcher" (which)
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              "Welcher" changes according to case and gender. It declines like the definite article "der, die, das".
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {cases.map(c => (
                <button
                  key={c}
                  onClick={() => setWelcherCase(c)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition capitalize ${
                    welcherCase === c ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-purple-100'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Gender</th>
                    <th className="p-2 text-left">welcher (which)</th>
                    <th className="p-2">Listen</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-medium">masculine (der)</td>
                    <td className="p-2 font-mono font-bold text-purple-700">{welcherDeclension[welcherCase].masc}</td>
                    <td className="p-2 text-center"><PronounceButton word={welcherDeclension[welcherCase].masc} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">feminine (die)</td>
                    <td className="p-2 font-mono font-bold text-purple-700">{welcherDeclension[welcherCase].fem}</td>
                    <td className="p-2 text-center"><PronounceButton word={welcherDeclension[welcherCase].fem} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">neuter (das)</td>
                    <td className="p-2 font-mono font-bold text-purple-700">{welcherDeclension[welcherCase].neut}</td>
                    <td className="p-2 text-center"><PronounceButton word={welcherDeclension[welcherCase].neut} /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">plural (die)</td>
                    <td className="p-2 font-mono font-bold text-purple-700">{welcherDeclension[welcherCase].pl}</td>
                    <td className="p-2 text-center"><PronounceButton word={welcherDeclension[welcherCase].pl} /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h4 className="text-md font-semibold text-purple-600 mb-2">📖 Example Sentences ({welcherCase} case)</h4>
              <div className="space-y-2">
                {welcherExamples[welcherCase].map((ex, idx) => (
                  <div key={idx} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                    <div>
                      <p className="text-sm"><strong>{ex.german}</strong></p>
                      <p className="text-xs text-gray-500">→ {ex.english}</p>
                    </div>
                    <PronounceButton word={ex.german} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500 bg-blue-50 p-2 rounded">
              💡 "Welcher" is used when asking about a specific person or thing from a known group.
            </div>
          </div>
        </div>
    </div>
  );
};

export default QuestionWordsPage;