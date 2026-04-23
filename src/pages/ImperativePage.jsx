import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const ImperativePage = () => {
  const [quizSentence, setQuizSentence] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  // Regular verb examples for each form (with English translation)
  const regularExamples = {
    du: { rule: "stem + (e) (optional 'e' is common)", example: "Spiele Fußball!", translation: "Play soccer!" },
    ihr: { rule: "stem + t", example: "Spielt Fußball!", translation: "Play soccer!" },
    Sie: { rule: "infinitive + Sie", example: "Spielen Sie Fußball!", translation: "Play soccer!" },
    wir: { rule: "infinitive + wir", example: "Spielen wir Fußball!", translation: "Let's play soccer!" }
  };

  // Stem-changing verbs (e→i/ie) drop the 'e' and change vowel
  const stemChangingExamples = {
    du: { rule: "stem vowel change (e→i/ie) + (e)", example: "Hilf mir!", translation: "Help me!" },
    ihr: { rule: "stem + t (no vowel change)", example: "Helft mir!", translation: "Help me!" },
    Sie: { rule: "infinitive + Sie", example: "Helfen Sie mir!", translation: "Help me!" },
    wir: { rule: "infinitive + wir", example: "Helfen wir ihm!", translation: "Let's help him!" }
  };

  // Irregular verbs: sein, haben, werden (with full imperative sentences)
  const irregulars = [
    { 
      verb: "sein (to be)", 
      du: "sei", 
      ihr: "seid", 
      Sie: "seien Sie", 
      wir: "seien wir",
      duFull: "Sei ruhig!", 
      ihrFull: "Seid ruhig!", 
      SieFull: "Seien Sie ruhig!", 
      wirFull: "Seien wir ruhig!",
      translation: "Be quiet!" 
    },
    { 
      verb: "haben (to have)", 
      du: "hab", 
      ihr: "habt", 
      Sie: "haben Sie", 
      wir: "haben wir",
      duFull: "Hab Geduld!", 
      ihrFull: "Habt Geduld!", 
      SieFull: "Haben Sie Geduld!", 
      wirFull: "Haben wir Geduld!",
      translation: "Have patience!" 
    },
    { 
      verb: "werden (to become)", 
      du: "werd", 
      ihr: "werdet", 
      Sie: "werden Sie", 
      wir: "werden wir",
      duFull: "Werd nicht böse!", 
      ihrFull: "Werdet nicht böse!", 
      SieFull: "Werden Sie nicht böse!", 
      wirFull: "Werden wir nicht böse!",
      translation: "Don't get angry!" 
    }
  ];

  // Verbs ending with -eln, -ern (with full imperative sentences)
  const specialExamples = [
    { 
      verb: "lächeln (to smile)", 
      du: "lächle", 
      ihr: "lächelt", 
      Sie: "lächeln Sie", 
      wir: "lächeln wir",
      duFull: "Lächle!", 
      ihrFull: "Lächelt!", 
      SieFull: "Lächeln Sie!", 
      wirFull: "Lächeln wir!",
      translation: "Smile!" 
    },
    { 
      verb: "wandern (to hike)", 
      du: "wandere", 
      ihr: "wandert", 
      Sie: "wandern Sie", 
      wir: "wandern wir",
      duFull: "Wandere!", 
      ihrFull: "Wandert!", 
      SieFull: "Wandern Sie!", 
      wirFull: "Wandern wir!",
      translation: "Hike!" 
    }
  ];

  // Quiz data (random sentence to convert to imperative) with English meanings
  const quizBank = [
    { statement: "Du spielst Fußball.", statementEn: "You play soccer.", imperative: "Spiel(e) Fußball!", imperativeEn: "Play soccer!", target: "du" },
    { statement: "Ihr macht die Hausaufgaben.", statementEn: "You (pl.) do the homework.", imperative: "Macht die Hausaufgaben!", imperativeEn: "Do the homework!", target: "ihr" },
    { statement: "Sie lesen das Buch.", statementEn: "You (formal) read the book.", imperative: "Lesen Sie das Buch!", imperativeEn: "Read the book!", target: "Sie" },
    { statement: "Wir gehen ins Kino.", statementEn: "We go to the cinema.", imperative: "Gehen wir ins Kino!", imperativeEn: "Let's go to the cinema!", target: "wir" },
    { statement: "Du hilfst deiner Mutter.", statementEn: "You help your mother.", imperative: "Hilf deiner Mutter!", imperativeEn: "Help your mother!", target: "du" },
    { statement: "Ihr kommt pünktlich.", statementEn: "You (pl.) come on time.", imperative: "Kommt pünktlich!", imperativeEn: "Come on time!", target: "ihr" },
    { statement: "Sie öffnen das Fenster.", statementEn: "You (formal) open the window.", imperative: "Öffnen Sie das Fenster!", imperativeEn: "Open the window!", target: "Sie" },
    { statement: "Du nimmst das Buch.", statementEn: "You take the book.", imperative: "Nimm das Buch!", imperativeEn: "Take the book!", target: "du" },
    { statement: "Ihr sprecht Deutsch.", statementEn: "You (pl.) speak German.", imperative: "Sprecht Deutsch!", imperativeEn: "Speak German!", target: "ihr" },
    { statement: "Sie essen den Kuchen.", statementEn: "You (formal) eat the cake.", imperative: "Essen Sie den Kuchen!", imperativeEn: "Eat the cake!", target: "Sie" }
  ];

  const generateQuiz = () => {
    const random = quizBank[Math.floor(Math.random() * quizBank.length)];
    setQuizSentence(random);
    setUserAnswer('');
    setQuizFeedback('');
  };

  const checkQuiz = () => {
    if (!quizSentence) return;
    const normalizedUser = userAnswer.trim().toLowerCase().replace(/[^a-zäöüß]/g, '');
    const normalizedCorrect = quizSentence.imperative.toLowerCase().replace(/[^a-zäöüß]/g, '');
    if (normalizedUser === normalizedCorrect) {
      setQuizFeedback('✅ Correct! Well done.');
    } else {
      setQuizFeedback(`❌ Correct answer: ${quizSentence.imperative} – ${quizSentence.imperativeEn}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">📢 Imperative – Command Form</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Learn how to give orders, make requests, or offer suggestions in German.
        </p>

        {/* Overview */}
        <div className="bg-yellow-50 rounded-xl p-4 mb-6">
          <p className="font-semibold">🔹 When to use the imperative?</p>
          <ul className="list-disc list-inside text-sm mt-1 space-y-1">
            <li>Giving direct commands: <em>Komm her!</em> (Come here!)</li>
            <li>Making polite requests: <em>Kommen Sie bitte!</em> (Please come!)</li>
            <li>Suggestions (wir form): <em>Gehen wir!</em> (Let's go!)</li>
            <li>Instructions / recipes: <em>Schneiden Sie die Zwiebel.</em> (Cut the onion.)</li>
          </ul>
        </div>

        {/* Regular Verbs */}
        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">1️⃣ Regular Verbs</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(regularExamples).map(([form, data]) => (
              <div key={form} className="bg-gray-50 p-3 rounded">
                <p className="font-bold text-purple-600">For <strong>{form}</strong>:</p>
                <p className="text-sm italic">{data.rule}</p>
                <p className="mt-1 font-mono">{data.example}</p>
                <p className="text-xs text-gray-500">→ {data.translation}</p>
                <PronounceButton word={data.example} />
              </div>
            ))}
          </div>
          <div className="mt-3 text-sm bg-blue-50 p-2 rounded">
            💡 In spoken German, the du‑form often drops the final -e: <em>Mach das!</em> instead of <em>Mache das!</em> (Do that!)
          </div>
        </div>

        {/* Stem-Changing Verbs (e→i/ie) */}
        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">2️⃣ Stem‑Changing Verbs (e→i/ie)</h3>
          <p className="text-sm mb-2">Verbs like <strong>helfen, nehmen, sprechen, lesen</strong> change the vowel in the du‑form, but not in ihr/Sie/wir.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(stemChangingExamples).map(([form, data]) => (
              <div key={form} className="bg-gray-50 p-3 rounded">
                <p className="font-bold text-purple-600">For <strong>{form}</strong>:</p>
                <p className="text-sm italic">{data.rule}</p>
                <p className="mt-1 font-mono">{data.example}</p>
                <p className="text-xs text-gray-500">→ {data.translation}</p>
                <PronounceButton word={data.example} />
              </div>
            ))}
          </div>
        </div>

        {/* Verbs ending with -eln, -ern */}
        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">3️⃣ Verbs ending with -eln / -ern</h3>
          <p className="text-sm text-gray-600 mb-4">These verbs drop the final 'e' of the stem in the du form (optional for -eln).</p>
          
          {/* Desktop table (hidden on mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Verb (infinitive)</th>
                  <th className="p-2 text-left">du</th>
                  <th className="p-2 text-left">ihr</th>
                  <th className="p-2 text-left">Sie</th>
                  <th className="p-2 text-left">wir</th>
                  <th className="p-2 text-left">Listen</th>
                </tr>
              </thead>
              <tbody>
                {specialExamples.map(ex => (
                  <tr key={ex.verb} className="border-b">
                    <td className="p-2 font-mono font-bold">{ex.verb}</td>
                    <td className="p-2 font-mono">{ex.du}</td>
                    <td className="p-2 font-mono">{ex.ihr}</td>
                    <td className="p-2 font-mono">{ex.Sie}</td>
                    <td className="p-2 font-mono">{ex.wir}</td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-1">
                        <PronounceButton word={ex.duFull} />
                        <PronounceButton word={ex.ihrFull} />
                        <PronounceButton word={ex.SieFull} />
                        <PronounceButton word={ex.wirFull} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card layout (visible only on small screens) */}
          <div className="md:hidden space-y-4">
            {specialExamples.map(ex => (
              <div key={ex.verb} className="bg-gray-50 rounded-xl p-4 shadow-sm">
                <div className="font-mono font-bold text-lg text-purple-700 mb-3">{ex.verb}</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-purple-600 w-12">du:</span>
                    <span className="font-mono flex-1 ml-2">{ex.du}</span>
                    <PronounceButton word={ex.duFull} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-purple-600 w-12">ihr:</span>
                    <span className="font-mono flex-1 ml-2">{ex.ihr}</span>
                    <PronounceButton word={ex.ihrFull} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-purple-600 w-12">Sie:</span>
                    <span className="font-mono flex-1 ml-2">{ex.Sie}</span>
                    <PronounceButton word={ex.SieFull} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-purple-600 w-12">wir:</span>
                    <span className="font-mono flex-1 ml-2">{ex.wir}</span>
                    <PronounceButton word={ex.wirFull} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-sm bg-blue-50 p-2 rounded">
            💡 For verbs ending in -eln, the du form often drops the middle 'e': <em>läch(e)le</em> (smile), <em>sam(e)le</em> (collect). The wir form is identical to the infinitive.
          </div>
        </div>

        {/* Irregular Verbs */}
        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">4️⃣ Irregular Verbs (sein, haben, werden)</h3>
          
          {/* Desktop table (hidden on mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Verb</th>
                  <th className="p-2 text-left">du</th>
                  <th className="p-2 text-left">ihr</th>
                  <th className="p-2 text-left">Sie</th>
                  <th className="p-2 text-left">wir</th>
                  <th className="p-2">Listen</th>
                </tr>
              </thead>
              <tbody>
                {irregulars.map(irr => (
                  <tr key={irr.verb} className="border-b">
                    <td className="p-2 font-medium">{irr.verb}</td>
                    <td className="p-2 font-mono">{irr.du}</td>
                    <td className="p-2 font-mono">{irr.ihr}</td>
                    <td className="p-2 font-mono">{irr.Sie}</td>
                    <td className="p-2 font-mono">{irr.wir}</td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-1">
                        <PronounceButton word={irr.duFull} />
                        <PronounceButton word={irr.ihrFull} />
                        <PronounceButton word={irr.SieFull} />
                        <PronounceButton word={irr.wirFull} />
                      </div>
                    </td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card layout (visible only on small screens) */}
          <div className="md:hidden space-y-4">
            {irregulars.map(irr => (
              <div key={irr.verb} className="bg-gray-50 rounded-xl p-4 shadow-sm">
                <div className="font-bold text-purple-700 mb-3">{irr.verb}</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-purple-600 w-12">du:</span>
                    <span className="font-mono flex-1 ml-2">{irr.du}</span>
                    <PronounceButton word={irr.duFull} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-purple-600 w-12">ihr:</span>
                    <span className="font-mono flex-1 ml-2">{irr.ihr}</span>
                    <PronounceButton word={irr.ihrFull} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-purple-600 w-12">Sie:</span>
                    <span className="font-mono flex-1 ml-2">{irr.Sie}</span>
                    <PronounceButton word={irr.SieFull} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-purple-600 w-12">wir:</span>
                    <span className="font-mono flex-1 ml-2">{irr.wir}</span>
                    <PronounceButton word={irr.wirFull} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-sm bg-blue-50 p-2 rounded">
  <p className="font-semibold mb-1">💡 Examples:</p>
  <ul className="list-disc list-inside space-y-1">
    {irregulars.map(irr => (
      <li key={irr.verb}>
        <span className="font-mono">{irr.duFull}</span> – {irr.translation}
      </li>
    ))}
  </ul>
</div>
        </div>

        {/* Quiz */}
        <div className="mt-8 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
          <h3 className="text-xl font-bold text-center mb-3">🎯 Practice: Build the Imperative</h3>
          {!quizSentence ? (
            <div className="text-center">
              <button onClick={generateQuiz} className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition shadow">
                Start Quiz
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                <p className="text-lg font-semibold">Change to imperative:</p>
                <p className="text-md italic">{quizSentence.statement}</p>
                <p className="text-xs text-gray-500">→ {quizSentence.statementEn}</p>
                <p className="text-xs text-gray-500 mt-1">(target: {quizSentence.target})</p>
              </div>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="e.g., Spiel Fußball!"
                className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={checkQuiz}
                className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition shadow"
              >
                Check Answer
              </button>
              {quizFeedback && <p className="mt-3 text-sm font-medium p-2 bg-white rounded shadow-sm">{quizFeedback}</p>}
              <button onClick={generateQuiz} className="mt-4 text-sm text-purple-600 underline">
                New Sentence →
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm">
          💡 <strong>Tip:</strong> To make a command more polite, add <em>bitte</em> (please) – <em>Kommen Sie bitte!</em> (Please come!)
        </div>
      </div>
    </div>
  );
};

export default ImperativePage;