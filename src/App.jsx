import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

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

const ConjugationModal = ({ verb, infinitive, english, onClose }) => {
  const getConjugation = (verbInfinitive) => {
    const irregulars = {
      "sein": { ich: "bin", du: "bist", er: "ist", wir: "sind", ihr: "seid", sie: "sind" },
      "haben": { ich: "habe", du: "hast", er: "hat", wir: "haben", ihr: "habt", sie: "haben" },
      "werden": { ich: "werde", du: "wirst", er: "wird", wir: "werden", ihr: "werdet", sie: "werden" },
      "können": { ich: "kann", du: "kannst", er: "kann", wir: "können", ihr: "könnt", sie: "können" },
      "müssen": { ich: "muss", du: "musst", er: "muss", wir: "müssen", ihr: "müsst", sie: "müssen" },
      "wollen": { ich: "will", du: "willst", er: "will", wir: "wollen", ihr: "wollt", sie: "wollen" },
      "sollen": { ich: "soll", du: "sollst", er: "soll", wir: "sollen", ihr: "sollt", sie: "sollen" },
      "dürfen": { ich: "darf", du: "darfst", er: "darf", wir: "dürfen", ihr: "dürft", sie: "dürfen" },
      "mögen": { ich: "mag", du: "magst", er: "mag", wir: "mögen", ihr: "mögt", sie: "mögen" },
      "wissen": { ich: "weiß", du: "weißt", er: "weiß", wir: "wissen", ihr: "wisst", sie: "wissen" },
      "gehen": { ich: "gehe", du: "gehst", er: "geht", wir: "gehen", ihr: "geht", sie: "gehen" },
      "sehen": { ich: "sehe", du: "siehst", er: "sieht", wir: "sehen", ihr: "seht", sie: "sehen" },
      "essen": { ich: "esse", du: "isst", er: "isst", wir: "essen", ihr: "esst", sie: "essen" },
      "sprechen": { ich: "spreche", du: "sprichst", er: "spricht", wir: "sprechen", ihr: "sprecht", sie: "sprechen" },
      "lesen": { ich: "lese", du: "liest", er: "liest", wir: "lesen", ihr: "lest", sie: "lesen" },
      "treffen": { ich: "treffe", du: "triffst", er: "trifft", wir: "treffen", ihr: "trefft", sie: "treffen" },
      "helfen": { ich: "helfe", du: "hilfst", er: "hilft", wir: "helfen", ihr: "helft", sie: "helfen" },
      "fahren": { ich: "fahre", du: "fährst", er: "fährt", wir: "fahren", ihr: "fahrt", sie: "fahren" },
      "laufen": { ich: "laufe", du: "läufst", er: "läuft", wir: "laufen", ihr: "lauft", sie: "laufen" },
      "schlafen": { ich: "schlafe", du: "schläfst", er: "schläft", wir: "schlafen", ihr: "schlaft", sie: "schlafen" }
    };

    if (irregulars[verbInfinitive]) return irregulars[verbInfinitive];

    let stem = verbInfinitive.slice(0, -2);
    if (verbInfinitive.endsWith("eln")) {
      stem = verbInfinitive.slice(0, -3);
      return {
        ich: stem + "le",
        du: stem + "elst",
        er: stem + "elt",
        wir: stem + "eln",
        ihr: stem + "elt",
        sie: stem + "eln"
      };
    }
    if (verbInfinitive.endsWith("ern")) {
      stem = verbInfinitive.slice(0, -3);
      return {
        ich: stem + "re",
        du: stem + "erst",
        er: stem + "ert",
        wir: stem + "ern",
        ihr: stem + "ert",
        sie: stem + "ern"
      };
    }
    return {
      ich: stem + "e",
      du: stem + "st",
      er: stem + "t",
      wir: stem + "en",
      ihr: stem + "t",
      sie: stem + "en"
    };
  };

  const conj = getConjugation(infinitive);
  const rows = [
    { label: "ich", value: conj.ich },
    { label: "du", value: conj.du },
    { label: "er/sie/es", value: conj.er },
    { label: "wir", value: conj.wir },
    { label: "ihr", value: conj.ihr },
    { label: "sie/Sie", value: conj.sie }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-purple-700">{verb}</h3>
            <PronounceButton word={verb} />
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <p className="text-gray-600 mb-4">{english}</p>
        <table className="w-full border-collapse">
          <tbody>
            {rows.map(row => (
              <tr key={row.label} className="border-b">
                <td className="py-2 font-semibold w-1/3">{row.label}</td>
                <td className="py-2 w-2/3">
                  <div className="flex items-center justify-between">
                    <span>{row.value}</span>
                    <PronounceButton word={row.value} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-xs text-gray-400 text-center">Present tense (Präsens) – click 🔊 to hear each form</div>
      </div>
    </div>
  );
};

// ---------- DATA (unchanged) ----------
const days = [
  { german: "Montag", english: "Monday" }, { german: "Dienstag", english: "Tuesday" },
  { german: "Mittwoch", english: "Wednesday" }, { german: "Donnerstag", english: "Thursday" },
  { german: "Freitag", english: "Friday" }, { german: "Samstag", english: "Saturday" },
  { german: "Sonntag", english: "Sunday" }
];
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const colors = [
  { german: "rot", english: "red" }, { german: "blau", english: "blue" }, { german: "grün", english: "green" },
  { german: "gelb", english: "yellow" }, { german: "schwarz", english: "black" }, { german: "weiß", english: "white" },
  { german: "grau", english: "gray" }, { german: "orange", english: "orange" }, { german: "lila", english: "purple" },
  { german: "rosa", english: "pink" }, { german: "braun", english: "brown" }, { german: "türkis", english: "turquoise" }
];

const numbersBasic = [
  { german: "null", english: "zero" }, { german: "eins", english: "one" }, { german: "zwei", english: "two" },
  { german: "drei", english: "three" }, { german: "vier", english: "four" }, { german: "fünf", english: "five" },
  { german: "sechs", english: "six" }, { german: "sieben", english: "seven" }, { german: "acht", english: "eight" },
  { german: "neun", english: "nine" }, { german: "zehn", english: "ten" }, { german: "elf", english: "eleven" },
  { german: "zwölf", english: "twelve" }, { german: "dreizehn", english: "thirteen" }, { german: "vierzehn", english: "fourteen" },
  { german: "fünfzehn", english: "fifteen" }, { german: "sechzehn", english: "sixteen" }, { german: "siebzehn", english: "seventeen" },
  { german: "achtzehn", english: "eighteen" }, { german: "neunzehn", english: "nineteen" }, { german: "zwanzig", english: "twenty" }
];
const tens = [
  { german: "dreißig", english: "thirty" }, { german: "vierzig", english: "forty" }, { german: "fünfzig", english: "fifty" },
  { german: "sechzig", english: "sixty" }, { german: "siebzig", english: "seventy" }, { german: "achtzig", english: "eighty" },
  { german: "neunzig", english: "ninety" }, { german: "einhundert", english: "one hundred" }
];

const verbsData = [
  "sein (to be)", "haben (to have)", "werden (to become)", "können (can)", "müssen (must)",
  "sollen (should)", "wollen (want)", "dürfen (may)", "gehen (to go)", "kommen (to come)",
  "sehen (to see)", "essen (to eat)", "trinken (to drink)", "schlafen (to sleep)", "fahren (to drive)",
  "sprechen (to speak)", "verstehen (to understand)", "lernen (to learn)", "arbeiten (to work)",
  "spielen (to play)", "lesen (to read)", "schreiben (to write)", "hören (to hear)", "helfen (to help)",
  "lieben (to love)", "hassen (to hate)", "kaufen (to buy)", "verkaufen (to sell)", "geben (to give)",
  "nehmen (to take)", "finden (to find)", "suchen (to search)", "warten (to wait)", "wohnen (to live/reside)",
  "reisen (to travel)", "schwimmen (to swim)", "laufen (to run)", "springen (to jump)", "lachen (to laugh)",
  "weinen (to cry)", "denken (to think)", "glauben (to believe)", "hoffen (to hope)", "fürchten (to fear)",
  "öffnen (to open)", "schließen (to close)", "beginnen (to begin)", "enden (to end)", "bauen (to build)",
  "zerstören (to destroy)", "reparieren (to repair)", "putzen (to clean)", "kochen (to cook)", "backen (to bake)",
  "zeichnen (to draw)", "malen (to paint)", "singen (to sing)", "tanzen (to dance)", "feiern (to celebrate)",
  "besuchen (to visit)", "treffen (to meet)", "verlassen (to leave)", "erwarten (to expect)", "erklären (to explain)",
  "erinnern (to remember)", "vergessen (to forget)", "akzeptieren (to accept)", "ablehnen (to reject)",
  "verbessern (to improve)", "verschlechtern (to worsen)", "wachsen (to grow)", "sterben (to die)",
  "leben (to live)", "liegen (to lie down)", "sitzen (to sit)", "stehen (to stand)", "tragen (to carry/wear)",
  "waschen (to wash)", "trocknen (to dry)", "rasieren (to shave)", "schminken (to make up)", "entspannen (to relax)",
  "stressen (to stress)", "gewinnen (to win)", "verlieren (to lose)", "sparen (to save)", "verschwenden (to waste)",
  "antworten (to answer)", "fragen (to ask)", "zeigen (to show)", "verstecken (to hide)", "entdecken (to discover)",
  "beobachten (to observe)", "zuhören (to listen)", "berühren (to touch)", "riechen (to smell)", "schmecken (to taste)",
  "umarmen (to hug)", "küssen (to kiss)", "kämpfen (to fight)", "gewinnen (to win)", "verhandeln (to negotiate)"
];
const verbs = verbsData.slice(0, 100).map(v => {
  const parts = v.split('(');
  return { infinitive: parts[0].trim(), english: parts[1]?.replace(')', '').trim() || "" };
});

const nounsRaw = [
  { article: "der", german: "Mann", english: "man" }, { article: "die", german: "Frau", english: "woman" },
  { article: "das", german: "Kind", english: "child" }, { article: "der", german: "Tisch", english: "table" },
  { article: "die", german: "Lampe", english: "lamp" }, { article: "das", german: "Buch", english: "book" },
  { article: "der", german: "Stuhl", english: "chair" }, { article: "die", german: "Tür", english: "door" },
  { article: "das", german: "Fenster", english: "window" }, { article: "der", german: "Apfel", english: "apple" },
  { article: "die", german: "Banane", english: "banana" }, { article: "das", german: "Brot", english: "bread" },
  { article: "der", german: "Hund", english: "dog" }, { article: "die", german: "Katze", english: "cat" },
  { article: "das", german: "Pferd", english: "horse" }, { article: "der", german: "Baum", english: "tree" },
  { article: "die", german: "Blume", english: "flower" }, { article: "das", german: "Haus", english: "house" },
  { article: "der", german: "Garten", english: "garden" }, { article: "die", german: "Schule", english: "school" },
  { article: "der", german: "Lehrer", english: "teacher (m)" }, { article: "die", german: "Lehrerin", english: "teacher (f)" },
  { article: "das", german: "Auto", english: "car" }, { article: "der", german: "Bus", english: "bus" },
  { article: "die", german: "Bahn", english: "train" }, { article: "das", german: "Flugzeug", english: "airplane" },
  { article: "der", german: "Flughafen", english: "airport" }, { article: "die", german: "Straße", english: "street" },
  { article: "das", german: "Zimmer", english: "room" }, { article: "der", german: "Schrank", english: "closet" },
  { article: "die", german: "Küche", english: "kitchen" }, { article: "das", german: "Badezimmer", english: "bathroom" },
  { article: "der", german: "Teller", english: "plate" }, { article: "die", german: "Gabel", english: "fork" },
  { article: "das", german: "Messer", english: "knife" }, { article: "der", german: "Löffel", english: "spoon" },
  { article: "die", german: "Tasse", english: "cup" }, { article: "das", german: "Glas", english: "glass" },
  { article: "der", german: "Computer", english: "computer" }, { article: "die", german: "Maus", english: "mouse" },
  { article: "das", german: "Handy", english: "cellphone" }, { article: "der", german: "Fernseher", english: "TV" },
  { article: "die", german: "Uhr", english: "clock/watch" }, { article: "das", german: "Bett", english: "bed" },
  { article: "der", german: "Berg", english: "mountain" }, { article: "die", german: "See", english: "lake" },
  { article: "das", german: "Meer", english: "sea" }, { article: "der", german: "Fluss", english: "river" },
  { article: "die", german: "Wiese", english: "meadow" }, { article: "das", german: "Feld", english: "field" },
  { article: "der", german: "Himmel", english: "sky" }, { article: "die", german: "Sonne", english: "sun" },
  { article: "das", german: "Feuer", english: "fire" }, { article: "der", german: "Regen", english: "rain" },
  { article: "die", german: "Wolke", english: "cloud" }, { article: "das", german: "Eis", english: "ice" },
  { article: "der", german: "Freund", english: "friend (m)" }, { article: "die", german: "Freundin", english: "friend (f)" },
  { article: "das", german: "Glück", english: "luck" }, { article: "der", german: "Traum", english: "dream" },
  { article: "die", german: "Angst", english: "fear" }, { article: "das", german: "Geld", english: "money" },
  { article: "der", german: "Markt", english: "market" }, { article: "die", german: "Arbeit", english: "work" },
  { article: "das", german: "Büro", english: "office" }, { article: "der", german: "Urlaub", english: "vacation" },
  { article: "die", german: "Reise", english: "journey" }, { article: "das", german: "Ticket", english: "ticket" },
  { article: "der", german: "Bahnhof", english: "train station" }, { article: "die", german: "Haltestelle", english: "bus stop" },
  { article: "das", german: "Taxi", english: "taxi" }, { article: "der", german: "Kaffee", english: "coffee" },
  { article: "die", german: "Milch", english: "milk" }, { article: "das", german: "Wasser", english: "water" },
  { article: "der", german: "Saft", english: "juice" }, { article: "die", german: "Pizza", english: "pizza" },
  { article: "das", german: "Steak", english: "steak" }, { article: "der", german: "Fisch", english: "fish" },
  { article: "die", german: "Suppe", english: "soup" }, { article: "das", german: "Gemüse", english: "vegetable" },
  { article: "der", german: "Sport", english: "sport" }, { article: "die", german: "Musik", english: "music" },
  { article: "das", german: "Konzert", english: "concert" }, { article: "der", german: "Film", english: "movie" },
  { article: "die", german: "Theater", english: "theater" }, { article: "das", german: "Spiel", english: "game" },
  { article: "der", german: "Morgen", english: "morning" }, { article: "die", german: "Nacht", english: "night" },
  { article: "das", german: "Jahr", english: "year" }, { article: "der", german: "Monat", english: "month" },
  { article: "die", german: "Woche", english: "week" }, { article: "das", german: "Wochenende", english: "weekend" },
  { article: "der", german: "Osten", english: "east" }, { article: "die", german: "Westen", english: "west" },
  { article: "das", german: "Zentrum", english: "center" }, { article: "der", german: "Körper", english: "body" },
  { article: "die", german: "Hand", english: "hand" }, { article: "das", german: "Bein", english: "leg" },
  { article: "der", german: "Kopf", english: "head" }, { article: "die", german: "Nase", english: "nose" },
  { article: "das", german: "Auge", english: "eye" }, { article: "der", german: "Mund", english: "mouth" },
  { article: "die", german: "Zunge", english: "tongue" }, { article: "das", german: "Ohr", english: "ear" },
  { article: "der", german: "Rücken", english: "back" }, { article: "die", german: "Brust", english: "chest" },
  { article: "das", german: "Herz", english: "heart" }, { article: "der", german: "Finger", english: "finger" },
  { article: "die", german: "Zehe", english: "toe" }, { article: "das", german: "Haar", english: "hair" },
  { article: "der", german: "Zahn", english: "tooth" }, { article: "die", german: "Schokolade", english: "chocolate" },
  { article: "das", german: "Eiscreme", english: "ice cream" }, { article: "der", german: "Honig", english: "honey" },
  { article: "die", german: "Marmelade", english: "jam" }, { article: "das", german: "Butterbrot", english: "sandwich" },
  { article: "der", german: "Wein", english: "wine" }, { article: "die", german: "Bier", english: "beer" },
  { article: "das", german: "Getränk", english: "drink" }, { article: "der", german: "Tee", english: "tea" },
  { article: "die", german: "Cola", english: "cola" }, { article: "das", german: "Geschenk", english: "gift" },
  { article: "der", german: "Geburtstag", english: "birthday" }, { article: "die", german: "Party", english: "party" },
  { article: "das", german: "Fest", english: "celebration" }, { article: "der", german: "Tanz", english: "dance" },
  { article: "die", german: "Liebe", english: "love" }, { article: "das", german: "Lächeln", english: "smile" },
  { article: "der", german: "Brief", english: "letter" }, { article: "die", german: "Post", english: "mail" },
  { article: "das", german: "Paket", english: "package" }, { article: "der", german: "Zoo", english: "zoo" },
  { article: "die", german: "Vogel", english: "bird" }, { article: "das", german: "Tier", english: "animal" },
  { article: "der", german: "Löwe", english: "lion" }, { article: "die", german: "Maus", english: "mouse" },
  { article: "das", german: "Känguru", english: "kangaroo" }, { article: "der", german: "Elefant", english: "elephant" },
  { article: "die", german: "Giraffe", english: "giraffe" }, { article: "das", german: "Nilpferd", english: "hippo" },
  { article: "der", german: "Papagei", english: "parrot" }, { article: "die", german: "Spinne", english: "spider" },
  { article: "das", german: "Insekt", english: "insect" }, { article: "der", german: "Sommer", english: "summer" },
  { article: "die", german: "Winter", english: "winter" }, { article: "das", german: "Frühjahr", english: "spring" },
  { article: "der", german: "Herbst", english: "autumn" }, { article: "die", german: "Kälte", english: "cold" },
  { article: "das", german: "Wetter", english: "weather" }, { article: "der", german: "Schnee", english: "snow" },
  { article: "die", german: "Hitze", english: "heat" }, { article: "das", german: "Glück", english: "happiness" },
  { article: "der", german: "Frieden", english: "peace" }, { article: "die", german: "Freiheit", english: "freedom" },
  { article: "das", german: "Abenteuer", english: "adventure" }
];

const additionalNouns = [
  { article: "der", german: "Apfelsaft", english: "apple juice" },
  { article: "die", german: "Orange", english: "orange" },
  { article: "das", german: "Ei", english: "egg" },
  { article: "der", german: "Joghurt", english: "yogurt" },
  { article: "die", german: "Butter", english: "butter" },
  { article: "der", german: "Käse", english: "cheese" },
  { article: "die", german: "Wurst", english: "sausage" },
  { article: "das", german: "Salz", english: "salt" },
  { article: "der", german: "Pfeffer", english: "pepper" },
  { article: "der", german: "Zucker", english: "sugar" },
  { article: "das", german: "Mehl", english: "flour" },
  { article: "das", german: "Öl", english: "oil" },
  { article: "der", german: "Reis", english: "rice" },
  { article: "die", german: "Nudel", english: "noodle" },
  { article: "die", german: "Kartoffel", english: "potato" },
  { article: "die", german: "Tomate", english: "tomato" },
  { article: "die", german: "Gurke", english: "cucumber" },
  { article: "der", german: "Salat", english: "salad" },
  { article: "die", german: "Zwiebel", english: "onion" },
  { article: "der", german: "Knoblauch", english: "garlic" },
  { article: "der", german: "Apfelkuchen", english: "apple pie" },
  { article: "die", german: "Schokolade", english: "chocolate" },
  { article: "der", german: "Keks", english: "cookie" },
  { article: "das", german: "Eis", english: "ice cream" },
  { article: "der", german: "Honig", english: "honey" },
  { article: "die", german: "Marmelade", english: "jam" },
  { article: "das", german: "Hemd", english: "shirt" },
  { article: "die", german: "Hose", english: "pants" },
  { article: "das", german: "Kleid", english: "dress" },
  { article: "der", german: "Rock", english: "skirt" },
  { article: "die", german: "Jacke", english: "jacket" },
  { article: "der", german: "Schuh", english: "shoe" },
  { article: "die", german: "Socke", english: "sock" },
  { article: "der", german: "Hut", english: "hat" },
  { article: "die", german: "Mütze", english: "cap" },
  { article: "der", german: "Schal", english: "scarf" },
  { article: "die", german: "Handschuh", english: "glove" },
  { article: "der", german: "Gürtel", english: "belt" },
  { article: "die", german: "Tasche", english: "bag" },
  { article: "der", german: "Rucksack", english: "backpack" },
  { article: "der", german: "Regenschirm", english: "umbrella" },
  { article: "der", german: "Schlüssel", english: "key" },
  { article: "die", german: "Türklingel", english: "doorbell" },
  { article: "das", german: "Regal", english: "shelf" },
  { article: "der", german: "Teppich", english: "carpet" },
  { article: "das", german: "Bild", english: "picture" },
  { article: "der", german: "Spiegel", english: "mirror" },
  { article: "die", german: "Waschmaschine", english: "washing machine" },
  { article: "der", german: "Kühlschrank", english: "refrigerator" },
  { article: "der", german: "Herd", english: "stove" },
  { article: "die", german: "Mikrowelle", english: "microwave" },
  { article: "der", german: "Staubsauger", english: "vacuum cleaner" },
  { article: "der", german: "Besen", english: "broom" },
  { article: "der", german: "Eimer", english: "bucket" },
  { article: "das", german: "Handtuch", english: "towel" },
  { article: "die", german: "Seife", english: "soap" },
  { article: "das", german: "Shampoo", english: "shampoo" },
  { article: "die", german: "Zahnbürste", english: "toothbrush" },
  { article: "die", german: "Zahnpasta", english: "toothpaste" },
  { article: "der", german: "Beruf", english: "profession" },
  { article: "die", german: "Arbeitsstelle", english: "job position" },
  { article: "der", german: "Kollege", english: "colleague (m)" },
  { article: "die", german: "Kollegin", english: "colleague (f)" },
  { article: "der", german: "Chef", english: "boss (m)" },
  { article: "die", german: "Chefin", english: "boss (f)" },
  { article: "das", german: "Gehalt", english: "salary" },
  { article: "die", german: "Pause", english: "break" },
  { article: "die", german: "Klausur", english: "exam" },
  { article: "der", german: "Test", english: "test" },
  { article: "die", german: "Hausaufgabe", english: "homework" },
  { article: "der", german: "Unterricht", english: "class/lesson" },
  { article: "die", german: "Universität", english: "university" },
  { article: "der", german: "Student", english: "student (m)" },
  { article: "die", german: "Studentin", english: "student (f)" },
  { article: "das", german: "Klassenzimmer", english: "classroom" },
  { article: "die", german: "Tafel", english: "blackboard" },
  { article: "der", german: "Stift", english: "pen" },
  { article: "der", german: "Bleistift", english: "pencil" },
  { article: "der", german: "Radiergummi", english: "eraser" },
  { article: "das", german: "Lineal", english: "ruler" },
  { article: "der", german: "Spitzer", english: "sharpener" },
  { article: "das", german: "Papier", english: "paper" },
  { article: "der", german: "Ordner", english: "folder" },
  { article: "der", german: "Flug", english: "flight" },
  { article: "der", german: "Koffer", english: "suitcase" },
  { article: "der", german: "Reisepass", english: "passport" },
  { article: "der", german: "Ausweis", english: "ID card" },
  { article: "das", german: "Hotel", english: "hotel" },
  { article: "die", german: "Jugendherberge", english: "youth hostel" },
  { article: "der", german: "Campingplatz", english: "campsite" },
  { article: "der", german: "Strand", english: "beach" },
  { article: "der", german: "Wald", english: "forest" },
  { article: "die", german: "Brücke", english: "bridge" },
  { article: "der", german: "Tunnel", english: "tunnel" },
  { article: "die", german: "Ampel", english: "traffic light" },
  { article: "der", german: "Parkplatz", english: "parking lot" },
  { article: "die", german: "Tankstelle", english: "gas station" },
  { article: "die", german: "Schulter", english: "shoulder" },
  { article: "der", german: "Ellbogen", english: "elbow" },
  { article: "das", german: "Handgelenk", english: "wrist" },
  { article: "der", german: "Daumen", english: "thumb" },
  { article: "der", german: "Nagel", english: "nail" },
  { article: "das", german: "Knie", english: "knee" },
  { article: "der", german: "Fuß", english: "foot" },
  { article: "die", german: "Ferse", english: "heel" },
  { article: "der", german: "Bauch", english: "belly" },
  { article: "die", german: "Lunge", english: "lung" },
  { article: "der", german: "Magen", english: "stomach" },
  { article: "die", german: "Krankheit", english: "illness" },
  { article: "der", german: "Arzt", english: "doctor (m)" },
  { article: "die", german: "Ärztin", english: "doctor (f)" },
  { article: "die", german: "Apotheke", english: "pharmacy" },
  { article: "das", german: "Medikament", english: "medicine" },
  { article: "das", german: "Krankenhaus", english: "hospital" },
  { article: "der", german: "Krankenschwester", english: "nurse (f)" },
  { article: "der", german: "Krankenpfleger", english: "nurse (m)" },
  { article: "der", german: "Mond", english: "moon" },
  { article: "der", german: "Stern", english: "star" },
  { article: "die", german: "Erde", english: "earth" },
  { article: "der", german: "Wind", english: "wind" },
  { article: "das", german: "Gewitter", english: "thunderstorm" },
  { article: "der", german: "Blitz", english: "lightning" },
  { article: "der", german: "Donner", english: "thunder" },
  { article: "der", german: "Nebel", english: "fog" },
  { article: "die", german: "Freude", english: "joy" },
  { article: "der", german: "Schmerz", english: "pain" },
  { article: "die", german: "Trauer", english: "sorrow" },
  { article: "der", german: "Mut", english: "courage" },
  { article: "die", german: "Geduld", english: "patience" },
  { article: "der", german: "Erfolg", english: "success" },
  { article: "der", german: "Fehler", english: "mistake" },
  { article: "die", german: "Hilfe", english: "help" },
  { article: "die", german: "Antwort", english: "answer" },
  { article: "die", german: "Frage", english: "question" },
  { article: "die", german: "Geschichte", english: "story/history" },
  { article: "die", german: "Wirklichkeit", english: "reality" },
  { article: "die", german: "Möglichkeit", english: "possibility" },
  { article: "die", german: "Entscheidung", english: "decision" },
  { article: "der", german: "Tag", english: "day" },
  { article: "die", german: "Stunde", english: "hour" },
  { article: "die", german: "Minute", english: "minute" },
  { article: "die", german: "Sekunde", english: "second" },
  { article: "der", german: "Kalender", english: "calendar" },
  { article: "der", german: "Termin", english: "appointment" },
  { article: "die", german: "Uhrzeit", english: "time (clock time)" },
  { article: "der", german: "Anfang", english: "beginning" },
  { article: "das", german: "Ende", english: "end" },
  { article: "der", german: "Vater", english: "father" },
  { article: "die", german: "Mutter", english: "mother" },
  { article: "der", german: "Sohn", english: "son" },
  { article: "die", german: "Tochter", english: "daughter" },
  { article: "der", german: "Bruder", english: "brother" },
  { article: "die", german: "Schwester", english: "sister" },
  { article: "der", german: "Großvater", english: "grandfather" },
  { article: "die", german: "Großmutter", english: "grandmother" },
  { article: "der", german: "Onkel", english: "uncle" },
  { article: "die", german: "Tante", english: "aunt" },
  { article: "der", german: "Cousin", english: "cousin (m)" },
  { article: "die", german: "Cousine", english: "cousin (f)" },
  { article: "der", german: "Nachbar", english: "neighbor (m)" },
  { article: "die", german: "Nachbarin", english: "neighbor (f)" },
  { article: "der", german: "Bekannte", english: "acquaintance (m)" },
  { article: "die", german: "Bekannte", english: "acquaintance (f)" },
  { article: "der", german: "Preis", english: "price" },
  { article: "die", german: "Rechnung", english: "bill" },
  { article: "die", german: "Kasse", english: "checkout" },
  { article: "der", german: "Einkaufswagen", english: "shopping cart" },
  { article: "die", german: "Tüte", english: "bag" },
  { article: "der", german: "Bon", english: "receipt" },
  { article: "die", german: "Kreditkarte", english: "credit card" },
  { article: "das", german: "Bargeld", english: "cash" },
  { article: "der", german: "Rabatt", english: "discount" },
  { article: "das", german: "Internet", english: "internet" },
  { article: "die", german: "Website", english: "website" },
  { article: "die", german: "E-Mail", english: "email" },
  { article: "das", german: "Passwort", english: "password" },
  { article: "der", german: "Bildschirm", english: "screen" },
  { article: "die", german: "Tastatur", english: "keyboard" },
  { article: "der", german: "Drucker", english: "printer" },
  { article: "der", german: "Lautsprecher", english: "speaker" },
];
let nouns = [...nounsRaw, ...additionalNouns];
const chunksArray = [
  { german: "Hallo!", english: "Hello!" }, { german: "Guten Morgen!", english: "Good morning!" },
  { german: "Guten Tag!", english: "Good day!" }, { german: "Guten Abend!", english: "Good evening!" },
  { german: "Gute Nacht!", english: "Good night!" }, { german: "Tschüss!", english: "Bye!" },
  { german: "Auf Wiedersehen!", english: "Goodbye!" }, { german: "Bitte", english: "Please / You're welcome" },
  { german: "Danke", english: "Thanks" }, { german: "Vielen Dank!", english: "Thank you very much!" },
  { german: "Kein Problem", english: "No problem" }, { german: "Entschuldigung", english: "Excuse me / Sorry" },
  { german: "Es tut mir leid", english: "I'm sorry" }, { german: "Wie geht's?", english: "How are you?" },
  { german: "Mir geht's gut", english: "I'm fine" }, { german: "Und dir?", english: "And you?" },
  { german: "Was ist los?", english: "What's up?" }, { german: "Alles klar!", english: "All right!" },
  { german: "Na ja", english: "Well / Okay" }, { german: "Super!", english: "Great!" },
  { german: "Prima!", english: "Excellent!" }, { german: "Fantastisch!", english: "Fantastic!" },
  { german: "Leider", english: "Unfortunately" }, { german: "Vielleicht", english: "Maybe" },
  { german: "Natürlich", english: "Of course" }, { german: "Sicher", english: "Sure" },
  { german: "Ja", english: "Yes" }, { german: "Nein", english: "No" },
  { german: "Vielleicht später", english: "Maybe later" }, { german: "Ich liebe Deutsch", english: "I love German" },
  { german: "Ich lerne Deutsch", english: "I am learning German" }, { german: "Sprichst du Englisch?", english: "Do you speak English?" },
  { german: "Ich verstehe nicht", english: "I don't understand" }, { german: "Kannst du das wiederholen?", english: "Can you repeat that?" },
  { german: "Wie heißt du?", english: "What's your name?" }, { german: "Ich heiße...", english: "My name is..." },
  { german: "Woher kommst du?", english: "Where are you from?" }, { german: "Ich komme aus...", english: "I come from..." },
  { german: "Wie alt bist du?", english: "How old are you?" }, { german: "Ich bin ... Jahre alt", english: "I am ... years old" },
  { german: "Was machst du beruflich?", english: "What do you do for work?" }, { german: "Ich bin Student", english: "I am a student" },
  { german: "Ich arbeite als...", english: "I work as..." }, { german: "Hast du Geschwister?", english: "Do you have siblings?" },
  { german: "Ich habe einen Bruder", english: "I have a brother" }, { german: "Ich habe eine Schwester", english: "I have a sister" },
  { german: "Das ist mein Freund", english: "This is my friend (male)" }, { german: "Das ist meine Freundin", english: "This is my friend (female)" },
  { german: "Wie viel kostet das?", english: "How much does that cost?" }, { german: "Zu teuer!", english: "Too expensive!" },
  { german: "Gib mir einen Rabatt", english: "Give me a discount" }, { german: "Ich möchte das kaufen", english: "I would like to buy that" },
  { german: "Kann ich mit Karte zahlen?", english: "Can I pay by card?" }, { german: "Bar bitte", english: "Cash please" },
  { german: "Wo ist die Toilette?", english: "Where is the toilet?" }, { german: "Links", english: "Left" },
  { german: "Rechts", english: "Right" }, { german: "Geradeaus", english: "Straight ahead" },
  { german: "Hinter dem Gebäude", english: "Behind the building" }, { german: "Vor dem Supermarkt", english: "In front of the supermarket" },
  { german: "Neben der Bank", english: "Next to the bank" }, { german: "Zwischen den Häusern", english: "Between the houses" },
  { german: "Kannst du mir helfen?", english: "Can you help me?" }, { german: "Natürlich!", english: "Of course!" },
  { german: "Keine Sorge", english: "No worries" }, { german: "Gute Idee", english: "Good idea" },
  { german: "Schlechte Idee", english: "Bad idea" }, { german: "Ich habe Hunger", english: "I'm hungry" },
  { german: "Ich habe Durst", english: "I'm thirsty" }, { german: "Lass uns essen gehen", english: "Let's go eat" },
  { german: "Ich möchte etwas trinken", english: "I'd like something to drink" }, { german: "Einen Kaffee bitte", english: "A coffee please" },
  { german: "Ein Bier bitte", english: "A beer please" }, { german: "Die Rechnung, bitte", english: "The bill, please" },
  { german: "Guten Appetit!", english: "Enjoy your meal!" }, { german: "Prost!", english: "Cheers!" },
  { german: "Zum Wohl!", english: "To your health!" }, { german: "Ich bin müde", english: "I'm tired" },
  { german: "Ich bin krank", english: "I'm sick" }, { german: "Ich brauche einen Arzt", english: "I need a doctor" },
  { german: "Rufen Sie die Polizei", english: "Call the police" }, { german: "Feuer!", english: "Fire!" },
  { german: "Hilfe!", english: "Help!" }, { german: "Ich habe mich verlaufen", english: "I'm lost" },
  { german: "Kannst du mir den Weg zeigen?", english: "Can you show me the way?" }, { german: "Wie spät ist es?", english: "What time is it?" },
  { german: "Es ist 10 Uhr", english: "It's 10 o'clock" }, { german: "Um wie viel Uhr?", english: "At what time?" },
  { german: "Am Morgen", english: "In the morning" }, { german: "Am Nachmittag", english: "In the afternoon" },
  { german: "Am Abend", english: "In the evening" }, { german: "Heute", english: "Today" },
  { german: "Morgen", english: "Tomorrow" }, { german: "Gestern", english: "Yesterday" },
  { german: "Übermorgen", english: "The day after tomorrow" }, { german: "Diese Woche", english: "This week" },
  { german: "Nächste Woche", english: "Next week" }, { german: "Letzte Woche", english: "Last week" },
  { german: "Im Januar", english: "In January" }, { german: "Im Sommer", english: "In summer" },
  { german: "Im Winter", english: "In winter" }, { german: "Im Urlaub", english: "On vacation" },
  { german: "Zu Hause", english: "At home" }, { german: "Im Büro", english: "In the office" },
  { german: "In der Schule", english: "At school" }, { german: "Auf der Arbeit", english: "At work" },
  { german: "Im Kino", english: "At the cinema" }, { german: "Im Restaurant", english: "In the restaurant" },
  { german: "Im Supermarkt", english: "In the supermarket" }, { german: "Am Strand", english: "At the beach" },
  { german: "In den Bergen", english: "In the mountains" }, { german: "Mit dem Auto", english: "By car" },
  { german: "Mit dem Zug", english: "By train" }, { german: "Mit dem Bus", english: "By bus" },
  { german: "Mit dem Fahrrad", english: "By bike" }, { german: "Zu Fuß", english: "On foot" },
  { german: "Gute Reise!", english: "Have a good trip!" }, { german: "Viel Glück!", english: "Good luck!" },
  { german: "Alles Gute zum Geburtstag!", english: "Happy birthday!" }, { german: "Frohe Weihnachten!", english: "Merry Christmas!" },
  { german: "Frohes neues Jahr!", english: "Happy new year!" }, { german: "Schöne Ferien!", english: "Happy holidays!" },
  { german: "Gute Besserung!", english: "Get well soon!" }, { german: "Lass uns Freunde sein", english: "Let's be friends" },
  { german: "Ich vermisse dich", english: "I miss you" }, { german: "Ich liebe dich", english: "I love you" },
  { german: "Küss mich", english: "Kiss me" }, { german: "Umarmung", english: "Hug" },
  { german: "Träum süß", english: "Sweet dreams" }, { german: "Bis bald", english: "See you soon" },
  { german: "Bis morgen", english: "See you tomorrow" }, { german: "Bis später", english: "See you later" },
  { german: "Wir sehen uns", english: "We'll see each other" }, { german: "Mach's gut", english: "Take care" },
  { german: "Pass auf dich auf", english: "Look after yourself" }, { german: "Wie war dein Tag?", english: "How was your day?" },
  { german: "Erzähl mir etwas", english: "Tell me something" }, { german: "Das klingt gut", english: "That sounds good" },
  { german: "Das gefällt mir", english: "I like that" }, { german: "Das mag ich nicht", english: "I don't like that" },
  { german: "Ich bin einverstanden", english: "I agree" }, { german: "Ich bin nicht einverstanden", english: "I disagree" },
  { german: "Das ist richtig", english: "That's right" }, { german: "Das ist falsch", english: "That's wrong" },
  { german: "Ich bin sicher", english: "I'm sure" }, { german: "Ich bin mir nicht sicher", english: "I'm not sure" },
  { german: "Vielleicht hast du recht", english: "Maybe you're right" }, { german: "Keine Ahnung", english: "No idea" },
  { german: "Egal", english: "Whatever" }, { german: "Wie auch immer", english: "Anyway" },
  { german: "Auf jeden Fall", english: "Definitely" }, { german: "Im Allgemeinen", english: "In general" },
  { german: "Zum Beispiel", english: "For example" }, { german: "Und so weiter", english: "And so on" },
  { german: "Das heißt", english: "That means" }, { german: "Im Vergleich zu", english: "In comparison to" },
  { german: "Nicht nur... sondern auch", english: "Not only... but also" }, { german: "Sowohl als auch", english: "Both... and" },
  { german: "Entweder oder", english: "Either... or" }, { german: "Weder noch", english: "Neither... nor" },
  { german: "Je mehr desto besser", english: "The more the better" }, { german: "Ich freue mich darauf", english: "I'm looking forward to it" },
  { german: "Ich habe keine Lust", english: "I don't feel like it" }, { german: "Lass uns gehen", english: "Let's go" },
  { german: "Beeil dich!", english: "Hurry up!" }, { german: "Moment mal!", english: "Wait a moment!" },
  { german: "Hör zu!", english: "Listen!" }, { german: "Schau mal!", english: "Look!" },
  { german: "Achtung!", english: "Attention!" }, { german: "Vorsicht!", english: "Caution!" },
  { german: "Herzlichen Glückwunsch!", english: "Congratulations!" }, { german: "Gut gemacht!", english: "Well done!" },
  { german: "Weiter so!", english: "Keep it up!" }, { german: "Das schaffst du!", english: "You can do it!" },
  { german: "Gib nicht auf!", english: "Don't give up!" }, { german: "Du bist toll!", english: "You're great!" },
  { german: "Ich bin stolz auf dich", english: "I'm proud of you" }, { german: "Lass uns feiern", english: "Let's celebrate" },
  { german: "Das Leben ist schön", english: "Life is beautiful" }, { german: "Genieße den Moment", english: "Enjoy the moment" },
  { german: "Danke für alles", english: "Thanks for everything" }, { german: "Bis zum nächsten Mal!", english: "Until next time!" },
  { german: "Ich habe gegessen", english: "I ate" },
  { german: "Wir sind nach Berlin gefahren", english: "We went to Berlin" },
  { german: "Hast du das gesehen?", english: "Did you see that?" },
  { german: "Ich werde morgen lernen", english: "I will study tomorrow" },
  { german: "Wirst du kommen?", english: "Will you come?" },
  { german: "Ich kann Deutsch sprechen", english: "I can speak German" },
  { german: "Du musst pünktlich sein", english: "You must be on time" },
  { german: "Darf ich das Fenster öffnen?", english: "May I open the window?" },
  { german: "Ich möchte einen Kaffee", english: "I would like a coffee" },
  { german: "Soll ich dir helfen?", english: "Should I help you?" },
  { german: "Deutsch ist schwerer als Englisch", english: "German is harder than English" },
  { german: "Mein Auto ist schneller als deins", english: "My car is faster than yours" },
  { german: "So teuer wie ein Flugzeug", english: "As expensive as a plane" },
  { german: "Ich denke, dass das richtig ist", english: "I think that's right" },
  { german: "Ich weiß nicht, ob er kommt", english: "I don't know if he's coming" },
  { german: "Bevor wir essen, waschen wir die Hände", english: "Before we eat, we wash our hands" },
  { german: "Nach der Arbeit gehe ich nach Hause", english: "After work I go home" },
  { german: "vor einer Woche", english: "a week ago" },
  { german: "in zwei Tagen", english: "in two days" },
  { german: "seit drei Jahren", english: "for three years" },
  { german: "von Montag bis Freitag", english: "from Monday to Friday" },
  { german: "Wie ist das Wetter heute?", english: "How's the weather today?" },
  { german: "Es regnet", english: "It's raining" },
  { german: "Es ist sonnig", english: "It's sunny" },
  { german: "Es ist bewölkt", english: "It's cloudy" },
  { german: "Es schneit", english: "It's snowing" },
  { german: "Die Temperatur ist 20 Grad", english: "The temperature is 20 degrees" },
  { german: "Mir tut der Kopf weh", english: "My head hurts" },
  { german: "Ich habe Fieber", english: "I have a fever" },
  { german: "Nehmen Sie diese Tabletten", english: "Take these tablets" },
  { german: "Ich muss einen Termin vereinbaren", english: "I need to make an appointment" },
  { german: "Wann haben Sie Zeit?", english: "When do you have time?" },
  { german: "Mein Hobby ist Fußball spielen", english: "My hobby is playing soccer" },
  { german: "Ich lese gerne Bücher", english: "I like reading books" },
  { german: "Hast du Hobbys?", english: "Do you have hobbies?" },
  { german: "Was machst du in deiner Freizeit?", english: "What do you do in your free time?" },
  { german: "Ich gehe ins Kino", english: "I'm going to the cinema" },
  { german: "Magst du Musik?", english: "Do you like music?" },
  { german: "Ich höre gerne Rockmusik", english: "I like listening to rock music" },
  { german: "Kannst du mir den Weg zum Bahnhof zeigen?", english: "Can you show me the way to the station?" },
  { german: "Gehen Sie geradeaus bis zur Ampel", english: "Go straight ahead to the traffic light" },
  { german: "Dann links abbiegen", english: "Then turn left" },
  { german: "Es ist etwa fünf Minuten zu Fuß", english: "It's about five minutes on foot" },
  { german: "Das ist interessant", english: "That's interesting" },
  { german: "Das ist langweilig", english: "That's boring" },
  { german: "Das ist teuer", english: "That's expensive" },
  { german: "Das ist billig", english: "That's cheap" },
  { german: "Der Bahnhof ist nah", english: "The station is near" },
  { german: "Das Flughafen ist weit", english: "The airport is far" },
  { german: "Ich bin der Meinung, dass...", english: "I am of the opinion that..." },
  { german: "Es kommt darauf an", english: "It depends" },
  { german: "Das ist mir egal", english: "I don't care" },
  { german: "Kein Wunder!", english: "No wonder!" },
  { german: "Lass mich nachdenken", english: "Let me think" },
  { german: "Ich habe vergessen", english: "I forgot" },
  { german: "Das stimmt", english: "That's correct" },
  { german: "Das stimmt nicht", english: "That's not correct" },
  { german: "Kann sein", english: "Maybe" },
  { german: "Auf keinen Fall", english: "No way" },
  { german: "Ich habe eine Frage", english: "I have a question" },
  { german: "Die Antwort ist einfach", english: "The answer is simple" },
  { german: "Bitte erklären Sie das", english: "Please explain that" },
  { german: "Ich habe einen Fehler gemacht", english: "I made a mistake" },
  { german: "Kein Problem, das passiert", english: "No problem, it happens" },
  { german: "Herzlich willkommen!", english: "You're very welcome!" },
  { german: "Schönen Tag noch!", english: "Have a nice day!" },
  { german: "Gleichfalls!", english: "Likewise!" },
  { german: "Endlich!", english: "Finally!" },
  { german: "Genau!", english: "Exactly!" },
  { german: "Quatsch!", english: "Nonsense!" },
  { german: "Toll!", english: "Great!" },
  { german: "Nicht schlecht", english: "Not bad" },
  { german: "Es lohnt sich", english: "It's worth it" },
  { german: "Lass uns das zusammen machen", english: "Let's do that together" },
  { german: "Ich bin bereit", english: "I'm ready" },
  { german: "Bist du bereit?", english: "Are you ready?" },
  { german: "Fang an!", english: "Start!" },
  { german: "Hör auf!", english: "Stop!" },
  { german: "Mach weiter!", english: "Continue!" },
  { german: "Ich bin neu hier", english: "I'm new here" },
  { german: "Kannst du mich bitte anmelden?", english: "Can you please sign me up?" },
  { german: "Wie funktioniert das?", english: "How does that work?" },
  { german: "Ich brauche mehr Information", english: "I need more information" },
  { german: "Das ist in Ordnung", english: "That's okay" },
  { german: "Das ist nicht in Ordnung", english: "That's not okay" },
  { german: "Wir schaffen das!", english: "We can do it!" }
];
let chunks = [...chunksArray];

const ScrollReveal = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const GermanLearningJourney = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modalVerb, setModalVerb] = useState(null);
  const [modalEnglish, setModalEnglish] = useState("");
  const [modalInfinitive, setModalInfinitive] = useState("");
  const [activeSection, setActiveSection] = useState("");

  // Flashcard state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz states
  const [verbQuiz, setVerbQuiz] = useState({ current: null, options: [], answered: false, score: 0, feedback: "" });
  const [nounQuiz, setNounQuiz] = useState({ current: null, options: [], answered: false, score: 0, feedback: "" });
  const [phraseQuiz, setPhraseQuiz] = useState({ current: null, options: [], answered: false, score: 0, feedback: "" });

  // Build combined flashcard deck
  const allFlashcards = useMemo(() => {
    const nounCards = nouns.map(n => ({ front: `${n.article} ${n.german}`, back: n.english, type: 'noun' }));
    const verbCards = verbs.map(v => ({ front: v.infinitive, back: v.english, type: 'verb' }));
    const chunkCards = chunks.map(c => ({ front: c.german, back: c.english, type: 'chunk' }));
    return [...nounCards, ...verbCards, ...chunkCards];
  }, []);

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const generateVerbQuestion = () => {
    const correctVerb = verbs[Math.floor(Math.random() * verbs.length)];
    const correctAnswer = correctVerb.english;
    let otherMeanings = verbs.filter(v => v.infinitive !== correctVerb.infinitive).map(v => v.english);
    otherMeanings = [...new Set(otherMeanings)];
    let distractors = [];
    while (distractors.length < 3 && otherMeanings.length) {
      const rand = otherMeanings[Math.floor(Math.random() * otherMeanings.length)];
      if (!distractors.includes(rand) && rand !== correctAnswer) {
        distractors.push(rand);
      }
      if (otherMeanings.length < 3) break;
    }
    if (distractors.length < 3) distractors = ["to have", "to be", "to do"];
    const options = shuffleArray([correctAnswer, ...distractors]);
    return { question: correctVerb.infinitive, correct: correctAnswer, options };
  };

  const generateNounQuestion = () => {
    const correctNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const correctAnswer = correctNoun.english;
    let otherMeanings = nouns.filter(n => n.german !== correctNoun.german).map(n => n.english);
    otherMeanings = [...new Set(otherMeanings)];
    let distractors = [];
    while (distractors.length < 3 && otherMeanings.length) {
      const rand = otherMeanings[Math.floor(Math.random() * otherMeanings.length)];
      if (!distractors.includes(rand) && rand !== correctAnswer) {
        distractors.push(rand);
      }
      if (otherMeanings.length < 3) break;
    }
    if (distractors.length < 3) distractors = ["man", "woman", "child"];
    const options = shuffleArray([correctAnswer, ...distractors]);
    return { question: `${correctNoun.article} ${correctNoun.german}`, correct: correctAnswer, options };
  };

  const generatePhraseQuestion = () => {
    const correctPhrase = chunks[Math.floor(Math.random() * chunks.length)];
    const correctAnswer = correctPhrase.english;
    let otherMeanings = chunks.filter(c => c.german !== correctPhrase.german).map(c => c.english);
    otherMeanings = [...new Set(otherMeanings)];
    let distractors = [];
    while (distractors.length < 3 && otherMeanings.length) {
      const rand = otherMeanings[Math.floor(Math.random() * otherMeanings.length)];
      if (!distractors.includes(rand) && rand !== correctAnswer) {
        distractors.push(rand);
      }
      if (otherMeanings.length < 3) break;
    }
    if (distractors.length < 3) distractors = ["Hello!", "Goodbye!", "Thank you"];
    const options = shuffleArray([correctAnswer, ...distractors]);
    return { question: correctPhrase.german, correct: correctAnswer, options };
  };

  useEffect(() => {
    const vq = generateVerbQuestion();
    setVerbQuiz(prev => ({ ...prev, current: vq, options: vq.options, answered: false, feedback: "" }));
    const nq = generateNounQuestion();
    setNounQuiz(prev => ({ ...prev, current: nq, options: nq.options, answered: false, feedback: "" }));
    const pq = generatePhraseQuestion();
    setPhraseQuiz(prev => ({ ...prev, current: pq, options: pq.options, answered: false, feedback: "" }));
  }, []);

  const handleVerbAnswer = (selected) => {
    if (verbQuiz.answered) return;
    const isCorrect = selected === verbQuiz.current.correct;
    setVerbQuiz(prev => ({
      ...prev,
      answered: true,
      score: prev.score + (isCorrect ? 1 : 0),
      feedback: isCorrect ? "✅ Correct!" : `❌ Wrong! The correct answer is: ${prev.current.correct}`
    }));
  };
  const nextVerbQuestion = () => {
    const newQ = generateVerbQuestion();
    setVerbQuiz(prev => ({ ...prev, current: newQ, options: newQ.options, answered: false, feedback: "" }));
  };
  const handleNounAnswer = (selected) => {
    if (nounQuiz.answered) return;
    const isCorrect = selected === nounQuiz.current.correct;
    setNounQuiz(prev => ({
      ...prev,
      answered: true,
      score: prev.score + (isCorrect ? 1 : 0),
      feedback: isCorrect ? "✅ Correct!" : `❌ Wrong! The correct answer is: ${prev.current.correct}`
    }));
  };
  const nextNounQuestion = () => {
    const newQ = generateNounQuestion();
    setNounQuiz(prev => ({ ...prev, current: newQ, options: newQ.options, answered: false, feedback: "" }));
  };
  const handlePhraseAnswer = (selected) => {
    if (phraseQuiz.answered) return;
    const isCorrect = selected === phraseQuiz.current.correct;
    setPhraseQuiz(prev => ({
      ...prev,
      answered: true,
      score: prev.score + (isCorrect ? 1 : 0),
      feedback: isCorrect ? "✅ Correct!" : `❌ Wrong! The correct answer is: ${prev.current.correct}`
    }));
  };
  const nextPhraseQuestion = () => {
    const newQ = generatePhraseQuestion();
    setPhraseQuiz(prev => ({ ...prev, current: newQ, options: newQ.options, answered: false, feedback: "" }));
  };
  const nextFlashcard = () => {
    setFlashcardIndex((prev) => (prev + 1) % allFlashcards.length);
    setIsFlipped(false);
  };
  const prevFlashcard = () => {
    setFlashcardIndex((prev) => (prev - 1 + allFlashcards.length) % allFlashcards.length);
    setIsFlipped(false);
  };
  const randomFlashcard = () => {
    const randomIndex = Math.floor(Math.random() * allFlashcards.length);
    setFlashcardIndex(randomIndex);
    setIsFlipped(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section observer
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -20% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const openModal = (verb, infinitive, english) => {
    setModalVerb(verb);
    setModalInfinitive(infinitive);
    setModalEnglish(english);
  };
  const closeModal = () => setModalVerb(null);

  // Navigation links
  const navLinks = [
    { id: "flashcards", label: "📇 Flashcards" },
    { id: "verb-quiz", label: "📝 Verb Quiz" },
    { id: "noun-quiz", label: "🏷️ Noun Quiz" },
    { id: "phrase-quiz", label: "💬 Phrase Quiz" },
    { id: "numbers", label: "🔢 Numbers" },
    { id: "alphabet", label: "🔤 Alphabet" },
    { id: "pronouns", label: "👤 Pronouns" },
    { id: "sentence-structure", label: "📝 Structure" },
    { id: "verbs", label: "⚡ Verbs" },
    { id: "nouns", label: "🏷️ Nouns" },
    { id: "chunks", label: "💬 Chunks" },
    { id: "cases", label: "📚 Cases" },
    { id: "prepositions", label: "📍 Prepositions" },
    { id: "separable", label: "✂️ Separable" },
    { id: "particles", label: "✨ Particles" },
    { id: "comparatives", label: "📈 Comparatives" },
    { id: "past", label: "⏳ Past Tense" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Data for remaining sections
  const personalPronouns = [
    { german: "ich", english: "I" }, { german: "du", english: "you (informal singular)" },
    { german: "er", english: "he" }, { german: "sie", english: "she" },
    { german: "es", english: "it" }, { german: "wir", english: "we" },
    { german: "ihr", english: "you (informal plural)" }, { german: "sie", english: "they" },
    { german: "Sie", english: "you (formal)" }
  ];
  const questionWords = [
    { german: "wer", english: "who" }, { german: "was", english: "what" },
    { german: "wo", english: "where" }, { german: "woher", english: "where from" },
    { german: "wohin", english: "where to" }, { german: "wann", english: "when" },
    { german: "warum", english: "why" }, { german: "wie", english: "how" },
    { german: "welcher/welche/welches", english: "which" }
  ];

  const alphabet = [
    { letter: "A", name: "Ah" }, { letter: "B", name: "Beh" }, { letter: "C", name: "Tseh" },
    { letter: "D", name: "Deh" }, { letter: "E", name: "Eh" }, { letter: "F", name: "Eff" },
    { letter: "G", name: "Geh" }, { letter: "H", name: "Hah" }, { letter: "I", name: "Ee" },
    { letter: "J", name: "Yott" }, { letter: "K", name: "Kah" }, { letter: "L", name: "Ell" },
    { letter: "M", name: "M" }, { letter: "N", name: "Enn" }, { letter: "O", name: "Oh" },
    { letter: "P", name: "Peh" }, { letter: "Q", name: "Kuh" }, { letter: "R", name: "Err" },
    { letter: "S", name: "Ess" }, { letter: "T", name: "Teh" }, { letter: "U", name: "Uuh" },
    { letter: "V", name: "Fau" }, { letter: "W", name: "Veh" }, { letter: "X", name: "Iks" },
    { letter: "Y", name: "Ypsilon" }, { letter: "Z", name: "Tsett" }, { letter: "Ä", name: "Ae" },
    { letter: "Ö", name: "Oe" }, { letter: "Ü", name: "Ue" }, { letter: "ß", name: "Eszett" }
  ];

  const casesData = [
    {
      name: "Nominative", usage: "subject of the sentence (who/what is doing the action)",
      articles: { der: "der", die: "die", das: "das", plural: "die" },
      example: { german: "Der Hund schläft.", english: "The dog sleeps." }
    },
    {
      name: "Accusative", usage: "direct object (who/what receives the action)",
      articles: { der: "den", die: "die", das: "das", plural: "die" },
      example: { german: "Ich sehe den Hund.", english: "I see the dog." }
    },
    {
      name: "Dative", usage: "indirect object (to/for whom)",
      articles: { der: "dem", die: "der", das: "dem", plural: "den" },
      example: { german: "Ich gebe dem Hund einen Knochen.", english: "I give the dog a bone." }
    },
    {
      name: "Genitive", usage: "possession (whose)",
      articles: { der: "des", die: "der", das: "des", plural: "der" },
      example: { german: "Das ist das Haus des Mannes.", english: "That is the man's house." }
    }
  ];

  const prepositions = [
    { case: "Accusative", preps: ["durch (through)", "für (for)", "gegen (against)", "ohne (without)", "um (around)"] },
    { case: "Dative", preps: ["aus (out of)", "bei (at/near)", "mit (with)", "nach (after/to)", "von (from)", "zu (to)"] },
    { case: "Two‑way (acc/dat)", preps: ["an (on/at)", "auf (on top of)", "hinter (behind)", "in (in/into)", "neben (next to)", "über (over)", "unter (under)", "vor (in front of)", "zwischen (between)"] }
  ];

  const separableVerbs = [
    { infinitive: "aufstehen", meaning: "to get up", example: "Ich stehe um 7 Uhr auf." },
    { infinitive: "anrufen", meaning: "to call (by phone)", example: "Er ruft seine Mutter an." },
    { infinitive: "einkaufen", meaning: "to shop", example: "Wir kaufen heute Abend ein." },
    { infinitive: "mitkommen", meaning: "to come along", example: "Kommst du mit?" },
    { infinitive: "weggehen", meaning: "to go away", example: "Sie geht nicht weg." }
  ];

  const modalParticles = [
    { particle: "ja", usage: "as you know / obviously", example: "Das ist ja toll!" },
    { particle: "doch", usage: "contrary to expectation / encouraging", example: "Komm doch rein!" },
    { particle: "mal", usage: "softens commands / 'just'", example: "Schau mal!" },
    { particle: "halt", usage: "just / simply (colloquial)", example: "Das ist halt so." },
    { particle: "eben", usage: "just / precisely (similar to halt)", example: "Dann mach es eben." }
  ];

  const adjComparatives = [
    { positive: "groß", comparative: "größer", superlative: "am größten", meaning: "big" },
    { positive: "schnell", comparative: "schneller", superlative: "am schnellsten", meaning: "fast" },
    { positive: "gut", comparative: "besser", superlative: "am besten", meaning: "good" },
    { positive: "gern", comparative: "lieber", superlative: "am liebsten", meaning: "gladly" }
  ];

  const pastExamples = [
    { verb: "sein", präteritum: "war", perfekt: "bin gewesen", meaning: "to be", example: "Ich war müde. / Ich bin müde gewesen." },
    { verb: "haben", präteritum: "hatte", perfekt: "habe gehabt", meaning: "to have", example: "Er hatte keine Zeit. / Er hat keine Zeit gehabt." },
    { verb: "gehen", präteritum: "ging", perfekt: "bin gegangen", meaning: "to go", example: "Wir gingen nach Hause. / Wir sind nach Hause gegangen." },
    { verb: "essen", präteritum: "aß", perfekt: "habe gegessen", meaning: "to eat", example: "Sie aß einen Apfel. / Sie hat einen Apfel gegessen." }
  ];

 return (
  <div className="bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 font-sans">
    {/* Scroll progress bar */}
    <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
      <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-200" style={{ width: `${scrollProgress}%` }}></div>
    </div>

    {/* Sticky Navigation Bar */}
    <nav className="sticky top-2 z-40 bg-white/80 backdrop-blur-md rounded-full shadow-lg mx-4 my-2 p-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
      <ul className="flex gap-2 px-2">
        {navLinks.map(link => (
          <li key={link.id}>
            <button
              onClick={() => scrollToSection(link.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                activeSection === link.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-purple-100"
              }`}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>

    {modalVerb && (
      <ConjugationModal
        verb={modalVerb}
        infinitive={modalInfinitive}
        english={modalEnglish}
        onClose={closeModal}
      />
    )}

    {/* Hero Section */}
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20">
      <motion.h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
        🇩🇪 German Journey
      </motion.h1>
      <p className="text-xl md:text-2xl mt-6 text-gray-700 max-w-2xl">
        Scroll down & learn <span className="font-bold">alphabet, numbers, pronouns, sentence structure, {chunks.length} chunks, {verbs.length} verbs, {nouns.length} nouns</span> — plus days, months, colors!
      </p>
      <p className="text-md mt-2 text-gray-600">🔊 Click speaker for pronunciation. 📖 Click book icon for full conjugation.</p>
      <div className="mt-12 animate-bounce">👇</div>
    </section>

    {/* Flashcards Section */}
    <section id="flashcards" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">📇 Interactive Flashcards</h2>
          <p className="text-center text-gray-600 mb-6">Tap to flip • {allFlashcards.length} cards (nouns, verbs, phrases)</p>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md h-80 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-xl flex flex-col justify-center items-center p-6 cursor-pointer transition-transform hover:scale-105" onClick={() => setIsFlipped(!isFlipped)}>
              <div className="text-center">
                {!isFlipped ? (
                  <>
                    <p className="text-sm text-purple-600 mb-2">🇩🇪 German</p>
                    <p className="text-2xl font-bold text-gray-800">{allFlashcards[flashcardIndex]?.front}</p>
                    <PronounceButton word={allFlashcards[flashcardIndex]?.front} />
                  </>
                ) : (
                  <>
                    <p className="text-sm text-green-600 mb-2">🇬🇧 English</p>
                    <p className="text-2xl font-bold text-gray-800">{allFlashcards[flashcardIndex]?.back}</p>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={prevFlashcard} className="bg-purple-500 text-white px-4 py-2 rounded-full shadow hover:bg-purple-600 transition">◀ Previous</button>
              <button onClick={randomFlashcard} className="bg-gray-500 text-white px-4 py-2 rounded-full shadow hover:bg-gray-600 transition">🎲 Random</button>
              <button onClick={nextFlashcard} className="bg-purple-500 text-white px-4 py-2 rounded-full shadow hover:bg-purple-600 transition">Next ▶</button>
            </div>
            <p className="text-sm text-gray-500 mt-4">Card {flashcardIndex+1} of {allFlashcards.length}</p>
            <p className="text-xs text-gray-400 mt-2">💡 Tip: Click on the card to flip and reveal the English translation.</p>
          </div>
        </div>
      </ScrollReveal>
    </section>

    {/* Verb Quiz Section */}
    <section id="verb-quiz" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">📝 Verb Quiz</h2>
          <p className="text-center text-gray-600 mb-6">What is the English meaning of the German verb?</p>
          {verbQuiz.current && (
            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-xl p-6 shadow text-center">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-2xl font-bold text-purple-700">{verbQuiz.current.question}</p>
                  <PronounceButton word={verbQuiz.current.question} />
                </div>
                <div className="grid grid-cols-1 gap-3 mt-6">
                  {verbQuiz.options.map((opt, idx) => (
                    <button key={idx} onClick={() => handleVerbAnswer(opt)} disabled={verbQuiz.answered} className="bg-gray-100 hover:bg-purple-100 p-3 rounded-xl transition">{opt}</button>
                  ))}
                </div>
                {verbQuiz.feedback && (
                  <div className="mt-4 p-2 rounded bg-gray-100">
                    <p className="font-semibold">{verbQuiz.feedback}</p>
                    <p className="text-sm text-gray-600">Score: {verbQuiz.score}</p>
                  </div>
                )}
                <button onClick={nextVerbQuestion} className="mt-6 bg-green-500 text-white px-6 py-2 rounded-full shadow hover:bg-green-600 transition">Next Question →</button>
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>

    {/* Noun Quiz Section */}
    <section id="noun-quiz" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">🏷️ Noun Quiz</h2>
          <p className="text-center text-gray-600 mb-6">What is the English meaning of the German noun (with article)?</p>
          {nounQuiz.current && (
            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-xl p-6 shadow text-center">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-2xl font-bold text-purple-700">{nounQuiz.current.question}</p>
                  <PronounceButton word={nounQuiz.current.question} />
                </div>
                <div className="grid grid-cols-1 gap-3 mt-6">
                  {nounQuiz.options.map((opt, idx) => (
                    <button key={idx} onClick={() => handleNounAnswer(opt)} disabled={nounQuiz.answered} className="bg-gray-100 hover:bg-purple-100 p-3 rounded-xl transition">{opt}</button>
                  ))}
                </div>
                {nounQuiz.feedback && (
                  <div className="mt-4 p-2 rounded bg-gray-100">
                    <p className="font-semibold">{nounQuiz.feedback}</p>
                    <p className="text-sm text-gray-600">Score: {nounQuiz.score}</p>
                  </div>
                )}
                <button onClick={nextNounQuestion} className="mt-6 bg-green-500 text-white px-6 py-2 rounded-full shadow hover:bg-green-600 transition">Next Question →</button>
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>

    {/* Phrase Quiz Section */}
    <section id="phrase-quiz" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">💬 Phrase Quiz</h2>
          <p className="text-center text-gray-600 mb-6">What is the English translation of the German phrase?</p>
          {phraseQuiz.current && (
            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-xl p-6 shadow text-center">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-2xl font-bold text-purple-700">{phraseQuiz.current.question}</p>
                  <PronounceButton word={phraseQuiz.current.question} />
                </div>
                <div className="grid grid-cols-1 gap-3 mt-6">
                  {phraseQuiz.options.map((opt, idx) => (
                    <button key={idx} onClick={() => handlePhraseAnswer(opt)} disabled={phraseQuiz.answered} className="bg-gray-100 hover:bg-purple-100 p-3 rounded-xl transition">{opt}</button>
                  ))}
                </div>
                {phraseQuiz.feedback && (
                  <div className="mt-4 p-2 rounded bg-gray-100">
                    <p className="font-semibold">{phraseQuiz.feedback}</p>
                    <p className="text-sm text-gray-600">Score: {phraseQuiz.score}</p>
                  </div>
                )}
                <button onClick={nextPhraseQuestion} className="mt-6 bg-green-500 text-white px-6 py-2 rounded-full shadow hover:bg-green-600 transition">Next Question →</button>
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>

    {/* Numbers Section */}
    <section id="numbers" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">🔢 German Numbers</h2>
          <p className="text-center text-gray-600 mb-6">Count from zero to one hundred and beyond</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-3">0–20</h3>
              <div className="grid grid-cols-2 gap-2">
                {numbersBasic.map(num => (
                  <div key={num.german} className="bg-white p-2 rounded-xl shadow flex items-center justify-between">
                    <span><span className="font-bold">{num.german}</span> – {num.english}</span>
                    <PronounceButton word={num.german} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Tens & 100</h3>
              <div className="grid grid-cols-2 gap-2">
                {tens.map(num => (
                  <div key={num.german} className="bg-white p-2 rounded-xl shadow flex items-center justify-between">
                    <span><span className="font-bold">{num.german}</span> – {num.english}</span>
                    <PronounceButton word={num.german} />
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                <p className="text-sm font-semibold">📌 How to form numbers 21–99:</p>
                <p className="text-sm">"einundzwanzig" = eins + und + zwanzig (one‑and‑twenty)</p>
                <p className="text-sm">"fünfundvierzig" = fünf + und + vierzig</p>
                <p className="text-sm">"hundert" = 100, "tausend" = 1000</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-4 text-sm font-semibold text-green-700">✅ Numbers from 0 to 100+ mastered!</div>
        </div>
      </ScrollReveal>
    </section>

    {/* Alphabet Section */}
    <section id="alphabet" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
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
      </ScrollReveal>
    </section>

    {/* Pronouns & Question Words */}
    <section id="pronouns" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">👤 Personal Pronouns & ❓ Question Words</h2>
          <p className="text-center text-gray-600 mb-6">The building blocks of every sentence</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-purple-700 mb-3">Personal Pronouns (Subjekt)</h3>
              <div className="grid grid-cols-2 gap-2">
                {personalPronouns.map((pron, idx) => (
                  <div key={idx} className="bg-white p-2 rounded-xl shadow flex items-center justify-between">
                    <span><span className="font-bold">{pron.german}</span> – {pron.english}</span>
                    <PronounceButton word={pron.german} />
                  </div>
                ))}
              </div>
              <div className="mt-3 text-sm text-gray-600">Note: "Sie" (capital S) = formal you; "sie" (lowercase) = she or they.</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-700 mb-3">Fundamental Question Words</h3>
              <div className="grid grid-cols-2 gap-2">
                {questionWords.map((qw, idx) => (
                  <div key={idx} className="bg-white p-2 rounded-xl shadow flex items-center justify-between">
                    <span><span className="font-bold">{qw.german}</span> – {qw.english}</span>
                    <PronounceButton word={qw.german.split('/')[0]} />
                  </div>
                ))}
              </div>
              <div className="mt-3 text-sm text-gray-600">Use these to form open questions. The verb follows immediately.</div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>

    {/* Sentence Structure */}
    <section id="sentence-structure" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">📝 German Sentence Structure</h2>
          <p className="text-center text-gray-600 mb-6">How to build correct sentences – with English translations</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl">
              <h3 className="text-xl font-bold text-purple-700">1. Main Clause (Aussagesatz)</h3>
              <p className="mt-2"><span className="font-mono">SUBJECT + VERB + REST</span></p>
              <div className="mt-3 space-y-2">
                <div className="bg-gray-100 p-2 rounded">Ich <strong>lerne</strong> Deutsch. → <em>I learn German.</em></div>
                <div className="bg-gray-100 p-2 rounded">Er <strong>kommt</strong> morgen. → <em>He comes tomorrow.</em></div>
                <div className="bg-gray-100 p-2 rounded">Wir <strong>wohnen</strong> in Berlin. → <em>We live in Berlin.</em></div>
              </div>
              <h3 className="text-xl font-bold text-purple-700 mt-4">2. Yes/No Question (Entscheidungsfrage)</h3>
              <p className="mt-2"><span className="font-mono">VERB + SUBJECT + REST ?</span></p>
              <div className="mt-2 space-y-2">
                <div className="bg-gray-100 p-2 rounded"><strong>Lernst</strong> du Deutsch? → <em>Do you learn German?</em></div>
                <div className="bg-gray-100 p-2 rounded"><strong>Kommt</strong> er morgen? → <em>Does he come tomorrow?</em></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <h3 className="text-xl font-bold text-purple-700">3. W‑Questions (W-Fragen)</h3>
              <p className="mt-2"><span className="font-mono">QUESTION WORD + VERB + SUBJECT + REST ?</span></p>
              <div className="mt-3 space-y-2">
                <div className="bg-gray-100 p-2 rounded"><strong>Wo</strong> wohnst du? → <em>Where do you live?</em></div>
                <div className="bg-gray-100 p-2 rounded"><strong>Was</strong> machst du? → <em>What are you doing?</em></div>
                <div className="bg-gray-100 p-2 rounded"><strong>Warum</strong> lernst du Deutsch? → <em>Why are you learning German?</em></div>
                <div className="bg-gray-100 p-2 rounded"><strong>Wie</strong> heißt du? → <em>What's your name?</em></div>
              </div>
              <h3 className="text-xl font-bold text-purple-700 mt-4">4. Modal Verbs</h3>
              <p><span className="font-mono">MODAL + SUBJECT + ... + MAIN VERB (at end)</span></p>
              <div className="mt-2 space-y-2">
                <div className="bg-gray-100 p-2 rounded">Ich <strong>kann</strong> gut Deutsch <strong>sprechen</strong>. → <em>I can speak German well.</em></div>
                <div className="bg-gray-100 p-2 rounded">Du <strong>musst</strong> jetzt <strong>gehen</strong>. → <em>You must go now.</em></div>
                <div className="bg-gray-100 p-2 rounded">Wir <strong>wollen</strong> ein Auto <strong>kaufen</strong>. → <em>We want to buy a car.</em></div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 rounded-xl text-center">
            <p className="font-semibold">✨ Key rule: The conjugated verb is ALWAYS in second position in main clauses.</p>
          </div>
        </div>
      </ScrollReveal>
    </section>

    {/* Verbs List */}
    <section id="verbs" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">⚡ 100 Essential Verbs</h2>
          <p className="text-center text-gray-600 mb-6">Click 📖 to see full conjugation and hear every form</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {verbs.map((verb, idx) => (
              <div key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-xl hover:scale-105 transition flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-indigo-800">{verb.infinitive}</span>
                  <span className="text-xs text-gray-500 block">({verb.english})</span>
                </div>
                <div className="flex gap-1">
                  <PronounceButton word={verb.infinitive} />
                  <button onClick={() => openModal(verb.infinitive, verb.infinitive, verb.english)} className="text-gray-500 hover:text-purple-600 transition text-lg" title="Show conjugation">📖</button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 text-sm font-semibold text-green-700">✅ {verbs.length} verbs – click the book to see and hear each conjugated form.</div>
        </div>
      </ScrollReveal>
    </section>

    {/* Nouns List */}
    <section id="nouns" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">🏷️ {nouns.length} Nouns (with Articles)</h2>
          <p className="text-center text-gray-600 mb-6">der, die, das – master the gender</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[600px] overflow-y-auto p-2">
            {nouns.map((noun, idx) => (
              <div key={idx} className={`p-2 rounded-xl shadow-sm border-l-8 flex items-center justify-between ${noun.article === 'der' ? 'border-blue-400 bg-blue-50' : noun.article === 'die' ? 'border-pink-400 bg-pink-50' : 'border-green-400 bg-green-50'}`}>
                <div>
                  <span className="font-bold">{noun.article} {noun.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {noun.english}</span>
                </div>
                <PronounceButton word={`${noun.article} ${noun.german}`} />
              </div>
            ))}
          </div>
          <div className="text-center mt-6 text-sm font-semibold text-green-700">✅ Total nouns: {nouns.length}</div>
        </div>
      </ScrollReveal>
    </section>

    {/* Chunks */}
    <section id="chunks" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">💬 {chunks.length} German Chunks</h2>
          <p className="text-center text-gray-600 mb-6">Speak naturally from day one – each phrase with English translation</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto p-2">
            {chunks.map((chunk, idx) => (
              <div key={idx} className="bg-amber-50 p-2 rounded-xl shadow flex items-center justify-between hover:bg-amber-100">
                <div>
                  <span className="font-medium">{chunk.german}</span>
                  <span className="text-gray-500 text-sm ml-2">– {chunk.english}</span>
                </div>
                <PronounceButton word={chunk.german} />
              </div>
            ))}
          </div>
          <div className="text-center mt-6 text-sm font-semibold text-green-700">✅ {chunks.length} practical chunks + English meanings!</div>
        </div>
      </ScrollReveal>
    </section>

    {/* Cases */}
    <section id="cases" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">📚 Grammar Deep‑Dive: The Four Cases</h2>
          <p className="text-center text-gray-600 mb-6">Nominative • Accusative • Dative • Genitive</p>
          <div className="grid md:grid-cols-2 gap-8">
            {casesData.map(c => (
              <div key={c.name} className="bg-white rounded-xl p-4 shadow">
                <h3 className="text-xl font-bold text-purple-700">{c.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{c.usage}</p>
                <table className="w-full mt-3 text-sm border-collapse">
                  <thead><tr className="border-b"><th className="text-left">Gender</th><th>Article</th></tr></thead>
                  <tbody>
                    <tr><td className="py-1">der (masc)</td><td>{c.articles.der}</td></tr>
                    <tr><td className="py-1">die (fem)</td><td>{c.articles.die}</td></tr>
                    <tr><td className="py-1">das (neut)</td><td>{c.articles.das}</td></tr>
                    <tr><td className="py-1">plural</td><td>{c.articles.plural}</td></tr>
                  </tbody>
                </table>
                <div className="mt-3 bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span><strong>📖 Example:</strong> {c.example.german} – <em>{c.example.english}</em></span>
                  <PronounceButton word={c.example.german.split(' ')[0]} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-3 bg-blue-50 rounded-xl text-sm">
            💡 <strong>Tip:</strong> The genitive is often replaced by "von" + dative in everyday speech.
          </div>
        </div>
      </ScrollReveal>
    </section>

    {/* Prepositions */}
    <section id="prepositions" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">📍 Prepositions & Their Cases</h2>
          <p className="text-center text-gray-600 mb-6">Always learn a preposition together with the case it triggers</p>
          <div className="grid md:grid-cols-3 gap-6">
            {prepositions.map(p => (
              <div key={p.case} className="bg-white rounded-xl p-4">
                <h3 className="text-lg font-bold text-center p-2 rounded bg-purple-100">{p.case}</h3>
                <ul className="mt-3 space-y-1 list-disc list-inside">
                  {p.preps.map(prep => <li key={prep}>{prep}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 p-3 bg-yellow-50 rounded-xl text-sm">
            🔁 <strong>Two‑way prepositions</strong>: accusative for movement, dative for location.
          </div>
        </div>
      </ScrollReveal>
    </section>

    {/* Separable Verbs */}
    <section id="separable" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">✂️ Separable Verbs (trennbare Verben)</h2>
          <p className="text-center text-gray-600 mb-6">The prefix moves to the end in main clauses</p>
          <div className="grid md:grid-cols-2 gap-4">
            {separableVerbs.map(v => (
              <div key={v.infinitive} className="bg-white p-3 rounded-xl shadow flex justify-between items-center">
                <div>
                  <span className="font-mono font-bold text-indigo-800">{v.infinitive}</span>
                  <span className="text-gray-600 text-sm ml-2">({v.meaning})</span>
                  <div className="text-sm text-gray-700 mt-1">🔹 <em>{v.example}</em></div>
                  <div className="text-xs text-gray-500">→ Infinitive: {v.infinitive} | Conjugated: prefix at end</div>
                </div>
                <PronounceButton word={v.infinitive} />
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-xl text-sm">
            📌 Rule: In present tense, the prefix is separated and placed at the end of the clause.<br />
            <em>„Ich <strong>stehe</strong> früh <strong>auf</strong>.“</em> (I get up early.)
          </div>
        </div>
      </ScrollReveal>
    </section>

    {/* Modal Particles */}
    <section id="particles" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">✨ Modal Particles – Add Natural Flavour</h2>
          <p className="text-center text-gray-600 mb-6">Small words that convey emotion, attitude, or emphasis</p>
          <div className="grid md:grid-cols-2 gap-4">
            {modalParticles.map(p => (
              <div key={p.particle} className="bg-white p-3 rounded-xl shadow flex justify-between items-start">
                <div>
                  <span className="font-bold text-lg text-purple-700">{p.particle}</span>
                  <p className="text-sm text-gray-600">{p.usage}</p>
                  <p className="text-sm mt-1">📖 <em>{p.example}</em></p>
                </div>
                <PronounceButton word={p.particle} />
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>

    {/* Comparatives */}
    <section id="comparatives" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">📈 Comparative & Superlative</h2>
          <p className="text-center text-gray-600 mb-6">How to say "bigger", "the biggest" etc.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-xl">
              <thead><tr className="bg-gray-200"><th className="p-2">Positive</th><th>Comparative</th><th>Superlative</th><th>Meaning</th><th>Pronounce</th></tr></thead>
              <tbody>
                {adjComparatives.map(adj => (
                  <tr key={adj.positive} className="border-b">
                    <td className="p-2">{adj.positive}</td>
                    <td className="p-2">{adj.comparative}</td>
                    <td className="p-2">{adj.superlative}</td>
                    <td className="p-2">{adj.meaning}</td>
                    <td className="p-2"><PronounceButton word={adj.comparative} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-gray-100 rounded-xl text-sm">
            📝 Examples: <em>„Mein Hund ist <strong>größer</strong> als deiner.“</em><br />
            <em>„Das Auto ist <strong>am schnellsten</strong>.“</em>
          </div>
        </div>
      </ScrollReveal>
    </section>

    {/* Past Tense */}
    <section id="past" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
      <ScrollReveal>
        <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-2">⏳ Past Tense: Präteritum & Perfekt</h2>
          <p className="text-center text-gray-600 mb-6">How to talk about the past – two common forms</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl">
              <h3 className="text-xl font-bold text-purple-700">Präteritum (simple past)</h3>
              <p className="text-sm">Used mainly in writing and for modal/auxiliary verbs in speech.</p>
              <table className="w-full mt-2 text-sm">
                <thead><tr><th>Verb</th><th>Präteritum</th><th>Meaning</th></tr></thead>
                <tbody>
                  {pastExamples.map(v => <tr key={v.verb}><td>{v.verb}</td><td>{v.präteritum}</td><td>{v.meaning}</td></tr>)}
                </tbody>
              </table>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <h3 className="text-xl font-bold text-purple-700">Perfekt (present perfect)</h3>
              <p className="text-sm">Most common spoken past tense: haben/sein + past participle.</p>
              <table className="w-full mt-2 text-sm">
                <thead><tr><th>Verb</th><th>Perfekt</th><th>Meaning</th></tr></thead>
                <tbody>
                  {pastExamples.map(v => <tr key={v.verb}><td>{v.verb}</td><td>{v.perfekt}</td><td>{v.meaning}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
              <span><strong>Präteritum:</strong> <em>„Gestern <strong>ging</strong> ich ins Kino.“</em> – Yesterday I went to the cinema.</span>
              <PronounceButton word="ging" />
            </div>
            <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
              <span><strong>Perfekt:</strong> <em>„Ich <strong>bin gestern ins Kino gegangen</strong>.“</em></span>
              <PronounceButton word="bin gegangen" />
            </div>
          </div>
          <div className="mt-4 text-center text-sm font-semibold text-green-700">
            ✅ Most verbs form Perfekt with „haben“; verbs of movement/change of state use „sein“.
          </div>
        </div>
      </ScrollReveal>
    </section>

    {/* Final Celebration */}
    <section className="py-20 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-yellow-300 to-orange-400 rounded-3xl p-10 max-w-4xl mx-auto shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-white">🎉 Herzlichen Glückwunsch! 🎉</h2>
        <p className="text-xl text-white mt-4">You've completed the German learning journey!</p>
        <div className="mt-6 text-white text-lg">
          <p>📚 You learned: <strong>Alphabet, Numbers, Pronouns, Sentence Structure, Cases, Prepositions, Separable Verbs, Modal Particles, Comparatives, Past Tenses, {verbs.length} verbs, {nouns.length} nouns, {chunks.length} chunks</strong> + more!</p>
          <p className="mt-2">✨ Keep practicing and you'll be fluent in no time! ✨</p>
        </div>
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="mt-8 bg-white text-orange-600 px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition">⬆️ Start Over</button>
      </motion.div>
    </section>
  </div>
);
};

export default GermanLearningJourney;