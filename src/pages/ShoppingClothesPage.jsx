import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const ShoppingClothesPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const vocabulary = [
    { german: "das Kleid", english: "dress", example: "Das Kleid gefällt mir." },
    { german: "die Hose", english: "pants", example: "Ich brauche eine neue Hose." },
    { german: "das Hemd", english: "shirt", example: "Ein weißes Hemd, bitte." },
    { german: "die Jacke", english: "jacket", example: "Die Jacke ist warm." },
    { german: "die Schuhe", english: "shoes", example: "Die Schuhe sind zu klein." },
    { german: "die Größe", english: "size", example: "Welche Größe haben Sie?" },
    { german: "die Farbe", english: "color", example: "Gibt es das in blau?" },
    { german: "der Preis", english: "price", example: "Der Preis ist fair." },
    { german: "die Umkleidekabine", english: "fitting room", example: "Wo ist die Umkleidekabine?" }
  ];

  const phrases = [
    { german: "Kann ich das anprobieren?", english: "Can I try this on?" },
    { german: "Haben Sie das in einer anderen Größe?", english: "Do you have this in another size?" },
    { german: "Das ist zu teuer.", english: "That's too expensive." },
    { german: "Ich nehme es.", english: "I'll take it." },
    { german: "Kann ich mit Karte zahlen?", english: "Can I pay by card?" }
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">🛍️ Buying Clothes & Shopping</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Essential vocabulary and phrases for clothes shopping.
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
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., das Kleid" className="w-full p-3 border rounded-xl mb-3" />
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

export default ShoppingClothesPage;