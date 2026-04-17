import React, { useState } from 'react';
import PronounceButton from '../components/PronounceButton';

const TimePage = () => {
  const [quizTime, setQuizTime] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');

  // Generate a random time for the quiz
  const generateQuiz = () => {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = Math.floor(Math.random() * 60);
    setQuizTime({ hour, minute });
    setQuizAnswer('');
    setQuizFeedback('');
  };

  const checkAnswer = () => {
    if (!quizTime) return;
    const { hour, minute } = quizTime;
    let correct = '';
    if (minute === 0) correct = `Es ist ${hour} Uhr.`;
    else if (minute === 15) correct = `Es ist Viertel nach ${hour}.`;
    else if (minute === 30) correct = `Es ist halb ${hour + 1}.`;
    else if (minute === 45) correct = `Es ist Viertel vor ${hour + 1}.`;
    else if (minute < 30) correct = `Es ist ${minute} Minuten nach ${hour}.`;
    else correct = `Es ist ${60 - minute} Minuten vor ${hour + 1}.`;
    
    const user = quizAnswer.trim().toLowerCase();
    const normalizedCorrect = correct.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normalizedUser = user.replace(/[^a-z0-9]/g, '');
    
    if (normalizedUser === normalizedCorrect) {
      setQuizFeedback('✅ Correct! Well done.');
    } else {
      setQuizFeedback(`❌ Correct answer: ${correct}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">⏰ German Time (Uhrzeit)</h2>
          <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
            Learn how to tell the time – both official and everyday speech.
          </p>

          {/* Basic structure */}
          <div className="bg-white rounded-xl p-5 shadow-md mb-6">
            <h3 className="text-xl font-bold text-purple-700 mb-3">📌 The Basics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span><strong>Wie spät ist es?</strong> – What time is it?</span>
                <PronounceButton word="Wie spät ist es?" />
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span><strong>Es ist ... Uhr.</strong> – It's ... o'clock.</span>
                <PronounceButton word="Es ist drei Uhr." />
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-xl p-5 shadow-md mb-6">
            <h3 className="text-xl font-bold text-purple-700 mb-3">🕐 Full Hours</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(h => (
                <div key={h} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                  <span>{h} Uhr</span>
                  <PronounceButton word={`${h} Uhr`} />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">Note: 24‑hour format is used in official contexts (e.g., 14 Uhr = 2 PM).</p>
          </div>

          {/* Minutes – colloquial */}
          <div className="bg-white rounded-xl p-5 shadow-md mb-6">
            <h3 className="text-xl font-bold text-purple-700 mb-3">⏱️ Colloquial Minutes</h3>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-3 rounded">
                <p className="font-semibold">After the hour (nach) – up to 29 minutes</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex justify-between items-center"><span>viertel nach 7</span><PronounceButton word="viertel nach sieben" /></div>
                  <div className="flex justify-between items-center"><span>20 nach 8</span><PronounceButton word="zwanzig nach acht" /></div>
                </div>
              </div>
              <div className="bg-yellow-50 p-3 rounded">
                <p className="font-semibold">Before the hour (vor) – from 31 minutes</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex justify-between items-center"><span>viertel vor 6</span><PronounceButton word="viertel vor sechs" /></div>
                  <div className="flex justify-between items-center"><span>zehn vor 10</span><PronounceButton word="zehn vor zehn" /></div>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="font-semibold">Half hour (halb) – half past, but <strong>halb</strong> means "half TO the next hour"</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex justify-between items-center"><span>halb 3 = 2:30</span><PronounceButton word="halb drei" /></div>
                  <div className="flex justify-between items-center"><span>halb 8 = 7:30</span><PronounceButton word="halb acht" /></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">⚠️ Important: "Halb drei" is 2:30, not 3:30.</p>
              </div>
            </div>
          </div>

          {/* Digital / official format */}
          <div className="bg-white rounded-xl p-5 shadow-md mb-6">
            <h3 className="text-xl font-bold text-purple-700 mb-3">🔢 Official / Digital Time</h3>
            <p className="text-sm mb-2">Used on timetables, announcements, and formal writing:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['14:00', '14:15', '14:30', '14:45', '15:05'].map(t => (
                <div key={t} className="bg-gray-50 p-2 rounded flex justify-between items-center">
                  <span>{t} Uhr</span>
                </div>
              ))}
            </div>
            <p className="text-sm mt-2">Read as: <em>vierzehn Uhr fünfzehn</em> (2:15 PM).</p>
          </div>

          {/* Prepositions of time */}
          <div className="bg-white rounded-xl p-5 shadow-md mb-6">
            <h3 className="text-xl font-bold text-purple-700 mb-3">📍 Prepositions with Time</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center"><span><strong>um</strong> (at) – um 8 Uhr</span><PronounceButton word="um acht Uhr" /></div>
              <div className="flex justify-between items-center"><span><strong>vor</strong> (before) – vor einer Stunde</span><PronounceButton word="vor einer Stunde" /></div>
              <div className="flex justify-between items-center"><span><strong>nach</strong> (after) – nach 10 Minuten</span><PronounceButton word="nach zehn Minuten" /></div>
              <div className="flex justify-between items-center"><span><strong>bis</strong> (until) – bis morgen</span><PronounceButton word="bis morgen" /></div>
              <div className="flex justify-between items-center"><span><strong>ab</strong> (from) – ab 18 Uhr</span><PronounceButton word="ab achtzehn Uhr" /></div>
            </div>
          </div>

          {/* Quiz */}
          <div className="mt-8 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
  <h3 className="text-xl font-bold text-center mb-3">🎯 Practice: Tell the Time</h3>
  {!quizTime ? (
    <div className="text-center">
      <button onClick={generateQuiz} className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
        Generate Random Time
      </button>
    </div>
  ) : (
    <div className="text-center">
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <p className="text-lg font-semibold">
          {quizTime.hour}:{quizTime.minute.toString().padStart(2,'0')}
        </p>
        <p className="text-sm text-gray-500">How would you say this in German?</p>
      </div>
      <button
        onClick={() => {
          const { hour, minute } = quizTime;
          let correct = '';
          if (minute === 0) correct = `Es ist ${hour} Uhr.`;
          else if (minute === 15) correct = `Es ist Viertel nach ${hour}.`;
          else if (minute === 30) correct = `Es ist halb ${hour + 1}.`;
          else if (minute === 45) correct = `Es ist Viertel vor ${hour + 1}.`;
          else if (minute < 30) correct = `Es ist ${minute} Minuten nach ${hour}.`;
          else correct = `Es ist ${60 - minute} Minuten vor ${hour + 1}.`;
          setQuizFeedback(correct);
        }}
        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition shadow"
      >
        Show Answer
      </button>
      {quizFeedback && (
        <div className="mt-4 p-3 bg-white rounded-xl shadow-sm">
          <p className="text-md font-medium">Correct expression:</p>
          <p className="text-lg text-purple-700 font-semibold">{quizFeedback}</p>
          <PronounceButton word={quizFeedback} />
        </div>
      )}
      <button onClick={generateQuiz} className="mt-4 text-sm text-purple-600 underline">
        New Time →
      </button>
    </div>
  )}
</div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm">
            💡 <strong>Tip:</strong> The 24‑hour system is used in official contexts. In casual conversation, the 12‑hour system is more common, and you add <em>morgens, nachmittags, abends</em> if needed.
          </div>
        </div>
    </div>
  );
};

export default TimePage;