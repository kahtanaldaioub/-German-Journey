import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const AdjectivesPage = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentAdjective, setCurrentAdjective] = useState(null);
  const [selectedOpposite, setSelectedOpposite] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  const adjectivePairs = [
    { 
      adj: "groß", meaning: "big", opposite: "klein", oppositeMeaning: "small", 
      example: "Das Haus ist groß.", exampleEn: "The house is big.",
      exampleOpposite: "Das Haus ist klein.", exampleOppositeEn: "The house is small."
    },
    { 
      adj: "schnell", meaning: "fast", opposite: "langsam", oppositeMeaning: "slow", 
      example: "Der Zug ist schnell.", exampleEn: "The train is fast.",
      exampleOpposite: "Der Zug ist langsam.", exampleOppositeEn: "The train is slow."
    },
    { 
      adj: "heiß", meaning: "hot", opposite: "kalt", oppositeMeaning: "cold", 
      example: "Die Suppe ist heiß.", exampleEn: "The soup is hot.",
      exampleOpposite: "Die Suppe ist kalt.", exampleOppositeEn: "The soup is cold."
    },
    { 
      adj: "neu", meaning: "new", opposite: "alt", oppositeMeaning: "old", 
      example: "Das Auto ist neu.", exampleEn: "The car is new.",
      exampleOpposite: "Das Auto ist alt.", exampleOppositeEn: "The car is old."
    },
    { 
      adj: "teuer", meaning: "expensive", opposite: "billig", oppositeMeaning: "cheap", 
      example: "Die Uhr ist teuer.", exampleEn: "The watch is expensive.",
      exampleOpposite: "Die Uhr ist billig.", exampleOppositeEn: "The watch is cheap."
    },
    { 
      adj: "gut", meaning: "good", opposite: "schlecht", oppositeMeaning: "bad", 
      example: "Das Essen ist gut.", exampleEn: "The food is good.",
      exampleOpposite: "Das Essen ist schlecht.", exampleOppositeEn: "The food is bad."
    },
    { 
      adj: "glücklich", meaning: "happy", opposite: "traurig", oppositeMeaning: "sad", 
      example: "Sie ist glücklich.", exampleEn: "She is happy.",
      exampleOpposite: "Sie ist traurig.", exampleOppositeEn: "She is sad."
    },
    { 
      adj: "reich", meaning: "rich", opposite: "arm", oppositeMeaning: "poor", 
      example: "Er ist reich.", exampleEn: "He is rich.",
      exampleOpposite: "Er ist arm.", exampleOppositeEn: "He is poor."
    },
    { 
      adj: "jung", meaning: "young", opposite: "alt", oppositeMeaning: "old (age)", 
      example: "Das Kind ist jung.", exampleEn: "The child is young.",
      exampleOpposite: "Der Mann ist alt.", exampleOppositeEn: "The man is old."
    },
    { 
      adj: "dick", meaning: "thick/fat", opposite: "dünn", oppositeMeaning: "thin", 
      example: "Das Buch ist dick.", exampleEn: "The book is thick.",
      exampleOpposite: "Das Heft ist dünn.", exampleOppositeEn: "The notebook is thin."
    },
    { 
      adj: "hell", meaning: "bright/light", opposite: "dunkel", oppositeMeaning: "dark", 
      example: "Der Raum ist hell.", exampleEn: "The room is bright.",
      exampleOpposite: "Der Keller ist dunkel.", exampleOppositeEn: "The basement is dark."
    },
    { 
      adj: "laut", meaning: "loud", opposite: "leise", oppositeMeaning: "quiet", 
      example: "Die Musik ist laut.", exampleEn: "The music is loud.",
      exampleOpposite: "Die Musik ist leise.", exampleOppositeEn: "The music is quiet."
    },
    { 
      adj: "sicher", meaning: "safe/certain", opposite: "unsicher", oppositeMeaning: "unsafe/uncertain", 
      example: "Der Ort ist sicher.", exampleEn: "The place is safe.",
      exampleOpposite: "Die Brücke ist unsicher.", exampleOppositeEn: "The bridge is unsafe."
    },
    { 
      adj: "interessant", meaning: "interesting", opposite: "langweilig", oppositeMeaning: "boring", 
      example: "Der Film ist interessant.", exampleEn: "The movie is interesting.",
      exampleOpposite: "Der Vortrag war langweilig.", exampleOppositeEn: "The lecture was boring."
    },
    { 
      adj: "schwer", meaning: "heavy/difficult", opposite: "leicht", oppositeMeaning: "light/easy", 
      example: "Die Tasche ist schwer.", exampleEn: "The bag is heavy.",
      exampleOpposite: "Die Aufgabe ist leicht.", exampleOppositeEn: "The task is easy."
    }
  ];

  const startQuiz = () => {
    const random = adjectivePairs[Math.floor(Math.random() * adjectivePairs.length)];
    setCurrentAdjective(random);
    setSelectedOpposite('');
    setQuizFeedback('');
    setQuizMode(true);
  };

  const checkOpposite = () => {
    if (!currentAdjective) return;
    if (selectedOpposite === currentAdjective.opposite) {
      setQuizFeedback('✅ Correct! Well done.');
    } else {
      setQuizFeedback(`❌ Wrong! The opposite of "${currentAdjective.adj}" (${currentAdjective.meaning}) is "${currentAdjective.opposite}" (${currentAdjective.oppositeMeaning}).`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">📝 German Adjectives & Opposites</h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Learn common adjectives and their opposites with examples and audio.
        </p>

        {/* Grid of adjective pairs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {adjectivePairs.map((pair, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-purple-700">{pair.adj}</span>
                  <PronounceButton word={pair.adj} />
                  <span className="text-gray-500 text-sm">– {pair.meaning}</span>
                </div>
                <span className="text-gray-400">↔️</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-green-600">{pair.opposite}</span>
                  <PronounceButton word={pair.opposite} />
                  <span className="text-gray-500 text-sm">– {pair.oppositeMeaning}</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600 flex justify-between items-center">
                <div>
                  <span>{pair.example}</span>
                  <span className="text-gray-400 ml-2">→ {pair.exampleEn}</span>
                </div>
                <PronounceButton word={pair.example} />
              </div>
              <div className="text-sm text-gray-600 flex justify-between items-center mt-1">
                <div>
                  <span>{pair.exampleOpposite}</span>
                  <span className="text-gray-400 ml-2">→ {pair.exampleOppositeEn}</span>
                </div>
                <PronounceButton word={pair.exampleOpposite} />
              </div>
            </div>
          ))}
        </div>

        {/* Quiz Section */}
        <div className="mt-8 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
          <h3 className="text-xl font-bold text-center mb-3">🎯 Quiz: Find the Opposite</h3>
          {!quizMode ? (
            <div className="text-center">
              <button onClick={startQuiz} className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition shadow">
                Start Quiz
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                <p className="text-lg font-semibold">What is the opposite of:</p>
                <p className="text-2xl font-bold text-purple-700 mt-2">{currentAdjective.adj} ({currentAdjective.meaning})</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {adjectivePairs
                  .filter(p => p.adj !== currentAdjective.adj)
                  .slice(0, 3)
                  .map(p => p.opposite)
                  .concat([currentAdjective.opposite])
                  .sort()
                  .map(opp => (
                    <button
                      key={opp}
                      onClick={() => setSelectedOpposite(opp)}
                      className={`p-2 rounded-lg transition ${
                        selectedOpposite === opp
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 hover:bg-purple-100'
                      }`}
                    >
                      {opp}
                    </button>
                  ))}
              </div>
              <button
                onClick={checkOpposite}
                disabled={!selectedOpposite}
                className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition shadow disabled:opacity-50"
              >
                Check Answer
              </button>
              {quizFeedback && <p className="mt-3 text-sm font-medium p-2 bg-white rounded shadow-sm">{quizFeedback}</p>}
              <button onClick={startQuiz} className="mt-4 text-sm text-purple-600 underline">
                New Word →
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm">
          💡 <strong>Tip:</strong> Many German adjectives form opposites by adding the prefix <strong>"un-"</strong> (e.g., interessant → uninteressant, sicher → unsicher). Others are completely different words.
        </div>
      </div>
    </div>
  );
};

export default AdjectivesPage;