import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const IllnessPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const [bodyQuizMode, setBodyQuizMode] = useState(false);
  const [currentBodyPart, setCurrentBodyPart] = useState(null);
  const [bodyUserAnswer, setBodyUserAnswer] = useState('');
  const [bodyQuizFeedback, setBodyQuizFeedback] = useState('');

  const symptoms = [
    { german: "Fieber", english: "fever", example: "Ich habe Fieber." },
    { german: "Husten", english: "cough", example: "Er hat Husten." },
    { german: "Kopfschmerzen", english: "headache", example: "Ich habe Kopfschmerzen." },
    { german: "Bauchschmerzen", english: "stomach ache", example: "Sie hat Bauchschmerzen." },
    { german: "Schnupfen", english: "runny nose", example: "Ich habe Schnupfen." },
    { german: "Halsschmerzen", english: "sore throat", example: "Er hat Halsschmerzen." },
    { german: "Grippe", english: "flu", example: "Sie hat die Grippe." }
  ];

  const bodyParts = [
    { german: "der Kopf", english: "head", example: "Mir tut der Kopf weh." },
    { german: "der Hals", english: "neck / throat", example: "Mein Hals tut weh." },
    { german: "die Schulter", english: "shoulder", example: "Sie hat Schulterschmerzen." },
    { german: "der Arm", english: "arm", example: "Er hat sich den Arm gebrochen." },
    { german: "die Hand", english: "hand", example: "Meine Hand ist geschwollen." },
    { german: "der Finger", english: "finger", example: "Ich habe mir in den Finger geschnitten." },
    { german: "der Rücken", english: "back", example: "Ich habe Rückenschmerzen." },
    { german: "das Bein", english: "leg", example: "Mein Bein tut weh." },
    { german: "das Knie", english: "knee", example: "Sie hat Schmerzen im Knie." },
    { german: "der Fuß", english: "foot", example: "Mein Fuß ist verstaucht." }
  ];

  const phrases = [
    { german: "Mir ist schlecht.", english: "I feel sick." },
    { german: "Ich brauche einen Arzt.", english: "I need a doctor." },
    { german: "Wo ist die Apotheke?", english: "Where is the pharmacy?" },
    { german: "Kann ich einen Termin machen?", english: "Can I make an appointment?" },
    { german: "Mir tut der Kopf weh.", english: "My head hurts." },
    { german: "Ich habe Schmerzen im Rücken.", english: "I have back pain." }
  ];

  // Symptoms quiz
  const startQuiz = () => {
    const random = symptoms[Math.floor(Math.random() * symptoms.length)];
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

  // Body parts quiz
  const startBodyQuiz = () => {
    const random = bodyParts[Math.floor(Math.random() * bodyParts.length)];
    setCurrentBodyPart(random);
    setBodyQuizMode(true);
    setBodyUserAnswer('');
    setBodyQuizFeedback('');
  };

  const checkBodyAnswer = () => {
    if (!currentBodyPart) return;
    const normalizedUser = bodyUserAnswer.trim().toLowerCase().replace(/[^a-zäöüß]/g, '');
    const normalizedCorrect = currentBodyPart.german.toLowerCase().replace(/[^a-zäöüß]/g, '');
    if (normalizedUser === normalizedCorrect) {
      setBodyQuizFeedback('✅ Correct!');
    } else {
      setBodyQuizFeedback(`❌ Correct: ${currentBodyPart.german} – ${currentBodyPart.english}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">🤒 To Be Ill in German</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Vocabulary for symptoms, body parts, doctor visits, and pharmacy.
        </p>

        {/* Symptoms Section */}
        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Common Symptoms</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {symptoms.map(s => (
              <div key={s.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span className="font-medium">{s.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {s.english}</span>
                  <p className="text-xs text-gray-400">{s.example}</p>
                </div>
                <PronounceButton word={s.german} />
              </div>
            ))}
          </div>
        </div>

        {/* Body Parts Section */}
        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Body Parts</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {bodyParts.map(b => (
              <div key={b.german} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                <div>
                  <span className="font-medium">{b.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {b.english}</span>
                  <p className="text-xs text-gray-400">{b.example}</p>
                </div>
                <PronounceButton word={b.german} />
              </div>
            ))}
          </div>
        </div>

        {/* Useful Phrases Section */}
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

        {/* Quiz: Symptoms */}
        <div className="mt-8 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl mb-6">
          <h3 className="text-xl font-bold text-center mb-3">🎯 Quiz: Symptoms – Translate to German</h3>
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
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., Fieber" className="w-full p-3 border rounded-xl mb-3" />
              <button onClick={checkAnswer} className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition">Check Answer</button>
              {quizFeedback && <p className="mt-3 text-sm p-2 bg-white rounded">{quizFeedback}</p>}
              <button onClick={startQuiz} className="mt-4 text-sm text-purple-600 underline">New Word →</button>
            </div>
          )}
        </div>

        {/* Quiz: Body Parts */}
        <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <h3 className="text-xl font-bold text-center mb-3">🎯 Quiz: Body Parts – Translate to German</h3>
          {!bodyQuizMode ? (
            <div className="text-center">
              <button onClick={startBodyQuiz} className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
                Start Quiz
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                <p className="text-lg font-semibold">How do you say:</p>
                <p className="text-2xl text-purple-700">{currentBodyPart.english}</p>
              </div>
              <input type="text" value={bodyUserAnswer} onChange={(e) => setBodyUserAnswer(e.target.value)} placeholder="e.g., der Kopf" className="w-full p-3 border rounded-xl mb-3" />
              <button onClick={checkBodyAnswer} className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition">Check Answer</button>
              {bodyQuizFeedback && <p className="mt-3 text-sm p-2 bg-white rounded">{bodyQuizFeedback}</p>}
              <button onClick={startBodyQuiz} className="mt-4 text-sm text-purple-600 underline">New Word →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IllnessPage;