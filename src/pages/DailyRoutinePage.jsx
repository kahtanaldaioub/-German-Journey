import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const DailyRoutinePage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const routineVerbs = [
    { german: "aufwachen", english: "to wake up", example: "Ich wache um 7 Uhr auf." },
    { german: "aufstehen", english: "to get up", example: "Ich stehe um 7:15 auf." },
    { german: "sich duschen", english: "to shower", example: "Ich dusche jeden Morgen." },
    { german: "sich anziehen", english: "to get dressed", example: "Sie zieht sich an." },
    { german: "frühstücken", english: "to have breakfast", example: "Wir frühstücken um 8 Uhr." },
    { german: "zur Arbeit gehen", english: "to go to work", example: "Er geht zur Arbeit." },
    { german: "arbeiten", english: "to work", example: "Ich arbeite von 9 bis 17 Uhr." },
    { german: "Mittagessen", english: "to have lunch", example: "Sie isst um 12 Uhr zu Mittag." },
    { german: "nach Hause kommen", english: "to come home", example: "Ich komme um 18 Uhr nach Hause." },
    { german: "kochen", english: "to cook", example: "Wir kochen das Abendessen." },
    { german: "fernsehen", english: "to watch TV", example: "Er sieht fern." },
    { german: "ins Bett gehen", english: "to go to bed", example: "Ich gehe um 22 Uhr ins Bett." }
  ];

  const phrases = [
    { german: "Was ist deine tägliche Routine?", english: "What is your daily routine?" },
    { german: "Ich stehe früh auf.", english: "I get up early." },
    { german: "Normalerweise frühstücke ich um 7 Uhr.", english: "Usually I have breakfast at 7." }
  ];

  const startQuiz = () => {
    const random = routineVerbs[Math.floor(Math.random() * routineVerbs.length)];
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">⏰ Daily Routine</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Learn to talk about your day – from waking up to going to bed.
        </p>

        {/* Vocabulary Table */}
        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Routine Verbs</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {routineVerbs.map(v => (
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

        {/* Example Sentences */}
        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">💬 Example Sentences</h3>
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

        {/* Quiz */}
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
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="e.g., aufwachen"
                className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button onClick={checkAnswer} className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition">
                Check Answer
              </button>
              {quizFeedback && <p className="mt-3 text-sm p-2 bg-white rounded">{quizFeedback}</p>}
              <button onClick={startQuiz} className="mt-4 text-sm text-purple-600 underline">New Word →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyRoutinePage;