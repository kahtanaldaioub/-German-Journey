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

  // Map case name to a static color class
  const getBorderColor = (caseName) => {
    switch(caseName) {
      case 'Nominative': return 'border-blue-500';
      case 'Accusative': return 'border-green-500';
      case 'Dative': return 'border-orange-500';
      case 'Genitive': return 'border-purple-500';
      default: return 'border-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">📚 The Four German Cases</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Nominative • Accusative • Dative • Genitive – with article tables and examples.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {casesData.map(c => (
            <div key={c.name} className={`bg-white rounded-xl p-4 shadow border-l-8 ${getBorderColor(c.name)}`}>
              <h3 className="text-xl font-bold text-purple-700">{c.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{c.usage}</p>
              
              {/* Article table with pronunciation */}
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="p-2 text-left">Gender</th>
                      <th className="p-2 text-left">Article</th>
                      <th className="p-2">Listen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "der (masc)", key: "der" },
                      { label: "die (fem)", key: "die" },
                      { label: "das (neut)", key: "das" },
                      { label: "plural", key: "plural" }
                    ].map(g => (
                      <tr key={g.key} className="border-b">
                        <td className="p-2">{g.label}</td>
                        <td className="p-2 font-mono font-bold">{c.articles[g.key]}</td>
                        <td className="p-2 text-center">
                          <PronounceButton word={c.articles[g.key]} />
                        </td>
                       </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Examples */}
              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-500 mb-2">📖 Examples:</p>
                <div className="space-y-2">
                  {c.examples.map((ex, idx) => (
                    <div key={idx} className="bg-gray-50 p-2 rounded flex justify-between items-center gap-2">
                      <div>
                        <p className="text-sm font-medium">{ex.german}</p>
                        <p className="text-xs text-gray-500">→ {ex.english}</p>
                      </div>
                      <PronounceButton word={ex.german} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mini Quiz Section */}
        <div className="mt-10 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
          <h3 className="text-xl font-bold text-center mb-3">🧠 Test Yourself: Identify the Case</h3>
          {!quizCase ? (
            <div className="text-center">
              <button onClick={generateQuiz} className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition shadow">
                Start a Quiz
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                <p className="text-lg font-semibold">“{quizCase.sentence}”</p>
              </div>
              <div className="flex justify-center gap-3 flex-wrap">
                {casesData.map(c => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setQuizAnswer(c.name);
                      setQuizFeedback('');
                    }}
                    className={`px-4 py-2 rounded-full transition ${
                      quizAnswer === c.name ? 'bg-purple-600 text-white shadow' : 'bg-gray-200 hover:bg-purple-100'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
              <button
                onClick={checkQuizAnswer}
                disabled={!quizAnswer}
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition disabled:opacity-50 shadow"
              >
                Check Answer
              </button>
              {quizFeedback && (
                <p className="mt-3 text-sm font-medium p-2 bg-white rounded shadow-sm">{quizFeedback}</p>
              )}
              <button onClick={generateQuiz} className="mt-4 text-sm text-purple-600 underline">
                New Sentence →
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm">
          💡 <strong>Tip:</strong> The genitive is often replaced by "von" + dative in everyday speech. Two‑way prepositions (an, auf, hinter, in, neben, über, unter, vor, zwischen) take accusative (movement) or dative (location).
        </div>
      </div>
    </div>
  );
};

export default CasesPage;