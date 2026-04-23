import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const FamilyPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const familyMembers = [
    { german: "die Mutter", english: "mother", example: "Meine Mutter kocht gut." },
    { german: "der Vater", english: "father", example: "Mein Vater arbeitet im Büro." },
    { german: "die Schwester", english: "sister", example: "Meine Schwester ist 15 Jahre alt." },
    { german: "der Bruder", english: "brother", example: "Mein Bruder spielt Fußball." },
    { german: "die Oma / Großmutter", english: "grandma", example: "Meine Oma backt Kuchen." },
    { german: "der Opa / Großvater", english: "grandpa", example: "Mein Opa erzählt Geschichten." },
    { german: "die Tante", english: "aunt", example: "Meine Tante wohnt in Berlin." },
    { german: "der Onkel", english: "uncle", example: "Mein Onkel ist Arzt." },
    { german: "die Cousine", english: "cousin (f)", example: "Meine Cousine studiert Medizin." },
    { german: "der Cousin", english: "cousin (m)", example: "Mein Cousin kommt morgen." },
    { german: "das Baby", english: "baby", example: "Das Baby schläft." }
  ];

  const sentences = [
    { german: "Ich habe eine Schwester.", english: "I have a sister." },
    { german: "Das ist mein Bruder.", english: "This is my brother." },
    { german: "Meine Eltern sind zu Hause.", english: "My parents are at home." },
    { german: "Wie viele Geschwister hast du?", english: "How many siblings do you have?" }
  ];

  const startQuiz = () => {
    const random = familyMembers[Math.floor(Math.random() * familyMembers.length)];
    setCurrentQuestion(random);
    setQuizMode(true);
    setUserAnswer('');
    setQuizFeedback('');
  };

  const checkAnswer = () => {
    if (!currentQuestion) return;
    const normalizedUser = userAnswer.trim().toLowerCase().replace(/[^a-zäöüß]/g, '');
    const normalizedCorrect = currentQuestion.german.toLowerCase().replace(/[^a-zäöüß]/g, '');
    if (normalizedUser === normalizedCorrect) {
      setQuizFeedback('✅ Correct!');
    } else {
      setQuizFeedback(`❌ Correct: ${currentQuestion.german} – ${currentQuestion.english}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">👨‍👩‍👧‍👦 The Family in German</h2>
          <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
            Learn family members and how to talk about relatives.
          </p>

          {/* Vocabulary Table */}
          <div className="bg-white rounded-xl p-5 shadow-md mb-6">
            <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Family Members</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {familyMembers.map(m => (
                <div key={m.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                  <div>
                    <span className="font-medium">{m.german}</span>
                    <span className="text-gray-500 text-sm ml-2">– {m.english}</span>
                    <p className="text-xs text-gray-400">{m.example}</p>
                  </div>
                  <PronounceButton word={m.german} />
                </div>
              ))}
            </div>
          </div>

          {/* Example Sentences */}
          <div className="bg-white rounded-xl p-5 shadow-md mb-6">
            <h3 className="text-xl font-bold text-purple-700 mb-3">📖 Example Sentences</h3>
            <div className="space-y-2">
              {sentences.map((s, idx) => (
                <div key={idx} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                  <div>
                    <span>{s.german}</span>
                    <span className="text-gray-500 text-sm ml-2">→ {s.english}</span>
                  </div>
                  <PronounceButton word={s.german} />
                </div>
              ))}
            </div>
          </div>

          {/* Quiz */}
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
                  <p className="text-2xl text-purple-700">{currentQuestion.english}</p>
                </div>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="e.g., die Mutter"
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

export default FamilyPage;