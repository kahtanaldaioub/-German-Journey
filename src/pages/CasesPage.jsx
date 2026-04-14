import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';
import { casesData } from '../data/cases';

const CasesPage = () => {
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');
  const [quizCase, setQuizCase] = useState(null);

  const generateQuiz = () => {
    const allExamples = casesData.flatMap(c => 
      c.examples.map(ex => ({ sentence: ex.german, case: c.name }))
    );
    const random = allExamples[Math.floor(Math.random() * allExamples.length)];
    setQuizCase(random);
    setQuizAnswer('');
    setQuizFeedback('');
  };

  const checkQuizAnswer = () => {
    if (!quizCase) return;
    if (quizAnswer.toLowerCase() === quizCase.case.toLowerCase()) {
      setQuizFeedback('✅ Correct! Well done.');
    } else {
      setQuizFeedback(`❌ Wrong! The sentence "${quizCase.sentence}" is in the ${quizCase.case} case.`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">📚 Grammar Deep‑Dive: The Four Cases</h2>
          <p className="text-center text-gray-600 mb-6">Nominative • Accusative • Dative • Genitive</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {casesData.map(c => (
              <div key={c.name} className={`bg-white rounded-xl p-4 shadow border-t-4 border-${c.color}-500`}>
                <h3 className="text-xl font-bold text-purple-700">{c.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{c.usage}</p>
                
                <table className="w-full mt-3 text-sm border-collapse">
                  <thead><tr className="border-b"><th className="text-left">Gender</th><th>Article</th></tr></thead>
                  <tbody>
                    <tr><td className="py-1">der (masc)</td><td className="font-mono font-bold">{c.articles.der}</td></tr>
                    <tr><td className="py-1">die (fem)</td><td className="font-mono font-bold">{c.articles.die}</td></tr>
                    <tr><td className="py-1">das (neut)</td><td className="font-mono font-bold">{c.articles.das}</td></tr>
                    <tr><td className="py-1">plural</td><td className="font-mono font-bold">{c.articles.plural}</td></tr>
                  </tbody>
                </table>
                
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-500">📖 Examples (click speaker to hear full sentence):</p>
                  {c.examples.map((ex, idx) => (
                    <div key={idx} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                      <span>
                        <strong>{ex.german}</strong> – <em>{ex.english}</em>
                      </span>
                      <PronounceButton word={ex.german} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mini Quiz Section */}
          <div className="mt-10 p-5 bg-linear-to-r from-indigo-50 to-purple-50 rounded-xl">
            <h3 className="text-xl font-bold text-center mb-3">🧠 Test Yourself: Identify the Case</h3>
            {!quizCase ? (
              <div className="text-center">
                <button onClick={generateQuiz} className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
                  Start a Quiz
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg font-semibold mb-3">“{quizCase.sentence}”</p>
                <div className="flex justify-center gap-3 flex-wrap">
                  {casesData.map(c => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setQuizAnswer(c.name);
                        setQuizFeedback('');
                      }}
                      className={`px-4 py-2 rounded-full transition ${
                        quizAnswer === c.name ? 'bg-purple-600 text-white' : 'bg-gray-200 hover:bg-purple-100'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={checkQuizAnswer}
                  disabled={!quizAnswer}
                  className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition disabled:opacity-50"
                >
                  Check Answer
                </button>
                {quizFeedback && <p className="mt-3 text-sm font-medium">{quizFeedback}</p>}
                <button onClick={generateQuiz} className="mt-4 text-sm text-purple-600 underline">
                  New Sentence →
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 p-3 bg-blue-50 rounded-xl text-sm">
            💡 <strong>Tip:</strong> The genitive is often replaced by "von" + dative in everyday speech. Two‑way prepositions (an, auf, hinter, in, neben, über, unter, vor, zwischen) take accusative (movement) or dative (location).
          </div>
        </div>
    </div>
  );
};

export default CasesPage;