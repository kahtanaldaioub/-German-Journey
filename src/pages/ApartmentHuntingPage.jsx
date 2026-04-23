import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const ApartmentHuntingPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const vocabulary = [
    { german: "die Wohnung", english: "apartment", example: "Ich suche eine Wohnung." },
    { german: "die Miete", english: "rent", example: "Die Miete ist 800 Euro." },
    { german: "die Kaution", english: "deposit", example: "Die Kaution beträgt zwei Monatsmieten." },
    { german: "der Vermieter", english: "landlord", example: "Der Vermieter ist nett." },
    { german: "die Besichtigung", english: "viewing", example: "Ich habe eine Besichtigung um 15 Uhr." },
    { german: "das Zimmer", english: "room", example: "Das Zimmer ist hell." },
    { german: "die Küche", english: "kitchen", example: "Die Küche ist modern." },
    { german: "das Bad", english: "bathroom", example: "Das Bad ist klein." }
  ];

  const phrases = [
    { german: "Ich suche eine Wohnung zur Miete.", english: "I am looking for an apartment to rent." },
    { german: "Wie viele Zimmer hat die Wohnung?", english: "How many rooms does the apartment have?" },
    { german: "Ist die Wohnung möbliert?", english: "Is the apartment furnished?" },
    { german: "Was ist in der Miete enthalten?", english: "What is included in the rent?" }
  ];

  const startQuiz = () => {
    const random = vocabulary[Math.floor(Math.random() * vocabulary.length)];
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">🏠 Apartment Hunting</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Essential vocabulary and phrases for finding and renting an apartment.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Vocabulary</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {vocabulary.map(v => (
              <div key={v.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span className="font-medium">{v.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {v.english}</span>
                  <p className="text-xs text-gray-400">{v.example}</p>
                </div>
                <PronounceButton word={v.german} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">💬 Useful Phrases</h3>
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
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., die Wohnung" className="w-full p-3 border rounded-xl mb-3" />
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

export default ApartmentHuntingPage;