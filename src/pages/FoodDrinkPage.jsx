import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const FoodDrinkPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const food = [
    { german: "das Brot", english: "bread", example: "Ein Brot, bitte." },
    { german: "der Käse", english: "cheese", example: "Ich mag Käse." },
    { german: "die Wurst", english: "sausage", example: "Bratwurst mit Senf." },
    { german: "das Ei", english: "egg", example: "Zwei Eier, bitte." },
    { german: "der Joghurt", english: "yogurt", example: "Ein Joghurt, bitte." },
    { german: "der Apfel", english: "apple", example: "Ein Apfel am Tag." },
    { german: "die Banane", english: "banana", example: "Die Banane ist reif." },
    { german: "die Kartoffel", english: "potato", example: "Kartoffeln mit Salz." },
    { german: "der Reis", english: "rice", example: "Ich esse gern Reis." },
    { german: "die Suppe", english: "soup", example: "Eine heiße Suppe." }
  ];

  const drinks = [
    { german: "das Wasser", english: "water", example: "Ein Glas Wasser, bitte." },
    { german: "der Kaffee", english: "coffee", example: "Einen Kaffee, bitte." },
    { german: "der Tee", english: "tea", example: "Ein Tee mit Milch." },
    { german: "der Saft", english: "juice", example: "Apfelsaft, bitte." },
    { german: "das Bier", english: "beer", example: "Ein Bier, bitte." },
    { german: "der Wein", english: "wine", example: "Ein Glas Rotwein." }
  ];

  const phrases = [
    { german: "Ich habe Hunger.", english: "I am hungry." },
    { german: "Ich habe Durst.", english: "I am thirsty." },
    { german: "Was möchtest du essen?", english: "What would you like to eat?" },
    { german: "Ich hätte gern eine Pizza.", english: "I would like a pizza." },
    { german: "Schmeckt gut!", english: "Tastes good!" }
  ];

  const startQuiz = () => {
    const all = [...food, ...drinks];
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">🍎 Food & Drink</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Essential vocabulary for food and drinks in German.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Food</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {food.map(f => (
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
          <h3 className="text-xl font-bold text-purple-700 mb-3">🥤 Drinks</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {drinks.map(d => (
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
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., das Brot" className="w-full p-3 border rounded-xl mb-3" />
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

export default FoodDrinkPage;