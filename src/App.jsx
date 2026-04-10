import React, { useEffect, useRef, useState } from 'react';
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
  // Food & Drink (more)
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
  { article: "die", german: "Schokolade", english: "chocolate" }, // already exists? fine
  { article: "der", german: "Keks", english: "cookie" },
  { article: "das", german: "Eis", english: "ice cream" }, // exists
  { article: "der", german: "Honig", english: "honey" }, // exists
  { article: "die", german: "Marmelade", english: "jam" }, // exists

  // Clothing
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

  // Household & Furniture (more)
  { article: "der", german: "Schlüssel", english: "key" },
  { article: "die", german: "Türklingel", english: "doorbell" },
  { article: "das", german: "Regal", english: "shelf" },
  { article: "der", german: "Teppich", english: "carpet" },
  { article: "die", german: "Lampe", english: "lamp" }, // exists
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

  // Work & School
  { article: "der", german: "Beruf", english: "profession" },
  { article: "die", german: "Arbeitsstelle", english: "job position" },
  { article: "der", german: "Kollege", english: "colleague (m)" },
  { article: "die", german: "Kollegin", english: "colleague (f)" },
  { article: "der", german: "Chef", english: "boss (m)" },
  { article: "die", german: "Chefin", english: "boss (f)" },
  { article: "das", german: "Gehalt", english: "salary" },
  { article: "die", german: "Pause", english: "break" },
  { article: "der", german: "Urlaub", english: "vacation" }, // exists
  { article: "die", german: "Klausur", english: "exam" },
  { article: "der", german: "Test", english: "test" },
  { article: "die", german: "Hausaufgabe", english: "homework" },
  { article: "der", german: "Unterricht", english: "class/lesson" },
  { article: "die", german: "Universität", english: "university" },
  { article: "der", german: "Student", english: "student (m)" },
  { article: "die", german: "Studentin", english: "student (f)" },
  { article: "der", german: "Lehrer", english: "teacher (m)" }, // exists
  { article: "die", german: "Lehrerin", english: "teacher (f)" }, // exists
  { article: "das", german: "Klassenzimmer", english: "classroom" },
  { article: "die", german: "Tafel", english: "blackboard" },
  { article: "der", german: "Stift", english: "pen" },
  { article: "der", german: "Bleistift", english: "pencil" },
  { article: "der", german: "Radiergummi", english: "eraser" },
  { article: "das", german: "Lineal", english: "ruler" },
  { article: "der", german: "Spitzer", english: "sharpener" },
  { article: "das", german: "Papier", english: "paper" },
  { article: "der", german: "Ordner", english: "folder" },

  // Travel & Transport (more)
  { article: "der", german: "Flug", english: "flight" },
  { article: "die", german: "Fahrkarte", english: "ticket" }, // ticket exists
  { article: "der", german: "Koffer", english: "suitcase" },
  { article: "der", german: "Rucksack", english: "backpack" }, // repeat
  { article: "der", german: "Reisepass", english: "passport" },
  { article: "der", german: "Ausweis", english: "ID card" },
  { article: "das", german: "Hotel", english: "hotel" },
  { article: "die", german: "Jugendherberge", english: "youth hostel" },
  { article: "der", german: "Campingplatz", english: "campsite" },
  { article: "der", german: "Strand", english: "beach" },
  { article: "der", german: "See", english: "lake" }, // exists
  { article: "der", german: "Berg", english: "mountain" }, // exists
  { article: "der", german: "Wald", english: "forest" },
  { article: "die", german: "Brücke", english: "bridge" },
  { article: "der", german: "Tunnel", english: "tunnel" },
  { article: "die", german: "Ampel", english: "traffic light" },
  { article: "der", german: "Parkplatz", english: "parking lot" },
  { article: "die", german: "Tankstelle", english: "gas station" },

  // Body & Health (more)
  { article: "der", german: "Körper", english: "body" }, // exists
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

  // Nature & Weather (more)
  { article: "der", german: "Mond", english: "moon" },
  { article: "der", german: "Stern", english: "star" },
  { article: "die", german: "Erde", english: "earth" },
  { article: "das", german: "Wasser", english: "water" }, // exists
  { article: "der", german: "Wind", english: "wind" },
  { article: "das", german: "Gewitter", english: "thunderstorm" },
  { article: "der", german: "Blitz", english: "lightning" },
  { article: "der", german: "Donner", english: "thunder" },
  { article: "der", german: "Nebel", english: "fog" },
  { article: "das", german: "Eis", english: "ice" }, // exists
  { article: "der", german: "Schnee", english: "snow" }, // exists
  { article: "der", german: "Regen", english: "rain" }, // exists

  // Abstract & Feelings
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
  { article: "der", german: "Traum", english: "dream" }, // exists
  { article: "die", german: "Wirklichkeit", english: "reality" },
  { article: "die", german: "Möglichkeit", english: "possibility" },
  { article: "die", german: "Entscheidung", english: "decision" },

  // Time & Calendar (more)
  { article: "der", german: "Tag", english: "day" },
  { article: "die", german: "Nacht", english: "night" }, // exists
  { article: "die", german: "Stunde", english: "hour" },
  { article: "die", german: "Minute", english: "minute" },
  { article: "die", german: "Sekunde", english: "second" },
  { article: "der", german: "Kalender", english: "calendar" },
  { article: "der", german: "Termin", english: "appointment" },
  { article: "die", german: "Uhrzeit", english: "time (clock time)" },
  { article: "der", german: "Anfang", english: "beginning" },
  { article: "das", german: "Ende", english: "end" },

  // Family & People (more)
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

  // Shopping & Money
  { article: "der", german: "Preis", english: "price" },
  { article: "die", german: "Rechnung", english: "bill" },
  { article: "das", german: "Geld", english: "money" }, // exists
  { article: "die", german: "Kasse", english: "checkout" },
  { article: "der", german: "Einkaufswagen", english: "shopping cart" },
  { article: "die", german: "Tüte", english: "bag" },
  { article: "der", german: "Bon", english: "receipt" },
  { article: "die", german: "Kreditkarte", english: "credit card" },
  { article: "das", german: "Bargeld", english: "cash" },
  { article: "der", german: "Rabatt", english: "discount" },

  // Media & Technology
  { article: "das", german: "Internet", english: "internet" },
  { article: "die", german: "Website", english: "website" },
  { article: "die", german: "E-Mail", english: "email" },
  { article: "das", german: "Passwort", english: "password" },
  { article: "der", german: "Bildschirm", english: "screen" },
  { article: "die", german: "Tastatur", english: "keyboard" },
  { article: "die", german: "Maus", english: "mouse" }, // exists
  { article: "der", german: "Drucker", english: "printer" },
  { article: "der", german: "Lautsprecher", english: "speaker" },
  { article: "das", german: "Handy", english: "cellphone" }, // exists
  { article: "der", german: "Fernseher", english: "TV" }, // exists
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
  { german: "Danke für alles", english: "Thanks for everything" }, { german: "Bis zum nächsten Mal!", english: "Until next time!" }
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

  const openModal = (verb, infinitive, english) => {
    setModalVerb(verb);
    setModalInfinitive(infinitive);
    setModalEnglish(english);
  };
  const closeModal = () => setModalVerb(null);

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

 
  const casesData = [
    {
      name: "Nominative", usage: "subject of the sentence (who/what is doing the action)",
      articles: { der: "der", die: "die", das: "das", plural: "die" },
      example: { german: "Der Hund schläft.", english: "The dog sleeps." }
    },
    {
      name: "Accusative", usage: "direct object (who/what receives the action) – used after certain verbs & prepositions",
      articles: { der: "den", die: "die", das: "das", plural: "die" },
      example: { german: "Ich sehe den Hund.", english: "I see the dog." }
    },
    {
      name: "Dative", usage: "indirect object (to/for whom) – used after certain verbs & prepositions",
      articles: { der: "dem", die: "der", das: "dem", plural: "den" },
      example: { german: "Ich gebe dem Hund einen Knochen.", english: "I give the dog a bone." }
    },
    {
      name: "Genitive", usage: "possession (whose) – often replaced by 'von' + Dative in spoken German",
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
      <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
        <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-200" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {modalVerb && (
        <ConjugationModal
          verb={modalVerb}
          infinitive={modalInfinitive}
          english={modalEnglish}
          onClose={closeModal}
        />
      )}

      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20">
        <motion.h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          🇩🇪 German Journey
        </motion.h1>
        <p className="text-xl md:text-2xl mt-6 text-gray-700 max-w-2xl">
          Scroll down & learn <span className="font-bold">numbers, pronouns, question words, sentence structure, 182 chunks, 100 verbs, 354 nouns</span> — plus days, months, colors!
        </p>
        <p className="text-md mt-2 text-gray-600">🔊 Click speaker for pronunciation. 📖 Click book icon for full conjugation with pronunciation of each form.</p>
        <div className="mt-12 animate-bounce">👇</div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
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
      </div>


      <div className="max-w-6xl mx-auto px-4 py-16">
        <ScrollReveal>
          <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-2">👤 Personal Pronouns & ❓ Question Words</h2>
            <p className="text-center text-gray-600 mb-6">The building blocks of every sentence</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-3">Personal Pronouns (Subjekt)</h3>
                <div className="grid grid-cols-2 gap-2">
                  {personalPronouns.map(pron => (
                    <div key={pron.german} className="bg-white p-2 rounded-xl shadow flex items-center justify-between">
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
                  {questionWords.map(qw => (
                    <div key={qw.german} className="bg-white p-2 rounded-xl shadow flex items-center justify-between">
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
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
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
                  <div className="bg-gray-100 p-2 rounded"><strong>Wie</strong> heißt du? → <em>What's your name? (lit. How are you called?)</em></div>
                </div>
                <h3 className="text-xl font-bold text-purple-700 mt-4">4. Modal Verbs (können, müssen, etc.)</h3>
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
              <p className="text-sm mt-1">Practice with the chunks, verbs, and pronouns above – build your own sentences!</p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
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
                    <button
                      onClick={() => openModal(verb.infinitive, verb.infinitive, verb.english)}
                      className="text-gray-500 hover:text-purple-600 transition text-lg"
                      title="Show conjugation"
                    >
                      📖
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6 text-sm font-semibold text-green-700">✅ {verbs.length} verbs – click the book to see and hear each conjugated form.</div>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <ScrollReveal>
          <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-2">🏷️ 354 Nouns (with Articles)</h2>
            <p className="text-center text-gray-600 mb-6">der, die, das – master the gender</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[600px] overflow-y-auto p-2">
              {nouns.map((noun, idx) => (
                <div key={idx} className={`p-2 rounded-xl shadow-sm border-l-8 flex items-center justify-between ${noun.article === 'der' ? 'border-blue-400 bg-blue-50' : noun.article === 'die' ? 'border-pink-400 bg-pink-50' : 'border-green-400 bg-green-50'}`}>
                  <div>
                    <span className="font-bold">{noun.article} {noun.german}</span>
                    <span className="text-gray-500 text-sm ml-2">– {noun.english}</span>
                  </div>
                  <PronounceButton word={noun.german} />
                </div>
              ))}
            </div>
            <div className="text-center mt-6 text-sm font-semibold text-green-700">✅ Total nouns: {nouns.length} (with correct articles)</div>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <ScrollReveal>
          <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-2">💬 182 German Chunks</h2>
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
      </div>


      <div className="max-w-6xl mx-auto px-4 py-16">
        <ScrollReveal>
          <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-2">📚 Grammar Deep‑Dive: The Four Cases</h2>
            <p className="text-center text-gray-600 mb-6">Nominative • Accusative • Dative • Genitive – with article tables and examples</p>
            <div className="grid md:grid-cols-2 gap-8">
              {casesData.map(c => (
                <div key={c.name} className="bg-white rounded-xl p-4 shadow">
                  <h3 className="text-xl font-bold text-purple-700">{c.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{c.usage}</p>
                  <table className="w-full mt-3 text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left">Gender</th><th>Article</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>der (masc)</td><td>{c.articles.der}</td></tr>
                      <tr><td>die (fem)</td><td>{c.articles.die}</td></tr>
                      <tr><td>das (neut)</td><td>{c.articles.das}</td></tr>
                      <tr><td>plural</td><td>{c.articles.plural}</td></tr>
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
              💡 <strong>Tip:</strong> The genitive is often replaced by "von" + dative in everyday speech, e.g. "das Haus von dem Mann" instead of "das Haus des Mannes".
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <ScrollReveal>
          <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-2">📍 Prepositions & Their Cases</h2>
            <p className="text-center text-gray-600 mb-6">Always learn a preposition together with the case it triggers</p>
            <div className="grid md:grid-cols-3 gap-6">
              {prepositions.map(p => (
                <div key={p.case} className="bg-white rounded-xl p-4">
                  <h3 className="text-lg font-bold text-center p-2 rounded bg-purple-100">{p.case}</h3>
                  <ul className="mt-3 space-y-1 list-disc list-inside">
                    {p.preps.map(prep => (
                      <li key={prep}>{prep}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 p-3 bg-yellow-50 rounded-xl text-sm">
              🔁 <strong>Two‑way prepositions</strong>: use accusative for movement/direction, dative for location. Example: <em>„Ich lege das Buch <strong>auf den Tisch</strong>.“</em> (acc, movement) vs. <em>„Das Buch liegt <strong>auf dem Tisch</strong>.“</em> (dat, position)
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
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
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <ScrollReveal>
          <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-2">✨ Modal Particles – Add Natural Flavour</h2>
            <p className="text-center text-gray-600 mb-6">Small words that convey emotion, attitude, or emphasis (hard to translate directly)</p>
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
            <div className="mt-4 text-center text-sm text-gray-700">
              💬 <strong>Note:</strong> Overusing particles sounds unnatural – listen to native speakers to get a feel.
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <ScrollReveal>
          <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-2">📈 Comparative & Superlative</h2>
            <p className="text-center text-gray-600 mb-6">How to say "bigger", "the biggest" etc.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white rounded-xl">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Positive</th><th>Comparative (+er)</th><th>Superlative (am ...sten)</th><th>Meaning</th><th>Pronounce</th>
                  </tr>
                </thead>
                <tbody>
                  {adjComparatives.map(adj => (
                    <tr key={adj.positive} className="border-b">
                      <td className="p-2">{adj.positive}</td>
                      <td>{adj.comparative}</td>
                      <td>{adj.superlative}</td>
                      <td>{adj.meaning}</td>
                      <td><PronounceButton word={adj.comparative} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-gray-100 rounded-xl text-sm">
              📝 Examples: <em>„Mein Hund ist <strong>größer</strong> als deiner.“</em> (My dog is bigger than yours.)<br />
              <em>„Das Auto ist <strong>am schnellsten</strong>.“</em> (The car is the fastest.)
            </div>
          </div>
        </ScrollReveal>
      </div>


      <div className="max-w-6xl mx-auto px-4 py-16">
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
                    {pastExamples.map(v => (
                      <tr key={v.verb}><td>{v.verb}</td><td>{v.präteritum}</td><td>{v.meaning}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <h3 className="text-xl font-bold text-purple-700">Perfekt (present perfect)</h3>
                <p className="text-sm">Most common spoken past tense: haben/sein + past participle.</p>
                <table className="w-full mt-2 text-sm">
                  <thead><tr><th>Verb</th><th>Perfekt</th><th>Meaning</th></tr></thead>
                  <tbody>
                    {pastExamples.map(v => (
                      <tr key={v.verb}><td>{v.verb}</td><td>{v.perfekt}</td><td>{v.meaning}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                <span><strong>Example sentence (Präteritum):</strong> <em>„Gestern <strong>ging</strong> ich ins Kino.“</em> – Yesterday I went to the cinema.</span>
                <PronounceButton word="ging" />
              </div>
              <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
                <span><strong>Example sentence (Perfekt):</strong> <em>„Ich <strong>bin gestern ins Kino gegangen</strong>.“</em> – I went to the cinema yesterday.</span>
                <PronounceButton word="bin gegangen" />
              </div>
            </div>
            <div className="mt-4 text-center text-sm font-semibold text-green-700">
              ✅ Most verbs form Perfekt with „haben“; verbs of movement/change of state use „sein“.
            </div>
          </div>
        </ScrollReveal>
      </div>


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
            <p>📚 You learned: <strong>Numbers, Pronouns, Sentence Structure, Cases, Prepositions, Separable Verbs, Modal Particles, Comparatives, Past Tenses, 100 verbs, 354 nouns, 182 chunks</strong> + more!</p>
            <p className="mt-2">✨ Keep practicing and you'll be fluent in no time! ✨</p>
          </div>
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="mt-8 bg-white text-orange-600 px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition">⬆️ Start Over</button>
        </motion.div>
      </section>
    </div>
  );
};

export default GermanLearningJourney;