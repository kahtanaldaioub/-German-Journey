import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const LikesDislikesPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const expressions = [
    { german: "Ich mag ...", english: "I like ...", example: "Ich mag Pizza." },
    { german: "Ich liebe ...", english: "I love ...", example: "Ich liebe Musik." },
    { german: "Ich hasse ...", english: "I hate ...", example: "Ich hasse Lügen." },
    { german: "Mir gefällt ...", english: "I like (pleases me) ...", example: "Mir gefällt der Film." },
    { german: "Es macht mir Spaß, ... zu ...", english: "It's fun to ...", example: "Es macht mir Spaß, Deutsch zu lernen." },
    { german: "Ich interessiere mich für ...", english: "I am interested in ...", example: "Ich interessiere mich für Kunst." },
    { german: "Ich habe keine Lust auf ...", english: "I don't feel like ...", example: "Ich habe keine Lust auf Hausaufgaben." }
  ];

  const phrases = [
    { german: "Magst du Fußball?", english: "Do you like soccer?" },
    { german: "Was machst du gern in deiner Freizeit?", english: "What do you like to do in your free time?" },
    { german: "Das gefällt mir sehr!", english: "I like that very much!" },
    { german: "Das schmeckt mir nicht.", english: "I don't like the taste." }
  ];

  const startQuiz = () => {
    const random = expressions[Math.floor(Math.random() * expressions.length)];
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">❤️ Expressing Likes & Dislikes</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Learn how to say what you like, love, hate, and prefer in German.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Key Expressions</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {expressions.map(e => (
              <div key={e.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span className="font-medium">{e.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {e.english}</span>
                  <p className="text-xs text-gray-400">{e.example}</p>
                </div>
                <PronounceButton word={e.german} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">💬 Example Sentences</h3>
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
                <p className="text-md italic">{currentPhrase.english}</p>
              </div>
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., Ich mag ..." className="w-full p-3 border rounded-xl mb-3" />
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

export default LikesDislikesPage;