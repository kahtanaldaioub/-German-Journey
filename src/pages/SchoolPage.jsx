import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const SchoolPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const schoolVocabulary = [
    { german: "die Schule", english: "school", example: "Ich gehe in die Schule." },
    { german: "der Lehrer / die Lehrerin", english: "teacher", example: "Der Lehrer erklärt die Aufgabe." },
    { german: "der Schüler / die Schülerin", english: "pupil / student", example: "Die Schüler lernen Deutsch." },
    { german: "die Klasse", english: "class", example: "Wir sind in der Klasse 5B." },
    { german: "das Fach", english: "subject", example: "Mathe ist mein Lieblingsfach." },
    { german: "Mathematik (Mathe)", english: "mathematics", example: "Mathe ist schwer." },
    { german: "Deutsch", english: "German", example: "Ich lerne Deutsch." },
    { german: "Englisch", english: "English", example: "Englisch spricht man weltweit." },
    { german: "Geschichte", english: "history", example: "Geschichte ist interessant." },
    { german: "die Pause", english: "break", example: "In der Pause spielen wir Fußball." },
    { german: "die Hausaufgabe", english: "homework", example: "Hast du die Hausaufgaben gemacht?" },
    { german: "die Prüfung", english: "exam", example: "Ich habe morgen eine Prüfung." },
    { german: "die Note", english: "grade", example: "Meine Note ist gut." }
  ];

  const phrases = [
    { german: "Welche Klasse gehst du?", english: "Which grade are you in?" },
    { german: "Ich habe heute Unterricht bis 15 Uhr.", english: "I have classes until 3 p.m. today." },
    { german: "Magst du deinen Lehrer?", english: "Do you like your teacher?" },
    { german: "Die Schule fängt um 8 Uhr an.", english: "School starts at 8 o'clock." }
  ];

  const startQuiz = () => {
    const random = schoolVocabulary[Math.floor(Math.random() * schoolVocabulary.length)];
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">📚 School & Education</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Essential vocabulary for school, subjects, and education.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-md mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-3">📌 School Vocabulary</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {schoolVocabulary.map(v => (
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
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="e.g., die Schule" className="w-full p-3 border rounded-xl mb-3" />
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

export default SchoolPage;