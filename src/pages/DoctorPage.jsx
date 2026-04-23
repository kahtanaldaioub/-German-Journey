import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const DoctorPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const vocabulary = [
    { german: "der Arzt / die Ärztin", english: "doctor", example: "Ich muss zum Arzt." },
    { german: "die Sprechstunde", english: "consultation hours", example: "Die Sprechstunde ist von 9 bis 12." },
    { german: "der Termin", english: "appointment", example: "Ich brauche einen Termin." },
    { german: "die Praxis", english: "practice", example: "Die Praxis ist um die Ecke." },
    { german: "das Rezept", english: "prescription", example: "Können Sie mir ein Rezept ausstellen?" },
    { german: "die Tablette", english: "tablet", example: "Nehmen Sie diese Tabletten." }
  ];

  const phrases = [
    { german: "Ich habe einen Termin bei Dr. Schmidt.", english: "I have an appointment with Dr. Schmidt." },
    { german: "Ich fühle mich krank.", english: "I feel sick." },
    { german: "Was fehlt Ihnen?", english: "What's wrong with you?" },
    { german: "Ich habe starke Kopfschmerzen.", english: "I have a severe headache." },
    { german: "Bitte machen Sie den Mund auf.", english: "Please open your mouth." },
    { german: "Sie müssen sich ausruhen.", english: "You need to rest." },
    { german: "Das Rezept können Sie in der Apotheke einlösen.", english: "You can fill the prescription at the pharmacy." }
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">🏥 At the Doctor</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Important vocabulary and phrases for visiting a doctor in German.
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
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., der Arzt" className="w-full p-3 border rounded-xl mb-3" />
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

export default DoctorPage;