import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const IntroductionsPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');

  // Sample prompts for practice
  const prompts = [
    { english: "My name is Anna.", german: "Ich heiße Anna." },
    { english: "I am from Berlin.", german: "Ich komme aus Berlin." },
    { english: "I am 25 years old.", german: "Ich bin 25 Jahre alt." },
    { english: "I am a student.", german: "Ich bin Student." },
    { english: "This is my friend Tom.", german: "Das ist mein Freund Tom." }
  ];
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);

  const startQuiz = () => {
    const random = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(random);
    setQuizMode(true);
    setUserInput('');
    setFeedback('');
  };

  const checkAnswer = () => {
    const normalizedUser = userInput.trim().toLowerCase().replace(/[^a-zäöüß]/g, '');
    const normalizedCorrect = currentPrompt.german.toLowerCase().replace(/[^a-zäöüß]/g, '');
    if (normalizedUser === normalizedCorrect) {
      setFeedback('✅ Perfect!');
    } else {
      setFeedback(`❌ Correct: "${currentPrompt.german}"`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">👋 Introducing Yourself & Someone</h2>
          <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
            Learn how to talk about yourself and introduce others – formal and informal.
          </p>

          {/* Key phrases */}
          <div className="bg-white rounded-xl p-5 shadow-md mb-6">
            <h3 className="text-xl font-bold text-purple-700 mb-3">📌 Key Phrases</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { german: "Wie heißt du?", english: "What's your name?" },
                { german: "Ich heiße ...", english: "My name is ..." },
                { german: "Wie alt bist du?", english: "How old are you?" },
                { german: "Ich bin ... Jahre alt.", english: "I am ... years old." },
                { german: "Woher kommst du?", english: "Where are you from?" },
                { german: "Ich komme aus ...", english: "I come from ..." },
                { german: "Was machst du beruflich?", english: "What do you do for work?" },
                { german: "Ich bin Student / Lehrer / Arzt.", english: "I am a student / teacher / doctor." },
                { german: "Das ist mein Freund / meine Freundin.", english: "This is my friend (m/f)." },
                { german: "Das ist mein Bruder / meine Schwester.", english: "This is my brother / sister." },
                { german: "Freut mich, dich kennenzulernen.", english: "Nice to meet you." },
                { german: "Angenehm.", english: "Pleased to meet you." }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.german}</span>
                    <span className="text-gray-500 text-sm ml-2">– {item.english}</span>
                  </div>
                  <PronounceButton word={item.german} />
                </div>
              ))}
            </div>
          </div>

          {/* Formal vs Informal */}
          <div className="bg-yellow-50 rounded-xl p-4 mb-6">
            <p className="font-semibold">🔹 Formal vs. Informal</p>
            <ul className="list-disc list-inside text-sm mt-1 space-y-1">
              <li><strong>Informal (du):</strong> Used with friends, family, children – <em>Wie heißt du?</em></li>
              <li><strong>Formal (Sie):</strong> Used with strangers, authority, older people – <em>Wie heißen Sie?</em></li>
              <li>Always use the <strong>formal version</strong> in professional settings or when unsure.</li>
            </ul>
          </div>

          {/* Dialogues */}
          <div className="bg-white rounded-xl p-5 shadow-md mb-6">
            <h3 className="text-xl font-bold text-purple-700 mb-3">💬 Example Dialogues</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-semibold">Informal (friends)</p>
                <p className="italic">A: Hallo! Wie heißt du?</p>
                <p className="italic">B: Ich heiße Lisa. Und du?</p>
                <p className="italic">A: Ich bin Tom. Freut mich!</p>
                <PronounceButton word="Hallo! Wie heißt du? Ich heiße Lisa. Und du? Ich bin Tom. Freut mich!" />
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-semibold">Formal (first meeting)</p>
                <p className="italic">A: Guten Tag! Wie heißen Sie?</p>
                <p className="italic">B: Ich heiße Frau Schmidt.</p>
                <p className="italic">A: Angenehm. Ich bin Herr Meier.</p>
                <PronounceButton word="Guten Tag! Wie heißen Sie? Ich heiße Frau Schmidt. Angenehm. Ich bin Herr Meier." />
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-semibold">Introducing someone</p>
                <p className="italic">A: Das ist meine Freundin, Anna.</p>
                <p className="italic">B: Hallo Anna, schön dich kennenzulernen!</p>
                <p className="italic">Anna: Hallo, gleichfalls!</p>
                <PronounceButton word="Das ist meine Freundin Anna. Hallo Anna, schön dich kennenzulernen! Hallo, gleichfalls!" />
              </div>
            </div>
          </div>

          {/* Practice Quiz */}
          <div className="mt-8 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
            <h3 className="text-xl font-bold text-center mb-3">🎯 Practice: Translate to German</h3>
            {!quizMode ? (
              <div className="text-center">
                <button onClick={startQuiz} className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition shadow">
                  Start Practice
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                  <p className="text-lg font-semibold">Translate to German:</p>
                  <p className="text-md italic">{currentPrompt.english}</p>
                </div>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="e.g., Ich heiße Anna"
                  className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={checkAnswer}
                  className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition shadow"
                >
                  Check Answer
                </button>
                {feedback && <p className="mt-3 text-sm font-medium p-2 bg-white rounded shadow-sm">{feedback}</p>}
                <button onClick={startQuiz} className="mt-4 text-sm text-purple-600 underline">
                  New Question →
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm">
            💡 <strong>Tip:</strong> When introducing someone, use "Das ist …" (This is …) for both people and objects. For a group, say "Das sind …" (These are …).
          </div>
        </div>
    </div>
  );
};

export default IntroductionsPage;