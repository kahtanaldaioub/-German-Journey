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
  const [micTestResult, setMicTestResult] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);
  
  const recognitionRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
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
  
  const startAudioLevelMeter = (stream) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioContext();
    sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
    const analyser = audioContextRef.current.createAnalyser();
    analyser.fftSize = 256;
    sourceRef.current.connect(analyser);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    const updateLevel = () => {
      if (!isRecording && !mediaStreamRef.current) return;
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
      let avg = sum / dataArray.length;
      let level = Math.min(100, (avg / 255) * 100);
      setAudioLevel(level);
      animationFrameRef.current = requestAnimationFrame(updateLevel);
    };
    audioContextRef.current.resume();
    updateLevel();
  };
  
  const testMicrophone = async () => {
    setMicTestResult(null);
    setErrorMsg('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      startAudioLevelMeter(stream);
      mediaStreamRef.current = stream;
      // Show level for 2 seconds then stop
      setTimeout(() => {
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach(track => track.stop());
          mediaStreamRef.current = null;
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        cancelAnimationFrame(animationFrameRef.current);
        setAudioLevel(0);
      }, 2000);
      setMicTestResult('✅ Microphone is working! You can now record.');
    } catch (err) {
      setMicTestResult('❌ Cannot access microphone. Please allow microphone access.');
      setErrorMsg('Microphone permission denied or no mic found.');
    }
  };
  
  const startRecording = async () => {
    setScore(null);
    setRecordedText('');
    setFeedback('');
    setErrorMsg('');
    setAudioLevel(0);
    
    try {
      // Get persistent stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      startAudioLevelMeter(stream);
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = 'de-DE';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;
      
      recognition.onstart = () => {
        setIsRecording(true);
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
            userMsg = 'No speech detected. Please speak clearly into the microphone. Click "Start Recording" and speak immediately.';
            break;
          case 'audio-capture':
            userMsg = 'No microphone found. Please check your microphone.';
            break;
          case 'not-allowed':
            userMsg = 'Microphone access denied. Please allow microphone in your browser settings.';
            break;
          case 'network':
            userMsg = 'Network error. Please check your internet connection and try again.';
            break;
          default:
            userMsg = `Recognition error: ${event.error}. Please try again.`;
        }
        setErrorMsg(userMsg);
        stopRecording();
      };
      
      recognition.onend = () => {
        setIsRecording(false);
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach(track => track.stop());
          mediaStreamRef.current = null;
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        cancelAnimationFrame(animationFrameRef.current);
        setAudioLevel(0);
      };
      
      recognition.start();
      
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not access microphone. Please check permissions.');
      setIsRecording(false);
    }
  };
  
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
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
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 rounded-3xl p-8 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-2">🎤 Speaking Test</h2>
        <p className="text-center text-gray-600 mb-6">
          Record yourself saying the German sentence and get a pronunciation score.
        </p>
        
        <div className="text-center mb-4">
          <button
            onClick={testMicrophone}
            className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full transition"
          >
            🎙️ Test Microphone
          </button>
          {micTestResult && (
            <p className={`text-sm mt-2 ${micTestResult.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {micTestResult}
            </p>
          )}
        </div>
        
        {/* Audio level meter (shows when mic is active) */}
        {(mediaStreamRef.current || isRecording) && (
          <div className="mb-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-500"
                animate={{ width: `${audioLevel}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
            <p className="text-xs text-gray-500 text-center mt-1">
              {isRecording ? "Listening... Speak now!" : "Microphone active"}
            </p>
          </div>
        )}
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Choose a sentence to practice:</label>
          <select
            value={selectedSentence.german}
            onChange={handleSentenceChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {sentences.map(s => (
              <option key={s.german} value={s.german}>{s.german} – {s.english}</option>
            ))}
          </select>
        </div>
        
        <div className="bg-purple-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500">Target sentence:</span>
              <p className="text-xl font-bold text-purple-800 mt-1">{selectedSentence.german}</p>
              <p className="text-sm text-gray-600">{selectedSentence.english}</p>
            </div>
            <PronounceButton word={selectedSentence.german} />
          </div>
        </div>
        
        <div className="text-center mb-6">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition transform hover:scale-105"
            >
              🎙️ Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition"
            >
              ⏹️ Stop Recording
            </button>
          )}
        </div>
        
        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
            ⚠️ {errorMsg}
          </div>
        )}
        
        <AnimatePresence>
          {recordedText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-4 shadow mb-4"
            >
              <h3 className="font-semibold text-gray-700">What you said:</h3>
              <p className="text-gray-800 mt-1 italic">"{recordedText}"</p>
            </motion.div>
          )}
          
          {score !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 text-center"
            >
              <div className="text-5xl font-bold text-purple-700">{score}%</div>
              <p className="text-gray-700 mt-2">{feedback}</p>
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
          💡 <strong>Tips:</strong> Speak clearly and immediately after clicking "Start Recording". Make sure your microphone is working (use "Test Microphone" button). The score is based on word recognition.
        </div>
      </motion.div>
    </div>
  );
};

export default SpeakingTestPage;