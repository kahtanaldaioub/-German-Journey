import PronounceButton from '../components/PronounceButton';

import { alphabet } from '../data/alphabet';

const AlphabetPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">🔤 German Alphabet</h2>
          <p className="text-center text-gray-600 mb-6">Learn the names of each letter – click the speaker to hear the correct pronunciation</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {alphabet.map((letterObj) => (
              <div key={letterObj.letter} className="bg-white p-3 rounded-xl shadow flex items-center justify-between hover:bg-gray-50 transition">
                <div>
                  <span className="text-xl font-bold text-purple-700">{letterObj.letter}</span>
                  <span className="text-gray-500 text-sm ml-2">– {letterObj.name}</span>
                </div>
                <PronounceButton word={letterObj.name} />
              </div>
            ))}
          </div>
          <div className="text-center mt-6 text-sm font-semibold text-green-700">✅ 30 letters including Umlauts (Ä, Ö, Ü) and Eszett (ß)</div>
        </div>
    </div>
  );
};

export default AlphabetPage;