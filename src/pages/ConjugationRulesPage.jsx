import React from 'react';
import PronounceButton from '../components/PronounceButton';

const ConjugationRulesPage = () => {
  const rules = [
    {
      title: "Regular Verbs (Weak Verbs)",
      description: "Most German verbs follow a simple pattern: remove -en or -n, add the endings.",
      pattern: [
        { pronoun: "ich", ending: "-e", example: "spiel-e" },
        { pronoun: "du", ending: "-st", example: "spiel-st" },
        { pronoun: "er/sie/es", ending: "-t", example: "spiel-t" },
        { pronoun: "wir", ending: "-en", example: "spiel-en" },
        { pronoun: "ihr", ending: "-t", example: "spiel-t" },
        { pronoun: "sie/Sie", ending: "-en", example: "spiel-en" }
      ],
      fullExample: { german: "Ich spiele Fußball.", english: "I play soccer." }
    },
    {
      title: "Stem-Changing Verbs (e → i/ie)",
      description: "Verbs like 'helfen' (to help) change e to i in du and er/sie/es forms.",
      pattern: [
        { pronoun: "ich", ending: "-e", example: "helf-e" },
        { pronoun: "du", ending: "-st", example: "hilf-st" },
        { pronoun: "er/sie/es", ending: "-t", example: "hilf-t" },
        { pronoun: "wir", ending: "-en", example: "helf-en" },
        { pronoun: "ihr", ending: "-t", example: "helf-t" },
        { pronoun: "sie/Sie", ending: "-en", example: "helf-en" }
      ],
      fullExample: { german: "Er hilft seiner Mutter.", english: "He helps his mother." }
    },
    {
      title: "Stem-Changing Verbs (a → ä)",
      description: "Verbs like 'fahren' (to drive) change a to ä in du and er/sie/es forms.",
      pattern: [
        { pronoun: "ich", ending: "-e", example: "fahr-e" },
        { pronoun: "du", ending: "-st", example: "fähr-st" },
        { pronoun: "er/sie/es", ending: "-t", example: "fährt" },
        { pronoun: "wir", ending: "-en", example: "fahr-en" },
        { pronoun: "ihr", ending: "-t", example: "fahr-t" },
        { pronoun: "sie/Sie", ending: "-en", example: "fahr-en" }
      ],
      fullExample: { german: "Wir fahren nach Berlin.", english: "We drive to Berlin." }
    },
    {
      title: "Irregular Verbs (Strong Verbs)",
      description: "These verbs change their stem vowel in the past tense, often with no regular pattern. Examples: sein, haben, werden.",
      examples: [
        { german: "sein → ich bin, du bist, er ist, wir sind, ihr seid, sie sind", english: "to be" },
        { german: "haben → ich habe, du hast, er hat, wir haben, ihr habt, sie haben", english: "to have" },
        { german: "werden → ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden", english: "to become" }
      ]
    },
    {
      title: "Modal Verbs",
      description: "Modal verbs (können, müssen, wollen, sollen, dürfen, mögen) change the stem vowel in singular forms.",
      pattern: [
        { pronoun: "ich", ending: "-ø", example: "kann" },
        { pronoun: "du", ending: "-st", example: "kannst" },
        { pronoun: "er/sie/es", ending: "-ø", example: "kann" },
        { pronoun: "wir", ending: "-en", example: "können" },
        { pronoun: "ihr", ending: "-t", example: "könnt" },
        { pronoun: "sie/Sie", ending: "-en", example: "können" }
      ],
      fullExample: { german: "Ich kann Deutsch sprechen.", english: "I can speak German." }
    },
    {
      title: "Separable Verbs",
      description: "Prefix separates and goes to the end of the clause in main clauses.",
      pattern: "aufstehen → ich stehe auf, du stehst auf, er steht auf, etc.",
      examples: [
        { german: "aufstehen (to get up) → Ich stehe um 7 Uhr auf.", english: "I get up at 7." },
        { german: "anrufen (to call) → Er ruft seine Mutter an.", english: "He calls his mother." },
        { german: "einkaufen (to shop) → Wir kaufen heute ein.", english: "We shop today." }
      ]
    },
    {
      title: "Auxiliary Verbs (sein, haben, werden)",
      description: "Used to form perfect tenses, passive voice, and future tense.",
      examples: [
        { german: "sein (to be) → Ich bin gegangen.", english: "I have gone." },
        { german: "haben (to have) → Ich habe gegessen.", english: "I have eaten." },
        { german: "werden (to become) → Ich werde lernen.", english: "I will learn." }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">

        <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">📖 German Conjugation Rules</h2>
          <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
            Master how German verbs change their endings – with examples and audio.
          </p>

          <div className="space-y-8">
            {rules.map((rule, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 shadow-md border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-700 mb-2">{rule.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{rule.description}</p>

                {/* Pattern table if present */}
                {rule.pattern && (
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 text-left">Pronoun</th>
                          <th className="p-2 text-left">Ending</th>
                          <th className="p-2 text-left">Example</th>
                          <th className="p-2">Listen</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rule.pattern.map((item, i) => (
                          <tr key={i} className="border-b">
                            <td className="p-2 font-medium">{item.pronoun}</td>
                            <td className="p-2">{item.ending}</td>
                            <td className="p-2 font-mono">{item.example}</td>
                            <td className="p-2 text-center">
                              <PronounceButton word={item.example.split('-')[0] || item.example} />
                            </td>
                           </tr>
                        ))}
                      </tbody>
                     </table>
                  </div>
                )}

                {/* Full example if present */}
                {rule.fullExample && (
                  <div className="bg-purple-50 p-3 rounded-lg flex justify-between items-center mt-3">
                    <div>
                      <span className="text-sm font-semibold">Example:</span>
                      <p className="italic">{rule.fullExample.german}</p>
                      <p className="text-xs text-gray-500">{rule.fullExample.english}</p>
                    </div>
                    <PronounceButton word={rule.fullExample.german} />
                  </div>
                )}

                {/* List of examples (for irregulars, separable, auxiliaries) */}
                {rule.examples && (
                  <div className="space-y-2 mt-3">
                    {rule.examples.map((ex, i) => (
                      <div key={i} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                        <div>
                          <span className="text-sm">{ex.german}</span>
                          <span className="text-xs text-gray-500 ml-2">– {ex.english}</span>
                        </div>
                        <PronounceButton word={ex.german.split(' → ')[1] || ex.german} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 p-4 bg-yellow-50 rounded-xl text-center text-sm">
            💡 <strong>Tip:</strong> Practice conjugating verbs out loud. The more you use them, the faster they become automatic.
          </div>
        </div>

    </div>
  );
};

export default ConjugationRulesPage;