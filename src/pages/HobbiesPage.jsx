import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const HobbiesPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const hobbies = [
    { german: "Fußball spielen", english: "to play soccer", example: "Ich spiele Fußball." },
    { german: "lesen", english: "to read", example: "Sie liest gern." },
    { german: "Musik hören", english: "to listen to music", example: "Er hört Rockmusik." },
    { german: "fernsehen", english: "to watch TV", example: "Wir sehen abends fern." },
    { german: "kochen", english: "to cook", example: "Ich koche gern." },
    { german: "reisen", english: "to travel", example: "Sie reist viel." },
    { german: "fotografieren", english: "to take photos", example: "Er fotografiert die Natur." },
    { german: "tanzen", english: "to dance", example: "Sie tanzt in ihrer Freizeit." },
    { german: "schwimmen", english: "to swim", example: "Wir schwimmen im Sommer." },
    { german: "malen", english: "to paint", example: "Er malt Landschaften." }
  ];

  const phrases = [
    { german: "Was sind deine Hobbys?", english: "What are your hobbies?" },
    { german: "Ich interessiere mich für Musik.", english: "I am interested in music." },
    { german: "In meiner Freizeit spiele ich Gitarre.", english: "In my free time I play guitar." },
    { german: "Hast du Hobbys?", english: "Do you have hobbies?" }
  ];

  const startQuiz = () => {
    const random = hobbies[Math.floor(Math.random() * hobbies.length)];
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">🎨 Hobbies & Free Time</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Learn to talk about your hobbies and free‑time activities.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Hobbies & Activities</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {hobbies.map(h => (
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
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., Fußball spielen" className="w-full p-3 border rounded-xl mb-3" />
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

export default HobbiesPage;