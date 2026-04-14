import React, { useState, useEffect } from 'react';
import PronounceButton from '../components/PronounceButton';
import { nouns } from '../data/nouns';

const ArticleQuizPage = () => {
  const [quiz, setQuiz] = useState({ current: null, options: [], answered: false, score: 0, feedback: "" });

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const generateQuestion = () => {
    const correctNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const correctArticle = correctNoun.article;
    const questionWord = correctNoun.german;
    const englishMeaning = correctNoun.english;
    
  
    const allArticles = ["der", "die", "das"];
    let distractors = allArticles.filter(a => a !== correctArticle);
    const options = shuffleArray([correctArticle, ...distractors]);
    
    return { 
      question: questionWord,
      english: englishMeaning,
      correct: correctArticle, 
      options,
      fullAnswer: `${correctArticle} ${questionWord}`
    };
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
      feedback: isCorrect 
        ? `✅ Correct! ${quiz.current.correct} ${quiz.current.question} means "${quiz.current.english}".` 
        : `❌ Wrong! The correct article is "${quiz.current.correct}" for ${quiz.current.question} (${quiz.current.english}).`
    }));
  };

  const nextQuestion = () => {
    const newQ = generateQuestion();
    setQuiz(prev => ({ 
      ...prev, 
      current: newQ, 
      options: newQ.options, 
      answered: false, 
      feedback: "" 
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">🎯 German Article Quiz</h2>
          <p className="text-center text-gray-600 mb-6">
            Choose the correct article (der, die, das) for each noun.
          </p>
          {quiz.current && (
            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-xl p-6 shadow text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <p className="text-3xl font-bold text-purple-700">{quiz.current.question}</p>
                  <PronounceButton word={quiz.current.question} />
                </div>
                <p className="text-gray-500 mb-4">({quiz.current.english})</p>
                
                <div className="grid grid-cols-1 gap-3 mt-4">
                  {quiz.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt)}
                      disabled={quiz.answered}
                      className={`p-3 rounded-xl transition text-lg font-semibold ${
                        quiz.answered && opt === quiz.current.correct
                          ? 'bg-green-500 text-white'
                          : quiz.answered && opt !== quiz.current.correct
                          ? 'bg-red-100 text-gray-500 line-through'
                          : 'bg-gray-100 hover:bg-purple-100 text-gray-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {quiz.feedback && (
                  <div className="mt-4 p-3 rounded bg-gray-100">
                    <p className="font-semibold">{quiz.feedback}</p>
                    <p className="text-sm text-gray-600 mt-1">Score: {quiz.score}</p>
                  </div>
                )}
                <button
                  onClick={nextQuestion}
                  className="mt-6 bg-green-500 text-white px-6 py-2 rounded-full shadow hover:bg-green-600 transition"
                >
                  Next Question →
                </button>
              </div>
            </div>
          )}
          <div className="mt-6 text-center text-sm text-gray-500">
            💡 Tip: The article shows the noun's gender – der (masculine), die (feminine), das (neuter). Learn the article with the noun!
          </div>
        </div>
    </div>
  );
};

export default ArticleQuizPage;