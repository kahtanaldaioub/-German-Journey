import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const AppointmentsPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const phrases = [
    { german: "Ich möchte einen Termin machen.", english: "I would like to make an appointment." },
    { german: "Haben Sie morgen Zeit?", english: "Do you have time tomorrow?" },
    { german: "Um wie viel Uhr?", english: "At what time?" },
    { german: "Kann ich am Montag kommen?", english: "Can I come on Monday?" },
    { german: "Ich bin krank. Ich brauche einen Arzt.", english: "I am sick. I need a doctor." },
    { german: "Wann ist der nächste freie Termin?", english: "When is the next free appointment?" },
    { german: "Um 10 Uhr passt mir gut.", english: "10 o'clock works for me." },
    { german: "Ich muss meinen Termin absagen.", english: "I have to cancel my appointment." }
  ];

  const startQuiz = () => {
    const random = phrases[Math.floor(Math.random() * phrases.length)];
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">📅 Appointments</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Useful phrases for making, changing, or canceling appointments.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">💬 Key Phrases</h3>
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
                <p className="text-md italic">{currentPhrase.english}</p>
              </div>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="e.g., Ich möchte einen Termin machen."
                className="w-full p-3 border border-gray-300 rounded-xl mb-3"
              />
              <button onClick={checkAnswer} className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition">
                Check Answer
              </button>
              {quizFeedback && <p className="mt-3 text-sm p-2 bg-white rounded">{quizFeedback}</p>}
              <button onClick={startQuiz} className="mt-4 text-sm text-purple-600 underline">New Phrase →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;