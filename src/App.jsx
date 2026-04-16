import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FlashcardsPage from './pages/FlashcardsPage';
import VerbsQuizPage from './pages/VerbsQuizPage';
import NounsQuizPage from './pages/NounsQuizPage';
import PhrasesQuizPage from './pages/PhrasesQuizPage';
import NumbersPage from './pages/NumbersPage';
import AlphabetPage from './pages/AlphabetPage';
import PronounsPage from './pages/PronounsPage';
import SentenceStructurePage from './pages/SentenceStructurePage';
import VerbsPage from './pages/VerbsPage';
import NounsPage from './pages/NounsPage';
import ChunksPage from './pages/ChunksPage';
import CasesPage from './pages/CasesPage';
import PrepositionsPage from './pages/PrepositionsPage';
import SeparableVerbsPage from './pages/SeparableVerbsPage';
import ParticlesPage from './pages/ParticlesPage';
import ComparativesPage from './pages/ComparativesPage';
import PastTensePage from './pages/PastTensePage';
import DaysPage from './pages/DaysPage';
import MonthsPage from './pages/MonthsPage';
import ColorsPage from './pages/ColorsPage';
import StoriesPage from './pages/StoriesPage';
import ConversationsPage from './pages/ConversationsPage';
import ArticleQuizPage from './pages/ArticleQuizPage';
import RadioPage from './pages/RadioPage';
import ConjugationRulesPage from './pages/ConjugationRulesPage';
import DailyStoryPage from './pages/DailyStoryPage';
function App() {
  return (
    <div className="bg-linear-to-b from-indigo-50 via-purple-50 to-pink-50 min-h-screen font-sans">

      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/verb-quiz" element={<VerbsQuizPage />} />
        <Route path="/noun-quiz" element={<NounsQuizPage />} />
        <Route path="/phrase-quiz" element={<PhrasesQuizPage />} />
        <Route path="/numbers" element={<NumbersPage />} />
        <Route path="/alphabet" element={<AlphabetPage />} />
        <Route path="/pronouns" element={<PronounsPage />} />
        <Route path="/sentence-structure" element={<SentenceStructurePage />} />
        <Route path="/verbs" element={<VerbsPage />} />
        <Route path="/nouns" element={<NounsPage />} />
        <Route path="/chunks" element={<ChunksPage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/prepositions" element={<PrepositionsPage />} />
        <Route path="/separable" element={<SeparableVerbsPage />} />
        <Route path="/particles" element={<ParticlesPage />} />
        <Route path="/comparatives" element={<ComparativesPage />} />
        <Route path="/past" element={<PastTensePage />} />
        <Route path="/days" element={<DaysPage />} />
        <Route path="/months" element={<MonthsPage />} />
        <Route path="/colors" element={<ColorsPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/conversations" element={<ConversationsPage />} />
        <Route path="/article-quiz" element={<ArticleQuizPage />} />
        <Route path="/radio" element={<RadioPage />} />
        <Route path="/conjugation-rules" element={<ConjugationRulesPage />} />
        <Route path="/daily-story" element={<DailyStoryPage />} />
      </Routes>
    </div>
  );
}

export default App;