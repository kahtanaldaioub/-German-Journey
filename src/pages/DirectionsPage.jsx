import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const DirectionsPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const directionWords = [
    { german: "links", english: "left", example: "Biegen Sie links ab." },
    { german: "rechts", english: "right", example: "Gehen Sie nach rechts." },
    { german: "geradeaus", english: "straight ahead", example: "Gehen Sie geradeaus." },
    { german: "die Ampel", english: "traffic light", example: "An der Ampel rechts." },
    { german: "die Ecke", english: "corner", example: "Um die Ecke." },
    { german: "der Bahnhof", english: "train station", example: "Wo ist der Bahnhof?" }
  ];

  const phrases = [
    { german: "Entschuldigung, wo ist die Apotheke?", english: "Excuse me, where is the pharmacy?" },
    { german: "Wie komme ich zum Bahnhof?", english: "How do I get to the station?" },
    { german: "Gehen Sie geradeaus bis zur Ampel.", english: "Go straight ahead to the traffic light." },
    { german: "Dann links abbiegen.", english: "Then turn left." },
    { german: "Es ist etwa fünf Minuten zu Fuß.", english: "It's about five minutes on foot." },
    { german: "Ist das weit von hier?", english: "Is that far from here?" }
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">🧭 Asking for & Giving Directions</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Essential phrases to find your way in German.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Key Words</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {directionWords.map(d => (
              <div key={d.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span className="font-medium">{d.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {d.english}</span>
                  <p className="text-xs text-gray-400">{d.example}</p>
                </div>
                <PronounceButton word={d.german} />
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
                <p className="text-md italic">{currentPhrase.english}</p>
              </div>
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., Entschuldigung, wo ist die Apotheke?" className="w-full p-3 border rounded-xl mb-3" />
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

export default DirectionsPage;