import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';
import { personalPronouns } from '../data/pronouns';
import { questionWords } from '../data/questionWords';

const PronounsPage = () => {
  const [activeCase, setActiveCase] = useState('nominative');
  const [pronounCase, setPronounCase] = useState('nominative'); // for pronoun table

  // Indefinite article declension (positive and negative)
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

  // Personal pronouns in all four cases
  const personalPronounsAllCases = {
    nominative: [
      { german: "ich", english: "I" },
      { german: "du", english: "you (sing. inf.)" },
      { german: "er", english: "he" },
      { german: "sie", english: "she" },
      { german: "es", english: "it" },
      { german: "wir", english: "we" },
      { german: "ihr", english: "you (pl. inf.)" },
      { german: "sie", english: "they" },
      { german: "Sie", english: "you (formal)" }
    ],
    accusative: [
      { german: "mich", english: "me" },
      { german: "dich", english: "you (sing. inf.)" },
      { german: "ihn", english: "him" },
      { german: "sie", english: "her" },
      { german: "es", english: "it" },
      { german: "uns", english: "us" },
      { german: "euch", english: "you (pl. inf.)" },
      { german: "sie", english: "them" },
      { german: "Sie", english: "you (formal)" }
    ],
    dative: [
      { german: "mir", english: "to me" },
      { german: "dir", english: "to you (sing. inf.)" },
      { german: "ihm", english: "to him" },
      { german: "ihr", english: "to her" },
      { german: "ihm", english: "to it" },
      { german: "uns", english: "to us" },
      { german: "euch", english: "to you (pl. inf.)" },
      { german: "ihnen", english: "to them" },
      { german: "Ihnen", english: "to you (formal)" }
    ],
    genitive: [
      { german: "meiner", english: "of me" },
      { german: "deiner", english: "of you (sing. inf.)" },
      { german: "seiner", english: "of him" },
      { german: "ihrer", english: "of her" },
      { german: "seiner", english: "of it" },
      { german: "unser", english: "of us" },
      { german: "euer", english: "of you (pl. inf.)" },
      { german: "ihrer", english: "of them" },
      { german: "Ihrer", english: "of you (formal)" }
    ]
  };

  // Example sentences for personal pronouns by case
  const pronounExamples = {
    nominative: [
      { german: "Ich bin müde.", english: "I am tired." },
      { german: "Du lernst Deutsch.", english: "You are learning German." },
      { german: "Er spielt Fußball.", english: "He plays soccer." },
      { german: "Sie singt ein Lied.", english: "She sings a song." },
      { german: "Es regnet.", english: "It is raining." },
      { german: "Wir gehen ins Kino.", english: "We are going to the cinema." },
      { german: "Ihr kommt zu spät.", english: "You (pl.) are coming too late." },
      { german: "Sie wohnen in Berlin.", english: "They live in Berlin." }
    ],
    accusative: [
      { german: "Kannst du mich hören?", english: "Can you hear me?" },
      { german: "Ich sehe dich.", english: "I see you." },
      { german: "Sie liebt ihn.", english: "She loves him." },
      { german: "Der Lehrer fragt sie.", english: "The teacher asks her." },
      { german: "Ich habe es gesehen.", english: "I saw it." },
      { german: "Sie besucht uns morgen.", english: "She visits us tomorrow." },
      { german: "Der Lehrer ruft euch.", english: "The teacher calls you (pl.)." },
      { german: "Ich kenne sie.", english: "I know them." }
    ],
    dative: [
      { german: "Kannst du mir helfen?", english: "Can you help me?" },
      { german: "Ich gebe dir ein Buch.", english: "I give you a book." },
      { german: "Er antwortet ihm nicht.", english: "He doesn't answer him." },
      { german: "Ich danke ihr.", english: "I thank her." },
      { german: "Das Kind schadet ihm.", english: "The child hurts it." },
      { german: "Sie erzählt uns eine Geschichte.", english: "She tells us a story." },
      { german: "Ich wünsche euch viel Glück.", english: "I wish you (pl.) good luck." },
      { german: "Der Lehrer hilft ihnen.", english: "The teacher helps them." }
    ],
    genitive: [
      { german: "Sie erinnert sich meiner.", english: "She remembers me." },
      { german: "Wir gedenken deiner.", english: "We remember you." },
      { german: "Ich bedarf seiner Hilfe.", english: "I need his help." },
      { german: "Er erbarmt sich ihrer.", english: "He takes pity on her." },
      { german: "Man wird seiner gewahr.", english: "One becomes aware of it." },
      { german: "Sie bedarf unserer Unterstützung.", english: "She needs our support." },
      { german: "Ich erinnere mich eurer.", english: "I remember you (pl.)." },
      { german: "Der Lehrer gedenkt ihrer.", english: "The teacher remembers them." }
    ]
  };

  const cases = ['nominative', 'accusative', 'dative', 'genitive'];

  // Example sentences with indefinite articles
  const examples = {
    nominative: { german: "Ein Hund bellt.", english: "A dog barks." },
    accusative: { german: "Ich sehe einen Hund.", english: "I see a dog." },
    dative: { german: "Ich gebe einem Hund einen Knochen.", english: "I give a dog a bone." },
    genitive: { german: "Das ist das Haus eines Mannes.", english: "That is a man's house." }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">👤 Pronouns & Articles</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Personal pronouns (all cases), question words, and indefinite articles – the building blocks of every sentence.
        </p>

        {/* Personal Pronouns – All Cases */}
        <div className="bg-white rounded-xl p-5 shadow-md mb-8">
          <h3 className="text-xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span>👤</span> Personal Pronouns – All Cases
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Choose a case to see the correct pronoun forms. Click any speaker to hear pronunciation.
          </p>
          {/* Case selector for pronouns */}
          <div className="flex flex-wrap gap-2 mb-4">
            {cases.map(c => (
              <button
                key={c}
                onClick={() => setPronounCase(c)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition capitalize ${
                  pronounCase === c ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-purple-100'
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
                  <th className="p-2 text-left">Pronoun</th>
                  <th className="p-2 text-left">English</th>
                  <th className="p-2">Listen</th>
                </tr>
              </thead>
              <tbody>
                {personalPronounsAllCases[pronounCase].map((p, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2 font-mono font-bold text-purple-700">{p.german}</td>
                    <td className="p-2 text-gray-600">{p.english}</td>
                    <td className="p-2 text-center"><PronounceButton word={p.german} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Example sentences for the selected case */}
          <div className="mt-4">
            <h4 className="text-md font-semibold text-purple-600 mb-2">📖 Example Sentences ({pronounCase} case)</h4>
            <div className="space-y-2">
              {pronounExamples[pronounCase].map((ex, idx) => (
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
          
          <div className="mt-3 text-xs text-gray-500 bg-yellow-50 p-2 rounded">
            💡 Note: "Sie" (capital S) = formal you, same form in all cases (nominative, accusative, dative, genitive). Genitive pronouns are rarely used in spoken German today.
          </div>
        </div>

       {/* Question Words Section */}
<div className="bg-white rounded-xl p-5 shadow-md mb-8">
  <h3 className="text-xl font-bold text-purple-700 mb-3 flex items-center gap-2">
    <span>❓</span> Fundamental Question Words
  </h3>
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

        {/* Indefinite Articles Section */}
        <div className="bg-white rounded-xl p-5 shadow-md">
          <h3 className="text-xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span>📌</span> Indefinite Articles (ein, eine, keinen, etc.)
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            The indefinite article changes depending on case and gender. "Kein" is used for negation.
          </p>

          {/* Case selector for articles */}
          <div className="flex flex-wrap gap-2 mb-4">
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

          {/* Article tables */}
          <div className="overflow-x-auto mb-4">
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

          {/* Example sentence for the selected case */}
          <div className="bg-purple-50 rounded-xl p-3 flex flex-wrap justify-between items-center gap-2">
            <div>
              <span className="text-xs font-semibold text-purple-700">Example ({activeCase}):</span>
              <p className="text-gray-800 text-sm mt-1">{examples[activeCase].german}</p>
              <p className="text-gray-500 text-xs">→ {examples[activeCase].english}</p>
            </div>
            <PronounceButton word={examples[activeCase].german} />
          </div>

          <div className="mt-4 p-3 bg-green-50 rounded text-sm">
            💡 <strong>Tip:</strong> "Kein" is used to negate indefinite nouns: "Ich habe keinen Hund" (I don't have a dog). For plural, "keine" is used.
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          📖 Master these forms – they appear in almost every German sentence.
        </div>
      </div>
    </div>
  );
};

export default PronounsPage;