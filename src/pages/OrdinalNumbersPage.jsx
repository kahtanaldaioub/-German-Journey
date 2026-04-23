import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const OrdinalNumbersPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const ordinalNumbers = [
    { german: "erste", english: "first", example: "der erste Tag" },
    { german: "zweite", english: "second", example: "die zweite Woche" },
    { german: "dritte", english: "third", example: "das dritte Mal" },
    { german: "vierte", english: "fourth", example: "der vierte Platz" },
    { german: "fünfte", english: "fifth", example: "die fünfte Straße" },
    { german: "sechste", english: "sixth", example: "der sechste Monat" },
    { german: "siebte", english: "seventh", example: "die siebte Klasse" },
    { german: "achte", english: "eighth", example: "der achte Stock" },
    { german: "neunte", english: "ninth", example: "die neunte Stunde" },
    { german: "zehnte", english: "tenth", example: "der zehnte Geburtstag" },
    { german: "elfte", english: "eleventh", example: "der elfte November" },
    { german: "zwölfte", english: "twelfth", example: "die zwölfte Nacht" }
  ];

  const phrases = [
    { german: "Das ist mein erster Besuch in Berlin.", english: "This is my first visit to Berlin." },
    { german: "Heute ist der zweite April.", english: "Today is the second of April." },
    { german: "Er wohnt im dritten Stock.", english: "He lives on the third floor." },
    { german: "Zum ersten Mal habe ich Deutsch gehört.", english: "For the first time I heard German." }
  ];

  const startQuiz = () => {
    const random = ordinalNumbers[Math.floor(Math.random() * ordinalNumbers.length)];
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">🔢 Ordinal Numbers</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Learn how to say first, second, third... in German, with examples and audio.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Ordinal Numbers (1st – 12th)</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {ordinalNumbers.map(o => (
              <div key={o.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span className="font-medium">{o.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {o.english}</span>
                  <p className="text-xs text-gray-400">{o.example}</p>
                </div>
                <PronounceButton word={o.german} />
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
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., erste" className="w-full p-3 border rounded-xl mb-3" />
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

export default OrdinalNumbersPage;