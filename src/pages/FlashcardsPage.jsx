import React, { useState, useMemo } from 'react';
import PronounceButton from '../components/PronounceButton';
import { nouns } from '../data/nouns';
import { verbs } from '../data/verbs';
import { chunks } from '../data/chunks';

const FlashcardsPage = () => {
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deckType, setDeckType] = useState('all');
  const [direction, setDirection] = useState('germanToEnglish'); // 'germanToEnglish' or 'englishToGerman'

  const filteredFlashcards = useMemo(() => {
    // Helper to create card objects with original data
    const createCards = (items, type, getFrontGerman, getEnglish, getArticle = null) => {
      return items.map(item => {
        const germanText = getArticle ? `${getArticle(item)} ${item.german}` : item.german;
        const englishText = getEnglish(item);
        return {
          german: germanText,
          english: englishText,
          type,
          // Depending on direction, front/back are assigned dynamically later
        };
      });
    };

    let cards = [];
    if (deckType === 'verbs') {
      cards = verbs.map(v => ({ german: v.infinitive, english: v.english, type: 'verb' }));
    } else if (deckType === 'nouns') {
      cards = nouns.map(n => ({ german: `${n.article} ${n.german}`, english: n.english, type: 'noun' }));
    } else if (deckType === 'chunks') {
      cards = chunks.map(c => ({ german: c.german, english: c.english, type: 'chunk' }));
    } else {
      const nounCards = nouns.map(n => ({ german: `${n.article} ${n.german}`, english: n.english, type: 'noun' }));
      const verbCards = verbs.map(v => ({ german: v.infinitive, english: v.english, type: 'verb' }));
      const chunkCards = chunks.map(c => ({ german: c.german, english: c.english, type: 'chunk' }));
      cards = [...nounCards, ...verbCards, ...chunkCards];
    }

    // Map to front/back based on direction
    return cards.map(card => ({
      ...card,
      front: direction === 'germanToEnglish' ? card.german : card.english,
      back: direction === 'germanToEnglish' ? card.english : card.german,
    }));
  }, [deckType, direction]);

  const handleDeckChange = (type) => {
    setDeckType(type);
    setFlashcardIndex(0);
    setIsFlipped(false);
  };

  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection);
    setIsFlipped(false); // Reset flip when direction changes
    // Keep same index – card content will update automatically
  };

  const nextFlashcard = () => {
    setFlashcardIndex((prev) => (prev + 1) % filteredFlashcards.length);
    setIsFlipped(false);
  };
  const prevFlashcard = () => {
    setFlashcardIndex((prev) => (prev - 1 + filteredFlashcards.length) % filteredFlashcards.length);
    setIsFlipped(false);
  };
  const randomFlashcard = () => {
    const randomIndex = Math.floor(Math.random() * filteredFlashcards.length);
    setFlashcardIndex(randomIndex);
    setIsFlipped(false);
  };

  const currentCard = filteredFlashcards[flashcardIndex];
  // Determine which language is on front/back for display labels and pronunciation button
  const isGermanFront = direction === 'germanToEnglish';
  const frontLang = isGermanFront ? 'German' : 'English';
  const backLang = isGermanFront ? 'English' : 'German';
  const frontFlag = isGermanFront ? '🇩🇪' : '';
  const backFlag = isGermanFront ? '' : '🇩🇪';
  const germanWord = currentCard?.german; // Always available for pronunciation

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-2">📇 Interactive Flashcards</h2>
        <p className="text-center text-gray-600 mb-6">
          Tap to flip • {filteredFlashcards.length} cards
        </p>

        {/* Deck selection buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button
            onClick={() => handleDeckChange('all')}
            className={`px-5 py-2 rounded-full font-medium transition ${
              deckType === 'all'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-purple-100'
            }`}
          >
            All ({verbs.length + nouns.length + chunks.length})
          </button>
          <button
            onClick={() => handleDeckChange('verbs')}
            className={`px-5 py-2 rounded-full font-medium transition ${
              deckType === 'verbs'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-purple-100'
            }`}
          >
            Verbs ({verbs.length})
          </button>
          <button
            onClick={() => handleDeckChange('nouns')}
            className={`px-5 py-2 rounded-full font-medium transition ${
              deckType === 'nouns'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-purple-100'
            }`}
          >
            Nouns ({nouns.length})
          </button>
          <button
            onClick={() => handleDeckChange('chunks')}
            className={`px-5 py-2 rounded-full font-medium transition ${
              deckType === 'chunks'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-purple-100'
            }`}
          >
            Phrases ({chunks.length})
          </button>
        </div>

        {/* Direction toggle buttons */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => handleDirectionChange('germanToEnglish')}
            className={`px-5 py-2 rounded-full font-medium transition ${
              direction === 'germanToEnglish'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-green-100'
            }`}
          >
             German 
          </button>
          <button
            onClick={() => handleDirectionChange('englishToGerman')}
            className={`px-5 py-2 rounded-full font-medium transition ${
              direction === 'englishToGerman'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-green-100'
            }`}
          >
             English 
          </button>
        </div>

        <div className="flex flex-col items-center">
          {/* Flashcard */}
          <div
            className="w-full max-w-md h-80 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-xl flex flex-col justify-center items-center p-6 cursor-pointer transition-transform hover:scale-105"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="text-center">
              {!isFlipped ? (
                <>
                  <p className="text-sm text-purple-600 mb-2">
                    {frontFlag} {frontLang}
                  </p>
                  <p className="text-2xl font-bold text-gray-800">{currentCard?.front}</p>
                  {/* Show pronounce button only if front side is German */}
                  {isGermanFront && <PronounceButton word={currentCard?.german} />}
                </>
              ) : (
                <>
                  <p className="text-sm text-green-600 mb-2">
                    {backFlag} {backLang}
                  </p>
                  <p className="text-2xl font-bold text-gray-800">{currentCard?.back}</p>
                  {/* Show pronounce button if back side is German */}
                  {!isGermanFront && <PronounceButton word={currentCard?.german} />}
                </>
              )}
            </div>
          </div>

          {/* Navigation buttons (professional style) */}
          <div className="flex gap-3 mt-8 flex-wrap justify-center">
            <button 
              onClick={prevFlashcard} 
              className="group flex items-center gap-2 bg-white border-2 border-purple-200 text-purple-700 px-5 py-2.5 rounded-full font-semibold shadow-sm hover:shadow-md hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 active:scale-95"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <button 
              onClick={randomFlashcard} 
              className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Shuffle
            </button>
            
            <button 
              onClick={nextFlashcard} 
              className="group flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:bg-purple-700 transition-all duration-200 active:scale-95"
            >
              Next
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Card {flashcardIndex + 1} of {filteredFlashcards.length}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            💡 Tip: Click on the card to flip. Use the direction buttons to practice both ways.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsPage;