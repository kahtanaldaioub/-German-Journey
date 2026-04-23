import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const CountriesPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const countries = [
    { german: "Deutschland", english: "Germany", nationality: "deutsch" },
    { german: "Österreich", english: "Austria", nationality: "österreichisch" },
    { german: "die Schweiz", english: "Switzerland", nationality: "schweizerisch" },
    { german: "Frankreich", english: "France", nationality: "französisch" },
    { german: "Italien", english: "Italy", nationality: "italienisch" },
    { german: "Spanien", english: "Spain", nationality: "spanisch" },
    { german: "England", english: "England", nationality: "englisch" },
    { german: "die USA", english: "the USA", nationality: "amerikanisch" },
    { german: "Kanada", english: "Canada", nationality: "kanadisch" },
    { german: "China", english: "China", nationality: "chinesisch" },
    { german: "Japan", english: "Japan", nationality: "japanisch" },
    { german: "Russland", english: "Russia", nationality: "russisch" }
  ];

  const phrases = [
    { german: "Woher kommst du?", english: "Where are you from?" },
    { german: "Ich komme aus Deutschland.", english: "I come from Germany." },
    { german: "Ich bin Deutscher / Deutsche.", english: "I am German." },
    { german: "Meine Muttersprache ist Deutsch.", english: "My native language is German." }
  ];

  const startQuiz = () => {
    const random = countries[Math.floor(Math.random() * countries.length)];
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">🌍 Countries & Nationalities</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Learn to say where you are from and talk about nationalities.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Countries & Nationalities</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {countries.map(c => (
              <div key={c.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span className="font-medium">{c.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {c.english}</span>
                  <p className="text-xs text-gray-400">Nationalität: {c.nationality}</p>
                </div>
                <PronounceButton word={c.german} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">💬 Useful Phrases</h3>
          <div className="space-y-2">
            {phrases.map(p => (
              <div key={p.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
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
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., Deutschland" className="w-full p-3 border rounded-xl mb-3" />
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

export default CountriesPage;