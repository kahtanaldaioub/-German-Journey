import React, { useState, useEffect } from 'react';
import PronounceButton from '../components/PronounceButton';
import { verbs } from '../data/verbs';

const VerbsQuizPage = () => {
  const [quiz, setQuiz] = useState({ current: null, options: [], answered: false, score: 0, feedback: "" });

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const generateQuestion = () => {
    const correctVerb = verbs[Math.floor(Math.random() * verbs.length)];
    const correctAnswer = correctVerb.english;
    let otherMeanings = verbs.filter(v => v.infinitive !== correctVerb.infinitive).map(v => v.english);
    otherMeanings = [...new Set(otherMeanings)];
    let distractors = [];
    while (distractors.length < 3 && otherMeanings.length) {
      const rand = otherMeanings[Math.floor(Math.random() * otherMeanings.length)];
      if (!distractors.includes(rand) && rand !== correctAnswer) {
        distractors.push(rand);
      }
      if (otherMeanings.length < 3) break;
    }
    if (distractors.length < 3) distractors = ["to have", "to be", "to do"];
    const options = shuffleArray([correctAnswer, ...distractors]);
    return { question: correctVerb.infinitive, correct: correctAnswer, options };
  };

  useEffect(() => {
    const q = generateQuestion();
    setQuiz({ current: q, options: q.options, answered: false, score: 0, feedback: "" });
  }, []);

  const handleAnswer = (selected) => {
    if (quiz.answered) return;
    const isCorrect = selected === quiz.current.correct;
    setQuiz(prev => ({
      ...prev,
      answered: true,
      score: prev.score + (isCorrect ? 1 : 0),
      feedback: isCorrect ? "✅ Correct!" : `❌ Wrong! The correct answer is: ${prev.current.correct}`
    }));
  };

  const nextQuestion = () => {
    const newQ = generateQuestion();
    setQuiz(prev => ({ ...prev, current: newQ, options: newQ.options, answered: false, feedback: "" }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">📝 Verb Quiz</h2>
          <p className="text-center text-gray-600 mb-6">What is the English meaning of the German verb?</p>
          {quiz.current && (
            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-xl p-6 shadow text-center">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-2xl font-bold text-purple-700">{quiz.current.question}</p>
                  <PronounceButton word={quiz.current.question} />
                </div>
                <div className="grid grid-cols-1 gap-3 mt-6">
                  {quiz.options.map((opt, idx) => (
                    <button key={idx} onClick={() => handleAnswer(opt)} disabled={quiz.answered} className="bg-gray-100 hover:bg-purple-100 p-3 rounded-xl transition">{opt}</button>
                  ))}
                </div>
                {quiz.feedback && (
                  <div className="mt-4 p-2 rounded bg-gray-100">
                    <p className="font-semibold">{quiz.feedback}</p>
                    <p className="text-sm text-gray-600">Score: {quiz.score}</p>
                  </div>
                )}
                <button onClick={nextQuestion} className="mt-6 bg-green-500 text-white px-6 py-2 rounded-full shadow hover:bg-green-600 transition">Next Question →</button>
              </div>
            </div>
          )}
        </div>
    </div>
  );
};

export default VerbsQuizPage;