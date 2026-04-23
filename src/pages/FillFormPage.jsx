import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const FillFormPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const formFields = [
    { german: "Name", english: "name", example: "Bitte geben Sie Ihren vollständigen Namen ein." },
    { german: "Vorname", english: "first name", example: "Ihr Vorname" },
    { german: "Nachname", english: "last name", example: "Ihr Nachname" },
    { german: "Adresse", english: "address", example: "Ihre Adresse" },
    { german: "Postleitzahl (PLZ)", english: "postal code", example: "PLZ: 10115" },
    { german: "Stadt", english: "city", example: "Berlin" },
    { german: "Geburtsdatum", english: "date of birth", example: "TT/MM/JJJJ" },
    { german: "Geburtsort", english: "place of birth", example: "Ihr Geburtsort" },
    { german: "Nationalität", english: "nationality", example: "deutsch" },
    { german: "Telefonnummer", english: "phone number", example: "Ihre Telefonnummer" },
    { german: "E‑Mail", english: "email", example: "Ihre E‑Mail-Adresse" },
    { german: "Unterschrift", english: "signature", example: "Bitte unterschreiben Sie hier." }
  ];

  const instructions = [
    { german: "Bitte in Druckbuchstaben ausfüllen.", english: "Please fill out in block capitals." },
    { german: "Zutreffendes bitte ankreuzen.", english: "Please tick the appropriate box." },
    { german: "Alle Felder sind Pflichtfelder.", english: "All fields are required." }
  ];

  const startQuiz = () => {
    const random = formFields[Math.floor(Math.random() * formFields.length)];
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">📝 How to Fill in a Form</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Essential vocabulary for completing official forms in German.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Form Fields</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {formFields.map(f => (
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
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Instructions & Common Phrases</h3>
          <div className="space-y-2">
            {instructions.map(i => (
              <div key={i.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span>{i.german}</span>
                  <span className="text-gray-500 text-sm ml-2">→ {i.english}</span>
                </div>
                <PronounceButton word={i.german} />
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
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., Name" className="w-full p-3 border rounded-xl mb-3" />
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

export default FillFormPage;