import React from 'react';
import PronounceButton from '../components/PronounceButton';

const ConjugationRulesPage = () => {
  const rules = [
    {
      title: "Regular Verbs (Weak Verbs)",
      description: "Most German verbs follow a simple pattern: remove -en or -n, add the endings.",
      pattern: [
        { pronoun: "ich", ending: "-e", conjugated: "spiele" },
        { pronoun: "du", ending: "-st", conjugated: "spielst" },
        { pronoun: "er/sie/es", ending: "-t", conjugated: "spielt" },
        { pronoun: "wir", ending: "-en", conjugated: "spielen" },
        { pronoun: "ihr", ending: "-t", conjugated: "spielt" },
        { pronoun: "sie/Sie", ending: "-en", conjugated: "spielen" }
      ],
      fullExample: { german: "Ich spiele Fußball.", english: "I play soccer." }
    },
    {
      title: "Special Endings (Verbs ending with -t, -d, -eln, -ern, -s, -ss, -ß, -z, -tz)",
      description: "For verbs whose stem ends in -t or -d, we add an extra 'e' before the endings -st and -t. For -eln and -ern, the endings are also adjusted. Verbs ending in -s, -ss, -ß, -z, -tz work with regular endings (no extra 'e').",
      pattern: [
        { pronoun: "ich", ending: "-e", conjugated: "arbeite" },
        { pronoun: "du", ending: "-est", conjugated: "arbeitest" },
        { pronoun: "er/sie/es", ending: "-et", conjugated: "arbeitet" },
        { pronoun: "wir", ending: "-en", conjugated: "arbeiten" },
        { pronoun: "ihr", ending: "-et", conjugated: "arbeitet" },
        { pronoun: "sie/Sie", ending: "-en", conjugated: "arbeiten" }
      ],
      examples: [
        { german: "arbeiten → du arbeitest, er arbeitet", english: "work" },
        { german: "finden → du findest, er findet", english: "find" },
        { german: "lächeln → du lächelst, er lächelt", english: "smile" },
        { german: "wandern → du wanderst, er wandert", english: "hike" },
        { german: "reisen → du reist, er reist (no extra e)", english: "travel" },
        { german: "heißen → du heißt, er heißt (no extra e)", english: "be called" },
        { german: "sitzen → du sitzt, er sitzt (no extra e)", english: "sit" }
      ],
      fullExample: { german: "Du arbeitest jeden Tag.", english: "You work every day." }
    },
    {
      title: "Stem-Changing Verbs (e → i/ie)",
      description: "Verbs like 'helfen' change e to i in du and er/sie/es forms.",
      pattern: [
        { pronoun: "ich", ending: "-e", conjugated: "helfe" },
        { pronoun: "du", ending: "-st", conjugated: "hilfst" },
        { pronoun: "er/sie/es", ending: "-t", conjugated: "hilft" },
        { pronoun: "wir", ending: "-en", conjugated: "helfen" },
        { pronoun: "ihr", ending: "-t", conjugated: "helft" },
        { pronoun: "sie/Sie", ending: "-en", conjugated: "helfen" }
      ],
      fullExample: { german: "Er hilft seiner Mutter.", english: "He helps his mother." }
    },
    {
      title: "Stem-Changing Verbs (a → ä)",
      description: "Verbs like 'fahren' change a to ä in du and er/sie/es forms.",
      pattern: [
        { pronoun: "ich", ending: "-e", conjugated: "fahre" },
        { pronoun: "du", ending: "-st", conjugated: "fährst" },
        { pronoun: "er/sie/es", ending: "-t", conjugated: "fährt" },
        { pronoun: "wir", ending: "-en", conjugated: "fahren" },
        { pronoun: "ihr", ending: "-t", conjugated: "fahrt" },
        { pronoun: "sie/Sie", ending: "-en", conjugated: "fahren" }
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
        { pronoun: "ich", ending: "-ø", conjugated: "kann" },
        { pronoun: "du", ending: "-st", conjugated: "kannst" },
        { pronoun: "er/sie/es", ending: "-ø", conjugated: "kann" },
        { pronoun: "wir", ending: "-en", conjugated: "können" },
        { pronoun: "ihr", ending: "-t", conjugated: "könnt" },
        { pronoun: "sie/Sie", ending: "-en", conjugated: "können" }
      ],
      fullExample: { german: "Ich kann Deutsch sprechen.", english: "I can speak German." }
    },
    {
      title: "Separable Verbs",
      description: "Prefix separates and goes to the end of the clause in main clauses.",
      examples: [
        { german: "aufstehen → Ich stehe um 7 Uhr auf.", english: "I get up at 7." },
        { german: "anrufen → Er ruft seine Mutter an.", english: "He calls his mother." },
        { german: "einkaufen → Wir kaufen heute ein.", english: "We shop today." }
      ]
    },
    {
      title: "Auxiliary Verbs (sein, haben, werden)",
      description: "Used to form perfect tenses, passive voice, and future tense.",
      examples: [
        { german: "sein → Ich bin gegangen.", english: "I have gone." },
        { german: "haben → Ich habe gegessen.", english: "I have eaten." },
        { german: "werden → Ich werde lernen.", english: "I will learn." }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 md:py-12">
      <div className="bg-white/70 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2">📖 German Conjugation Rules</h2>
        <p className="text-center text-gray-600 mb-6 md:mb-8 text-xs sm:text-sm md:text-base">
          Master how German verbs change their endings – with examples and audio.
        </p>

        <div className="space-y-6 md:space-y-8">
          {rules.map((rule, idx) => (
            <div key={idx} className="bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-md border-l-4 border-purple-500">
              <h3 className="text-lg sm:text-xl font-bold text-purple-700 mb-1 sm:mb-2">{rule.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">{rule.description}</p>

              {/* Pattern table */}
              {Array.isArray(rule.pattern) && rule.pattern.length > 0 && (
                <div className="overflow-x-auto -mx-1 sm:mx-0 mb-3 sm:mb-4">
                  <table className="min-w-full text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-1 sm:p-2 text-left">Pronoun</th>
                        <th className="p-1 sm:p-2 text-left">Ending</th>
                        <th className="p-1 sm:p-2 text-left">Conjugated</th>
                        <th className="p-1 sm:p-2">Listen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rule.pattern.map((item, i) => (
                        <tr key={i} className="border-b">
                          <td className="p-1 sm:p-2 font-medium whitespace-nowrap">{item.pronoun}</td>
                          <td className="p-1 sm:p-2 whitespace-nowrap">{item.ending}</td>
                          <td className="p-1 sm:p-2 font-mono whitespace-nowrap">{item.conjugated}</td>
                          <td className="p-1 sm:p-2 text-center">
                            <PronounceButton word={item.conjugated} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Full example sentence */}
              {rule.fullExample && (
                <div className="bg-purple-50 p-2 sm:p-3 rounded-lg flex flex-wrap justify-between items-center gap-2 mt-2 sm:mt-3">
                  <div className="flex-1">
                    <span className="text-xs sm:text-sm font-semibold">Example:</span>
                    <p className="italic text-sm sm:text-base">{rule.fullExample.german}</p>
                    <p className="text-xs text-gray-500">{rule.fullExample.english}</p>
                  </div>
                  <PronounceButton word={rule.fullExample.german} />
                </div>
              )}

              {/* List of additional examples */}
              {rule.examples && Array.isArray(rule.examples) && (
                <div className="space-y-1 sm:space-y-2 mt-2 sm:mt-3">
                  {rule.examples.map((ex, i) => (
                    <div key={i} className="bg-gray-50 p-1 sm:p-2 rounded flex flex-wrap justify-between items-center gap-1">
                      <div className="flex-1">
                        <span className="text-xs sm:text-sm">{ex.german}</span>
                        <span className="text-xs text-gray-500 ml-1 sm:ml-2">– {ex.english}</span>
                      </div>
                      <PronounceButton word={ex.german.split(' → ')[1] || ex.german} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-10 p-3 sm:p-4 bg-yellow-50 rounded-xl text-center text-xs sm:text-sm">
          💡 <strong>Tip:</strong> Practice conjugating verbs out loud. The more you use them, the faster they become automatic.
        </div>
      </div>
    </div>
  );
};

export default ConjugationRulesPage;