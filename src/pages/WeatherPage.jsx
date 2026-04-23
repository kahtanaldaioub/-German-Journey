import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const WeatherPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const weatherWords = [
    { german: "die Sonne", english: "sun", example: "Die Sonne scheint." },
    { german: "der Regen", english: "rain", example: "Es regnet." },
    { german: "der Schnee", english: "snow", example: "Es schneit." },
    { german: "der Wind", english: "wind", example: "Der Wind ist stark." },
    { german: "die Wolke", english: "cloud", example: "Der Himmel ist bewölkt." },
    { german: "das Gewitter", english: "thunderstorm", example: "Ein Gewitter kommt." }
  ];

  const phrases = [
    { german: "Wie ist das Wetter heute?", english: "How's the weather today?" },
    { german: "Es ist sonnig.", english: "It's sunny." },
    { german: "Es ist bewölkt.", english: "It's cloudy." },
    { german: "Es regnet.", english: "It's raining." },
    { german: "Es schneit.", english: "It's snowing." },
    { german: "Die Temperatur ist 20 Grad.", english: "The temperature is 20 degrees." },
    { german: "Es ist windig.", english: "It's windy." }
  ];

  const startQuiz = () => {
    const random = weatherWords[Math.floor(Math.random() * weatherWords.length)];
    setCurrentWord(random);
    setQuizMode(true);
    setUserAnswer('');
    setQuizFeedback('');
  };

  const checkAnswer = () => {
    if (!currentWord) return;
    const normalizedUser = userAnswer.trim().toLowerCase().replace(/[^a-zäöüß]/g, '');
    const normalizedCorrect = currentWord.german.toLowerCase().replace(/[^a-zäöüß]/g, '');
    if (normalizedUser === normalizedCorrect) {
      setQuizFeedback('✅ Correct!');
    } else {
      setQuizFeedback(`❌ Correct: ${currentWord.german}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">🌤️ How is the Weather?</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Talk about the weather in German – essential for small talk.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Weather Vocabulary</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {weatherWords.map(w => (
              <div key={w.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span className="font-medium">{w.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {w.english}</span>
                  <p className="text-xs text-gray-400">{w.example}</p>
                </div>
                <PronounceButton word={w.german} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">💬 Weather Phrases</h3>
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
                <p className="text-2xl text-purple-700">{currentWord.english}</p>
              </div>
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., die Sonne" className="w-full p-3 border rounded-xl mb-3" />
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

export default WeatherPage;