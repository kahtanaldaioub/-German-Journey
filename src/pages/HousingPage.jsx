import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const HousingPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const rooms = [
    { german: "das Wohnzimmer", english: "living room", example: "Das Wohnzimmer ist groß." },
    { german: "die Küche", english: "kitchen", example: "Die Küche ist modern." },
    { german: "das Schlafzimmer", english: "bedroom", example: "Mein Schlafzimmer ist klein." },
    { german: "das Badezimmer", english: "bathroom", example: "Das Badezimmer hat eine Dusche." },
    { german: "der Flur", english: "hallway", example: "Der Flur ist lang." },
    { german: "der Keller", english: "basement", example: "Im Keller ist es kalt." },
    { german: "der Dachboden", english: "attic", example: "Der Dachboden ist voll." }
  ];

  const furniture = [
    { german: "der Tisch", english: "table", example: "Der Tisch ist aus Holz." },
    { german: "der Stuhl", english: "chair", example: "Ein bequemer Stuhl." },
    { german: "das Sofa", english: "sofa", example: "Wir sitzen auf dem Sofa." },
    { german: "das Bett", english: "bed", example: "Das Bett ist neu." },
    { german: "der Schrank", english: "cupboard / wardrobe", example: "Der Schrank ist voll." },
    { german: "die Lampe", english: "lamp", example: "Die Lampe leuchtet." },
    { german: "der Teppich", english: "carpet", example: "Ein weicher Teppich." }
  ];

  const phrases = [
    { german: "Ich wohne in einer Wohnung.", english: "I live in an apartment." },
    { german: "Die Miete ist 800 Euro.", english: "The rent is 800 euros." },
    { german: "Das Haus hat drei Schlafzimmer.", english: "The house has three bedrooms." },
    { german: "Die Wohnung ist möbliert.", english: "The apartment is furnished." }
  ];

  const startQuiz = () => {
    const all = [...rooms, ...furniture];
    const random = all[Math.floor(Math.random() * all.length)];
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">🏠 Housing: Rooms & Furniture</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Learn to describe your home, rooms, and furniture.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Rooms</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {rooms.map(r => (
              <div key={r.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span className="font-medium">{r.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {r.english}</span>
                  <p className="text-xs text-gray-400">{r.example}</p>
                </div>
                <PronounceButton word={r.german} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">🪑 Furniture</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {furniture.map(f => (
              <div key={f.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span className="font-medium">{f.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {f.english}</span>
                  <p className="text-xs text-gray-400">{f.example}</p>
                </div>
                <PronounceButton word={f.german} />
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
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., das Wohnzimmer" className="w-full p-3 border rounded-xl mb-3" />
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

export default HousingPage;