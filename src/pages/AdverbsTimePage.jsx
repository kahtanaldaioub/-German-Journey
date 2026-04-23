import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const AdverbsTimePage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const adverbs = [
    { german: "heute", english: "today", example: "Heute ist schönes Wetter." },
    { german: "morgen", english: "tomorrow", example: "Morgen habe ich frei." },
    { german: "gestern", english: "yesterday", example: "Gestern war ich im Kino." },
    { german: "jetzt", english: "now", example: "Jetzt muss ich gehen." },
    { german: "gleich", english: "right away / soon", example: "Ich komme gleich." },
    { german: "später", english: "later", example: "Wir sprechen später." },
    { german: "früh", english: "early", example: "Ich stehe früh auf." },
    { german: "spät", english: "late", example: "Er kommt immer spät." },
    { german: "oft", english: "often", example: "Ich reise oft nach Berlin." },
    { german: "selten", english: "rarely", example: "Sie geht selten aus." },
    { german: "immer", english: "always", example: "Er hilft immer." },
    { german: "nie", english: "never", example: "Ich habe nie Zeit." },
    { german: "manchmal", english: "sometimes", example: "Manchmal lese ich abends." },
    { german: "täglich", english: "daily", example: "Ich mache täglich Sport." }
  ];

  const phrases = [
    { german: "Heute Abend gehe ich ins Kino.", english: "Tonight I'm going to the cinema." },
    { german: "Morgen früh muss ich arbeiten.", english: "Tomorrow morning I have to work." },
    { german: "Ich komme später zurück.", english: "I'll come back later." },
    { german: "Sie ist immer pünktlich.", english: "She is always on time." }
  ];

  const startQuiz = () => {
    const random = adverbs[Math.floor(Math.random() * adverbs.length)];
    setCurrentItem(random);
    setQuizMode(true);
    setUserAnswer('');
    setQuizFeedback('');
  };

  const checkAnswer = () => {
    if (!currentItem) return;
    const normalizedUser = userAnswer.trim().toLowerCase().replace(/[^a-zäöüß]/g, '');
    const normalizedCorrect = currentItem.german.toLowerCase().replace(/[^a-zäöüß]/g, '');
    if (normalizedUser === normalizedCorrect) {
      setQuizFeedback('✅ Correct!');
    } else {
      setQuizFeedback(`❌ Correct: ${currentItem.german} – ${currentItem.english}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">⏰ Adverbs of Time</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Learn how to express when something happens – today, tomorrow, often, never, etc.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Adverbs of Time</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {adverbs.map(a => (
              <div key={a.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span className="font-medium">{a.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {a.english}</span>
                  <p className="text-xs text-gray-400">{a.example}</p>
                </div>
                <PronounceButton word={a.german} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📖 Example Sentences</h3>
          <div className="space-y-2">
            {phrases.map((p, idx) => (
              <div key={idx} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span>{p.german}</span>
                  <span className="text-gray-500 text-sm ml-2">→ {p.english}</span>
                </div>
                <PronounceButton word={p.german} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
          <h3 className="text-xl font-bold text-center mb-3">🎯 Quiz: Translate to German</h3>
          {!quizMode ? (
            <div className="text-center">
              <button onClick={startQuiz} className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
                Start Quiz
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                <p className="text-lg font-semibold">How do you say:</p>
                <p className="text-2xl text-purple-700">{currentItem.english}</p>
              </div>
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., heute" className="w-full p-3 border rounded-xl mb-3" />
              <button onClick={checkAnswer} className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition">Check Answer</button>
              {quizFeedback && <p className="mt-3 text-sm p-2 bg-white rounded">{quizFeedback}</p>}
              <button onClick={startQuiz} className="mt-4 text-sm text-purple-600 underline">New Word →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdverbsTimePage;