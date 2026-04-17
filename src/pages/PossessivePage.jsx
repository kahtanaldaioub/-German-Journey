import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const PossessivePage = () => {
  const [activeCase, setActiveCase] = useState('nominative');

  // Base possessive stems
  const stems = [
    { pronoun: "ich", possessive: "mein", english: "my" },
    { pronoun: "du", possessive: "dein", english: "your (inf. sing.)" },
    { pronoun: "er", possessive: "sein", english: "his" },
    { pronoun: "sie", possessive: "ihr", english: "her" },
    { pronoun: "es", possessive: "sein", english: "its" },
    { pronoun: "wir", possessive: "unser", english: "our" },
    { pronoun: "ihr", possessive: "euer", english: "your (inf. pl.)" },
    { pronoun: "sie", possessive: "ihr", english: "their" },
    { pronoun: "Sie", possessive: "Ihr", english: "your (formal)" }
  ];

  // Endings for possessive ARTICLES (like "ein")
  const articleEndings = {
    nominative: { masc: "", fem: "e", neut: "", pl: "e" },
    accusative: { masc: "en", fem: "e", neut: "", pl: "e" },
    dative: { masc: "em", fem: "er", neut: "em", pl: "en" },
    genitive: { masc: "es", fem: "er", neut: "es", pl: "er" }
  };

  // Endings for standalone possessive PRONOUNS (like "der")
  const pronounEndings = {
    nominative: { masc: "er", fem: "e", neut: "es", pl: "e" },
    accusative: { masc: "en", fem: "e", neut: "es", pl: "e" },
    dative: { masc: "em", fem: "er", neut: "em", pl: "en" },
    genitive: { masc: "es", fem: "er", neut: "es", pl: "er" }
  };

  const getArticleForm = (stem, gender, caseName) => {
    let base = stem;
    if (stem === "euer") base = "eur";
    let ending = articleEndings[caseName]?.[gender] || "";
    if (caseName === "nominative" && gender === "masc" && stem === "mein") return "mein";
    if (caseName === "nominative" && gender === "neut" && stem === "mein") return "mein";
    return base + ending;
  };

  const getPronounForm = (stem, gender, caseName) => {
    let base = stem;
    if (stem === "euer") base = "eur";
    let ending = pronounEndings[caseName]?.[gender] || "";
    return base + ending;
  };

  const cases = ['nominative', 'accusative', 'dative', 'genitive'];

  // Expanded examples for possessive ARTICLES (attributive)
  const articleExamples = {
    nominative: [
      { german: "Das ist mein Hund.", english: "That is my dog." },
      { german: "Deine Katze ist süß.", english: "Your cat is cute." },
      { german: "Sein Auto ist neu.", english: "His car is new." },
      { german: "Ihre Blume ist rot.", english: "Her flower is red." },
      { german: "Unser Haus ist groß.", english: "Our house is big." },
      { german: "Euer Kind spielt.", english: "Your child is playing." }
    ],
    accusative: [
      { german: "Ich sehe meinen Freund.", english: "I see my friend." },
      { german: "Sie liebt ihren Mann.", english: "She loves her husband." },
      { german: "Wir kaufen unser Haus.", english: "We buy our house." },
      { german: "Er hat seinen Schlüssel verloren.", english: "He lost his key." },
      { german: "Kannst du deine Tasche finden?", english: "Can you find your bag?" },
      { german: "Sie sucht ihre Brille.", english: "She is looking for her glasses." }
    ],
    dative: [
      { german: "Ich helfe meinem Bruder.", english: "I help my brother." },
      { german: "Er gibt seiner Schwester ein Geschenk.", english: "He gives his sister a gift." },
      { german: "Wir folgen unserem Lehrer.", english: "We follow our teacher." },
      { german: "Sie dankt ihrer Mutter.", english: "She thanks her mother." },
      { german: "Kannst du deinem Vater helfen?", english: "Can you help your father?" },
      { german: "Das Kind antwortet seinem Freund.", english: "The child answers his friend." }
    ],
    genitive: [
      { german: "Das ist das Haus meines Vaters.", english: "That is my father's house." },
      { german: "Die Farbe ihrer Tasche ist schön.", english: "The color of her bag is beautiful." },
      { german: "Das Ende unseres Urlaubs war schön.", english: "The end of our vacation was nice." },
      { german: "Der Name seines Hundes ist Bello.", english: "The name of his dog is Bello." },
      { german: "Die Idee deiner Freundin ist gut.", english: "Your friend's idea is good." },
      { german: "Der Klang ihrer Stimme ist angenehm.", english: "The sound of her voice is pleasant." }
    ]
  };

  // Expanded examples for possessive PRONOUNS (standalone)
  const pronounExamples = {
    nominative: [
      { german: "Das ist meiner.", english: "That is mine." },
      { german: "Deiner ist größer.", english: "Yours is bigger." },
      { german: "Seiner liegt dort.", english: "His is over there." },
      { german: "Ihre ist neu.", english: "Hers is new." },
      { german: "Unseres ist kaputt.", english: "Ours is broken." },
      { german: "Eures ist besser.", english: "Yours (pl.) is better." }
    ],
    accusative: [
      { german: "Ich sehe meinen.", english: "I see mine." },
      { german: "Kannst du deinen finden?", english: "Can you find yours?" },
      { german: "Sie liebt ihren.", english: "She loves hers." },
      { german: "Wir kaufen unseren.", english: "We buy ours." },
      { german: "Er hat seinen verloren.", english: "He lost his." },
      { german: "Ich nehme euren.", english: "I'll take yours (pl.)." }
    ],
    dative: [
      { german: "Ich helfe meinem.", english: "I help mine." },
      { german: "Er gibt seinem.", english: "He gives to his." },
      { german: "Wir folgen unserem.", english: "We follow ours." },
      { german: "Sie dankt ihrem.", english: "She thanks hers." },
      { german: "Kannst du deinem helfen?", english: "Can you help yours?" },
      { german: "Das Kind antwortet seinem.", english: "The child answers his." }
    ],
    genitive: [
      { german: "Das ist das Haus meines.", english: "That is my house." },
      { german: "Die Farbe deines ist schön.", english: "The color of yours is beautiful." },
      { german: "Der Name seines ist Bello.", english: "The name of his is Bello." },
      { german: "Das Ende unseres war schön.", english: "The end of ours was nice." },
      { german: "Die Idee ihres ist gut.", english: "Her idea is good." },
      { german: "Der Klang ihres ist angenehm.", english: "The sound of hers is pleasant." }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">📘 Possessive Articles & Pronouns</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Learn how to say "my", "your", "his", "her", etc. – and when to use "mein" vs. "meiner".
        </p>

        {/* Explanation box */}
        <div className="bg-yellow-50 rounded-xl p-4 mb-6">
          <p className="text-sm font-semibold">🔍 Two different forms:</p>
          <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
            <li><strong>Possessive article</strong> (before a noun): <em>mein Hund</em> – my dog</li>
            <li><strong>Possessive pronoun</strong> (stands alone): <em>Das ist meiner</em> – That's mine</li>
            <li>They take different endings: articles follow "ein", pronouns follow "der".</li>
          </ul>
        </div>

        {/* Stems table (same for both) */}
        <h3 className="text-xl font-bold text-purple-700 mt-6 mb-3">1. Possessive Stems (by person)</h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse bg-white rounded-xl">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Person</th>
                <th className="p-2 text-left">Stem</th>
                <th className="p-2 text-left">English</th>
                <th className="p-2">Listen</th>
               </tr>
            </thead>
            <tbody>
              {stems.map(s => (
                <tr key={s.pronoun} className="border-b">
                  <td className="p-2 font-medium">{s.pronoun}</td>
                  <td className="p-2 font-mono">{s.possessive}</td>
                  <td className="p-2 text-gray-600">{s.english}</td>
                  <td className="p-2 text-center"><PronounceButton word={s.possessive} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Case selector */}
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

        {/* Two tables side by side */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Possessive Articles */}
          <div className="bg-white rounded-xl p-4 shadow border-t-4 border-blue-500">
            <h3 className="text-lg font-bold text-blue-700 mb-2">📌 Possessive Articles<br/><span className="text-xs font-normal">(before a noun, like "mein Hund")</span></h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-blue-50"><th>Gender</th><th>Ending</th><th>Example (mein-)</th><th>Listen</th></tr></thead>
                <tbody>
                  {[
                    { label: "masculine (der)", key: "masc", ex: getArticleForm("mein", "masc", activeCase) },
                    { label: "feminine (die)", key: "fem", ex: getArticleForm("mein", "fem", activeCase) },
                    { label: "neuter (das)", key: "neut", ex: getArticleForm("mein", "neut", activeCase) },
                    { label: "plural", key: "pl", ex: getArticleForm("mein", "pl", activeCase) }
                  ].map(g => (
                    <tr key={g.key} className="border-b">
                      <td className="p-1">{g.label}</td>
                      <td className="p-1 font-mono">{articleEndings[activeCase][g.key] || "—"}</td>
                      <td className="p-1 font-mono">{g.ex}</td>
                      <td className="p-1 text-center"><PronounceButton word={g.ex} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 bg-blue-50 p-2 rounded text-xs">
              <p className="font-semibold">📖 Example Sentences ({activeCase} case):</p>
              <div className="space-y-1 mt-1">
                {articleExamples[activeCase].map((ex, idx) => (
                  <div key={idx} className="flex justify-between items-center gap-2">
                    <span><em>{ex.german}</em> – {ex.english}</span>
                    <PronounceButton word={ex.german} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Possessive Pronouns */}
          <div className="bg-white rounded-xl p-4 shadow border-t-4 border-green-500">
            <h3 className="text-lg font-bold text-green-700 mb-2">🔹 Possessive Pronouns<br/><span className="text-xs font-normal">(stand alone, like "Das ist meiner")</span></h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-green-50"><th>Gender</th><th>Ending</th><th>Example (mein-)</th><th>Listen</th></tr></thead>
                <tbody>
                  {[
                    { label: "masculine (der)", key: "masc", ex: getPronounForm("mein", "masc", activeCase) },
                    { label: "feminine (die)", key: "fem", ex: getPronounForm("mein", "fem", activeCase) },
                    { label: "neuter (das)", key: "neut", ex: getPronounForm("mein", "neut", activeCase) },
                    { label: "plural", key: "pl", ex: getPronounForm("mein", "pl", activeCase) }
                  ].map(g => (
                    <tr key={g.key} className="border-b">
                      <td className="p-1">{g.label}</td>
                      <td className="p-1 font-mono">{pronounEndings[activeCase][g.key] || "—"}</td>
                      <td className="p-1 font-mono">{g.ex}</td>
                      <td className="p-1 text-center"><PronounceButton word={g.ex} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 bg-green-50 p-2 rounded text-xs">
              <p className="font-semibold">📖 Example Sentences ({activeCase} case):</p>
              <div className="space-y-1 mt-1">
                {pronounExamples[activeCase].map((ex, idx) => (
                  <div key={idx} className="flex justify-between items-center gap-2">
                    <span><em>{ex.german}</em> – {ex.english}</span>
                    <PronounceButton word={ex.german} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-xl text-sm">
          💡 <strong>Remember:</strong> 
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li><strong>Possessive articles</strong> end like "ein" – so nominative masculine/neuter have <strong>no ending</strong> (mein, dein, etc.)</li>
            <li><strong>Possessive pronouns</strong> end like "der" – so nominative masculine ends with <strong>-er</strong> (meiner, deiner, etc.)</li>
            <li>For "euer", drop the 'e' before adding endings: euer → eur- (e.g., eure, euren).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PossessivePage;