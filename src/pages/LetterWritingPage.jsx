import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const LetterWritingPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const salutations = [
    { german: "Sehr geehrte Damen und Herren,", english: "Dear Sir or Madam," },
    { german: "Sehr geehrter Herr Schmidt,", english: "Dear Mr. Schmidt," },
    { german: "Sehr geehrte Frau Müller,", english: "Dear Ms. Müller," },
    { german: "Liebe/r ...", english: "Dear ... (informal)" }
  ];

  const closings = [
    { german: "Mit freundlichen Grüßen", english: "Sincerely (formal)" },
    { german: "Viele Grüße", english: "Best regards (semi-formal)" },
    { german: "Liebe Grüße", english: "Warm regards (informal)" }
  ];

  const phrases = [
    { german: "ich schreibe Ihnen, weil ...", english: "I am writing to you because ..." },
    { german: "vielen Dank für Ihre Antwort.", english: "Thank you for your reply." },
    { german: "ich möchte mich beschweren über ...", english: "I would like to complain about ..." },
    { german: "Könnten Sie mir bitte weitere Informationen senden?", english: "Could you please send me further information?" }
  ];

  const startQuiz = () => {
    const all = [...salutations, ...closings, ...phrases];
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">✉️ Letter Writing (Formal)</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Essential phrases for writing formal letters and emails in German.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Salutations</h3>
          <div className="space-y-2">
            {salutations.map(s => (
              <div key={s.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span>{s.german}</span>
                  <span className="text-gray-500 text-sm ml-2">→ {s.english}</span>
                </div>
                <PronounceButton word={s.german} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Closings</h3>
          <div className="space-y-2">
            {closings.map(c => (
              <div key={c.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span>{c.german}</span>
                  <span className="text-gray-500 text-sm ml-2">→ {c.english}</span>
                </div>
                <PronounceButton word={c.german} />
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
                <p className="text-md italic">{currentPhrase.english}</p>
              </div>
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., Sehr geehrte Damen und Herren," className="w-full p-3 border rounded-xl mb-3" />
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

export default LetterWritingPage;