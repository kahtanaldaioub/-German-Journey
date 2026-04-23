import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const HolidaysPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const holidays = [
    { german: "Weihnachten", english: "Christmas", example: "Weihnachten ist am 25. Dezember." },
    { german: "Neujahr", english: "New Year", example: "Frohes Neues Jahr!" },
    { german: "Ostern", english: "Easter", example: "An Ostern verstecken wir Eier." },
    { german: "der Geburtstag", english: "birthday", example: "Alles Gute zum Geburtstag!" },
    { german: "die Hochzeit", english: "wedding", example: "Sie feiern ihre Hochzeit." },
    { german: "Halloween", english: "Halloween", example: "Kinder gehen von Tür zu Tür." },
    { german: "der Karneval", english: "carnival", example: "In Köln wird Karneval gefeiert." },
    { german: "der Muttertag", english: "Mother's Day", example: "Zum Muttertag gibt es Blumen." },
    { german: "der Vatertag", english: "Father's Day", example: "Am Vatertag schenke ich eine Krawatte." },
    { german: "Silvester", english: "New Year's Eve", example: "Silvester gibt es Feuerwerk." }
  ];

  const phrases = [
    { german: "Frohe Weihnachten!", english: "Merry Christmas!" },
    { german: "Guten Rutsch ins neue Jahr!", english: "Happy New Year!" },
    { german: "Alles Gute zum Geburtstag!", english: "Happy birthday!" },
    { german: "Herzlichen Glückwunsch!", english: "Congratulations!" },
    { german: "Wie feierst du deinen Geburtstag?", english: "How do you celebrate your birthday?" }
  ];

  const startQuiz = () => {
    const random = holidays[Math.floor(Math.random() * holidays.length)];
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">🎉 Holidays & Celebrations</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Learn about German holidays, festivals, and how to wish someone well.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Holidays & Festivals</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {holidays.map(h => (
              <div key={h.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span className="font-medium">{h.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {h.english}</span>
                  <p className="text-xs text-gray-400">{h.example}</p>
                </div>
                <PronounceButton word={h.german} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">💬 Wishes & Phrases</h3>
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
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., Weihnachten" className="w-full p-3 border rounded-xl mb-3" />
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

export default HolidaysPage;