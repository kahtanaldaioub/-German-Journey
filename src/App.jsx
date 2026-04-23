import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FlashcardsPage from './pages/FlashcardsPage';
import VerbsQuizPage from './pages/VerbsQuizPage';
import NounsQuizPage from './pages/NounsQuizPage';
import PhrasesQuizPage from './pages/PhrasesQuizPage';
import NumbersPage from './pages/NumbersPage';
import NumbersPage2 from './pages/NumbersPage2';
import AlphabetPage from './pages/AlphabetPage';
import PersonalPronounsPage from './pages/PersonalPronounsPage';
import QuestionWordsPage from './pages/QuestionWordsPage';
import IndefiniteArticlesPage from './pages/IndefiniteArticlesPage';
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
import ConversationDetailPage from './pages/ConversationDetailPage';
import StoryDetailPage from './pages/StoryDetailPage';
import PossessivePage from './pages/PossessivePage';
import TimePage from './pages/TimePage';
import A1LessonsPage from './pages/A1LessonsPage';
import GreetingsLessonPage from './pages/GreetingsLessonPage';
import CommonPhrasesLessonPage from './pages/CommonPhrasesLessonPage';
import ImperativePage from './pages/ImperativePage';
import IntroductionsPage from './pages/IntroductionsPage';
import AdjectivesPage from './pages/AdjectivesPage';
import FamilyPage from './pages/FamilyPage';
import SupermarketPage from './pages/SupermarketPage';
import IllnessPage from './pages/IllnessPage';
import RestaurantPage from './pages/RestaurantPage';
import DailyRoutinePage from './pages/DailyRoutinePage';
import AppointmentsPage from './pages/AppointmentsPage';
import DirectionsPage from './pages/DirectionsPage';
import WeatherPage from './pages/WeatherPage';
import PostOfficePage from './pages/PostOfficePage';
import BankPage from './pages/BankPage';
import ApartmentHuntingPage from './pages/ApartmentHuntingPage';
import TrainTicketPage from './pages/TrainTicketPage';
import ShoppingClothesPage from './pages/ShoppingClothesPage';
import TaxiPage from './pages/TaxiPage';
import TelephonePage from './pages/TelephonePage';
import DoctorPage from './pages/DoctorPage';
import PharmacyPage from './pages/PharmacyPage';
import OrdinalNumbersPage from './pages/OrdinalNumbersPage';
import AdverbsTimePage from './pages/AdverbsTimePage';
import LetterWritingPage from './pages/LetterWritingPage';
import LikesDislikesPage from './pages/LikesDislikesPage';
import TimeQuestionsPage from './pages/TimeQuestionsPage';
import FillFormPage from './pages/FillFormPage';
import HobbiesPage from './pages/HobbiesPage';
import FoodDrinkPage from './pages/FoodDrinkPage';
import HousingPage from './pages/HousingPage';
import ProfessionsPage from './pages/ProfessionsPage';
import CountriesPage from './pages/CountriesPage';
import SchoolPage from './pages/SchoolPage';
import TransportPage from './pages/TransportPage';
import HolidaysPage from './pages/HolidaysPage';
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
        <Route path="/numbers2" element={<NumbersPage2 />} />
        <Route path="/alphabet" element={<AlphabetPage />} />
        <Route path="/personal-pronouns" element={<PersonalPronounsPage />} />
        <Route path="/question-words" element={<QuestionWordsPage />} />
        <Route path="/indefinite-articles" element={<IndefiniteArticlesPage />} />
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
        <Route path="/conversation/:id" element={<ConversationDetailPage />} />
        <Route path="/story/:id" element={<StoryDetailPage />} />
        <Route path="/possessive" element={<PossessivePage />} />
        <Route path="/time" element={<TimePage />} />
        <Route path="/a1-lessons" element={<A1LessonsPage />} />
        <Route path="/greetings-lesson" element={<GreetingsLessonPage />} />
        <Route path="/common-phrases-lesson" element={<CommonPhrasesLessonPage />} /> 
        <Route path="/imperative" element={<ImperativePage />} />
        <Route path="/introductions" element={<IntroductionsPage />} />
        <Route path="/adjectives" element={<AdjectivesPage />} />
        <Route path="/family" element={<FamilyPage />} />
        <Route path="/supermarket" element={<SupermarketPage />} />
        <Route path="/illness" element={<IllnessPage />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/daily-routine" element={<DailyRoutinePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/directions" element={<DirectionsPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/post-office" element={<PostOfficePage />} />
        <Route path="/bank" element={<BankPage />} />
        <Route path="/apartment-hunting" element={<ApartmentHuntingPage />} />
        <Route path="/train-ticket" element={<TrainTicketPage />} />
        <Route path="/shopping-clothes" element={<ShoppingClothesPage />} />
        <Route path="/taxi" element={<TaxiPage />} />
        <Route path="/telephone" element={<TelephonePage />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/ordinal-numbers" element={<OrdinalNumbersPage />} />
        <Route path="/adverbs-time" element={<AdverbsTimePage />} />
        <Route path="/letter-writing" element={<LetterWritingPage />} />
        <Route path="/likes-dislikes" element={<LikesDislikesPage />} />
        <Route path="/time-questions" element={<TimeQuestionsPage />} />
        <Route path="/fill-form" element={<FillFormPage />} />
        <Route path="/pharmacy" element={<PharmacyPage />} />
        <Route path="/hobbies" element={<HobbiesPage />} />
        <Route path="/food-drink" element={<FoodDrinkPage />} />
        <Route path="/housing" element={<HousingPage />} />
        <Route path="/professions" element={<ProfessionsPage />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/school" element={<SchoolPage />} />
        <Route path="/transport" element={<TransportPage />} />
        <Route path="/holidays" element={<HolidaysPage />} />
      </Routes>
    </div>
  );
}

export default App;