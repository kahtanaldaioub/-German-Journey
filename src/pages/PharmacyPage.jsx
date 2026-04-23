import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const PharmacyPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const vocabulary = [
    { german: "die Apotheke", english: "pharmacy / chemist", example: "Wo ist die nächste Apotheke?" },
    { german: "der Apotheker / die Apothekerin", english: "pharmacist", example: "Der Apotheker berät mich." },
    { german: "das Medikament", english: "medication", example: "Ich brauche ein Medikament gegen Kopfschmerzen." },
    { german: "die Tablette", english: "tablet", example: "Nehmen Sie zweimal täglich eine Tablette." },
    { german: "die Salbe", english: "ointment", example: "Eine Salbe für den Ausschlag." },
    { german: "der Hustensaft", english: "cough syrup", example: "Haben Sie Hustensaft für Kinder?" },
    { german: "die Tropfen", english: "drops", example: "Augentropfen gegen trockene Augen." },
    { german: "das Rezept", english: "prescription", example: "Ich habe ein Rezept vom Arzt." },
    { german: "die Packungsbeilage", english: "package insert", example: "Lesen Sie die Packungsbeilage." },
    { german: "die Nebenwirkung", english: "side effect", example: "Gibt es Nebenwirkungen?" }
  ];

  const phrases = [
    { german: "Ich habe Kopfschmerzen / Husten / Fieber.", english: "I have a headache / cough / fever." },
    { german: "Was können Sie mir empfehlen?", english: "What can you recommend?" },
    { german: "Ist das rezeptfrei?", english: "Is this available without prescription?" },
    { german: "Wie oft soll ich das einnehmen?", english: "How often should I take it?" },
    { german: "Kann ich das auch ohne Rezept bekommen?", english: "Can I get this without a prescription?" },
    { german: "Ich bin allergisch gegen Penicillin.", english: "I am allergic to penicillin." }
  ];

  const dialogue = {
    german: [
      "Kunde: Guten Tag. Ich habe seit gestern starke Halsschmerzen.",
      "Apotheker: Guten Tag. Haben Sie auch Fieber?",
      "Kunde: Nein, kein Fieber. Aber es tut weh beim Schlucken.",
      "Apotheker: Dann empfehle ich Ihnen diese Lutschtabletten. Zweimal täglich eine.",
      "Kunde: Vielen Dank. Wie viel kostet das?",
      "Apotheker: 5,90 Euro. Gute Besserung!"
    ],
    english: [
      "Customer: Good day. I've had a bad sore throat since yesterday.",
      "Pharmacist: Good day. Do you have a fever as well?",
      "Customer: No, no fever. But it hurts when I swallow.",
      "Pharmacist: Then I recommend these lozenges. One tablet twice a day.",
      "Customer: Thank you very much. How much does it cost?",
      "Pharmacist: 5.90 euros. Get well soon!"
    ]
  };

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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">💊 At the Pharmacy / Chemist</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Learn how to ask for medicine, describe symptoms, and understand pharmacist advice.
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

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">🗣️ Sample Dialogue</h3>
          <div className="space-y-2">
            {dialogue.german.map((line, idx) => (
              <div key={idx} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span>{line}</span>
                  <span className="text-gray-500 text-sm ml-2">→ {dialogue.english[idx]}</span>
                </div>
                <PronounceButton word={line} />
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
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="e.g., die Apotheke"
                className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button onClick={checkAnswer} className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition">
                Check Answer
              </button>
              {quizFeedback && <p className="mt-3 text-sm p-2 bg-white rounded">{quizFeedback}</p>}
              <button onClick={startQuiz} className="mt-4 text-sm text-purple-600 underline">New Word →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyPage;