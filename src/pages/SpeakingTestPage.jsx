import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PronounceButton from '../components/PronounceButton';

const sampleSentences = [
  { german: "Guten Morgen!", english: "Good morning!" },
  { german: "Wie geht es dir?", english: "How are you?" },
  { german: "Ich heiße Anna.", english: "My name is Anna." },
  { german: "Wo ist der Bahnhof?", english: "Where is the train station?" },
  { german: "Ich möchte einen Kaffee.", english: "I would like a coffee." },
  { german: "Das Wetter ist schön.", english: "The weather is nice." },
  { german: "Kannst du mir helfen?", english: "Can you help me?" },
  { german: "Prost!", english: "Cheers!" },
  { german: "Auf Wiedersehen!", english: "Goodbye!" },
  { german: "Ich liebe Deutsch.", english: "I love German." },
];

const computeSimilarity = (reference, recognized) => {
  if (!recognized) return 0;
  const refWords = reference.toLowerCase().split(/\s+/);
  const recWords = recognized.toLowerCase().split(/\s+/);
  let correctWords = 0;
  for (let i = 0; i < Math.min(refWords.length, recWords.length); i++) {
    if (refWords[i] === recWords[i]) correctWords++;
  }
  let partialMatches = 0;
  for (let recWord of recWords) {
    if (refWords.includes(recWord)) partialMatches++;
  }
  const partialScore = partialMatches / refWords.length;
  const exactScore = correctWords / refWords.length;
  const finalScore = Math.round((exactScore * 0.7 + partialScore * 0.3) * 100);
  return Math.min(finalScore, 100);
};

const getFeedback = (score) => {
  if (score >= 90) return "Perfect! Excellent pronunciation! 🎉";
  if (score >= 70) return "Very good! Small improvements needed. 👍";
  if (score >= 50) return "Good effort! Keep practicing. 💪";
  if (score >= 30) return "Not bad, but try to listen carefully and repeat. 🎧";
  return "Let's try again. Listen to the pronunciation and record once more. 🔁";
};

const SpeakingTestPage = () => {
  const [sentences] = useState(sampleSentences);
  const [selectedSentence, setSelectedSentence] = useState(sampleSentences[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [micPermission, setMicPermission] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);
  
  const recognitionRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognitionSupported(false);
    }
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
      if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach(track => track.stop());
      if (audioContextRef.current) audioContextRef.current.close();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);
  
  // Request microphone permission on user gesture
  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Keep stream open for level meter
      mediaStreamRef.current = stream;
      setMicPermission(true);
      setErrorMsg('');
      
      // Setup audio level meter
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      sourceRef.current.connect(analyserRef.current);
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      
      const updateLevel = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        let avg = sum / dataArray.length;
        let level = Math.min(100, (avg / 255) * 100);
        setAudioLevel(level);
        animationFrameRef.current = requestAnimationFrame(updateLevel);
      };
      
      await audioContextRef.current.resume();
      updateLevel();
      
    } catch (err) {
      console.error(err);
      setMicPermission(false);
      setErrorMsg('Microphone access denied. Please allow microphone in your browser settings.');
    }
  };
  
  const startRecording = async () => {
    setScore(null);
    setRecordedText('');
    setFeedback('');
    setErrorMsg('');
    
    // Ensure we have mic permission and audio context is running
    if (!mediaStreamRef.current || !audioContextRef.current) {
      await requestMicPermission();
    }
    
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = 'de-DE';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;
      
      recognition.onstart = () => {
        setIsRecording(true);
        setErrorMsg('');
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setRecordedText(transcript);
        const similarity = computeSimilarity(selectedSentence.german, transcript);
        setScore(similarity);
        setFeedback(getFeedback(similarity));
        stopRecording();
      };
      
      recognition.onerror = (event) => {
        console.error('Recognition error:', event.error);
        let userMsg = '';
        switch (event.error) {
          case 'no-speech':
            userMsg = 'No speech detected. Make sure your microphone is on and speak clearly. Tap the microphone button again.';
            break;
          case 'audio-capture':
            userMsg = 'No microphone found. Please check your device settings.';
            break;
          case 'not-allowed':
            userMsg = 'Microphone access denied. Please tap the microphone icon in the browser bar to allow access.';
            break;
          case 'network':
            userMsg = 'Network error. Please check your internet connection.';
            break;
          default:
            userMsg = `Error: ${event.error}. Please try again.`;
        }
        setErrorMsg(userMsg);
        stopRecording();
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognition.start();
      
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not start recognition. Please try again.');
      setIsRecording(false);
    }
  };
  
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };
  
  const handleSentenceChange = (e) => {
    const newSentence = sentences.find(s => s.german === e.target.value);
    if (newSentence) {
      setSelectedSentence(newSentence);
      setScore(null);
      setRecordedText('');
      setFeedback('');
      setErrorMsg('');
    }
  };
  
  if (!recognitionSupported) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">⚠️ Browser Not Supported</h2>
          <p className="text-gray-700">
            Speech recognition is not supported in your browser. Please use Google Chrome, Microsoft Edge, or Safari.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">🎤 Speaking Test</h2>
        <p className="text-center text-gray-600 mb-6 text-sm md:text-base">
          Tap "Allow Microphone" then record yourself saying the German sentence.
        </p>
        
        {/* Microphone permission button */}
        {micPermission === null && (
          <div className="text-center mb-6">
            <button
              onClick={requestMicPermission}
              className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-purple-700 transition"
            >
              🎤 Allow Microphone
            </button>
          </div>
        )}
        
        {/* Audio level meter (only shows when mic is active) */}
        {micPermission === true && (
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-500"
                animate={{ width: `${audioLevel}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
            <p className="text-xs text-center text-gray-500 mt-1">Microphone level {audioLevel > 5 ? '(sound detected)' : '(speak to see movement)'}</p>
          </div>
        )}
        
        {/* Sentence selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Choose a sentence:</label>
          <select
            value={selectedSentence.german}
            onChange={handleSentenceChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
          >
            {sentences.map(s => (
              <option key={s.german} value={s.german}>{s.german} – {s.english}</option>
            ))}
          </select>
        </div>
        
        {/* Target sentence */}
        <div className="bg-purple-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-sm text-gray-500">Say this:</span>
              <p className="text-lg md:text-xl font-bold text-purple-800 mt-1">{selectedSentence.german}</p>
              <p className="text-sm text-gray-600">{selectedSentence.english}</p>
            </div>
            <PronounceButton word={selectedSentence.german} />
          </div>
        </div>
        
        {/* Recording button (only if mic permission granted) */}
        {micPermission === true && (
          <div className="text-center mb-6">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition transform hover:scale-105 text-lg"
              >
                🎙️ Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition text-lg"
              >
                ⏹️ Stop Recording
              </button>
            )}
          </div>
        )}
        
        {/* Error message */}
        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
            ⚠️ {errorMsg}
          </div>
        )}
        
        {/* Results */}
        <AnimatePresence>
          {recordedText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-4 shadow mb-4"
            >
              <h3 className="font-semibold text-gray-700">You said:</h3>
              <p className="text-gray-800 mt-1 italic">"{recordedText}"</p>
            </motion.div>
          )}
          
          {score !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-purple-700">{score}%</div>
              <p className="text-gray-700 mt-2 text-sm md:text-base">{feedback}</p>
              {score < 80 && (
                <button
                  onClick={() => {
                    setScore(null);
                    setRecordedText('');
                    startRecording();
                  }}
                  className="mt-3 text-purple-600 underline text-sm"
                >
                  Try again
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-xl text-sm text-center">
          💡 <strong>Mobile tips:</strong> 
          <ul className="text-left mt-2 space-y-1 text-xs">
            <li>• Tap "Allow Microphone" first, then speak clearly after tapping "Start Recording".</li>
            <li>• On iPhone, you may need to tap the recording button twice due to browser restrictions.</li>
            <li>• Make sure your phone isn't on silent mode.</li>
            <li>• If nothing happens, refresh the page and try again.</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default SpeakingTestPage;