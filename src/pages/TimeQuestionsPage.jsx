import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const TimeQuestionsPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const questions = [
    { german: "Wie spät ist es?", english: "What time is it?" },
    { german: "Um wie viel Uhr ...?", english: "At what time ...?" },
    { german: "Wie lange dauert ...?", english: "How long does ... take?" },
    { german: "Seit wann ...?", english: "Since when ...?" },
    { german: "Bis wann ...?", english: "Until when ...?" },
    { german: "Wann beginnt der Film?", english: "When does the movie start?" },
    { german: "Wann endet der Unterricht?", english: "When does the class end?" },
    { german: "Wie viel Zeit haben wir?", english: "How much time do we have?" }
  ];

  const responses = [
    { german: "Es ist halb drei.", english: "It's half past two." },
    { german: "Es dauert zehn Minuten.", english: "It takes ten minutes." },
    { german: "Von 9 bis 17 Uhr.", english: "From 9 to 5." }
  ];

  const startQuiz = () => {
    const all = [...questions, ...responses];
    const random = all[Math.floor(Math.random() * all.length)];
    setCurrentPhrase(random);
    setQuizMode(true);
    setUserAnswer('');
    setQuizFeedback('');
  };

  const checkAnswer = () => {
    if (!currentPhrase) return;
    const normalizedUser = userAnswer.trim().toLowerCase().replace(/[^a-zäöüß]/g, '');
    const normalizedCorrect = currentPhrase.german.toLowerCase().replace(/[^a-zäöüß]/g, '');
    if (normalizedUser === normalizedCorrect) {
      setQuizFeedback('✅ Correct!');
    } else {
      setQuizFeedback(`❌ Correct: ${currentPhrase.german}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">⏱️ Time‑Related Questions</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Learn how to ask and answer questions about time, duration, and schedules.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">❓ Questions about Time</h3>
          <div className="space-y-2">
            {questions.map(q => (
              <div key={q.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span>{q.german}</span>
                  <span className="text-gray-500 text-sm ml-2">→ {q.english}</span>
                </div>
                <PronounceButton word={q.german} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">💬 Sample Answers</h3>
          <div className="space-y-2">
            {responses.map(r => (
              <div key={r.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span>{r.german}</span>
                  <span className="text-gray-500 text-sm ml-2">→ {r.english}</span>
                </div>
                <PronounceButton word={r.german} />
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
                <p className="text-md italic">{currentPhrase.english}</p>
              </div>
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., Wie spät ist es?" className="w-full p-3 border rounded-xl mb-3" />
              <button onClick={checkAnswer} className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition">Check Answer</button>
              {quizFeedback && <p className="mt-3 text-sm p-2 bg-white rounded">{quizFeedback}</p>}
              <button onClick={startQuiz} className="mt-4 text-sm text-purple-600 underline">New Phrase →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeQuestionsPage;