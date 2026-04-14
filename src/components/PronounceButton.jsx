import React from 'react';

const speakGerman = (text) => {
  if (!window.speechSynthesis) {
    alert("Sorry, your browser does not support speech synthesis.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

const PronounceButton = ({ word }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      speakGerman(word);
    }}
    className="ml-2 text-gray-500 hover:text-purple-600 focus:outline-none transition transform hover:scale-110"
    aria-label={`Pronounce ${word}`}
    title="Hear pronunciation"
  >
    🔊
  </button>
);

export default PronounceButton;