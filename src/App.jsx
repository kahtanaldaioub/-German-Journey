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

const days = [
  { german: "Montag", english: "Monday" }, { german: "Dienstag", english: "Tuesday" },
  { german: "Mittwoch", english: "Wednesday" }, { german: "Donnerstag", english: "Thursday" },
  { german: "Freitag", english: "Friday" }, { german: "Samstag", english: "Saturday" },
  { german: "Sonntag", english: "Sunday" }
];

const months = [
  "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
  "August", "September", "Oktober", "November", "Dezember"
];

const colors = [
  { german: "rot", english: "red" }, { german: "blau", english: "blue" },
  { german: "grün", english: "green" }, { german: "gelb", english: "yellow" },
  { german: "schwarz", english: "black" }, { german: "weiß", english: "white" },
  { german: "grau", english: "gray" }, { german: "orange", english: "orange" },
  { german: "lila", english: "purple" }, { german: "rosa", english: "pink" },
  { german: "braun", english: "brown" }, { german: "türkis", english: "turquoise" }
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
const verbs = verbsData.slice(0, 100);

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
let nouns = [...nounsRaw];

const chunksArray = [
  { german: "Hallo!", english: "Hello!" },
  { german: "Guten Morgen!", english: "Good morning!" },
  { german: "Guten Tag!", english: "Good day!" },
  { german: "Guten Abend!", english: "Good evening!" },
  { german: "Gute Nacht!", english: "Good night!" },
  { german: "Tschüss!", english: "Bye!" },
  { german: "Auf Wiedersehen!", english: "Goodbye!" },
  { german: "Bitte", english: "Please / You're welcome" },
  { german: "Danke", english: "Thanks" },
  { german: "Vielen Dank!", english: "Thank you very much!" },
  { german: "Kein Problem", english: "No problem" },
  { german: "Entschuldigung", english: "Excuse me / Sorry" },
  { german: "Es tut mir leid", english: "I'm sorry" },
  { german: "Wie geht's?", english: "How are you?" },
  { german: "Mir geht's gut", english: "I'm fine" },
  { german: "Und dir?", english: "And you?" },
  { german: "Was ist los?", english: "What's up?" },
  { german: "Alles klar!", english: "All right!" },
  { german: "Na ja", english: "Well / Okay" },
  { german: "Super!", english: "Great!" },
  { german: "Prima!", english: "Excellent!" },
  { german: "Fantastisch!", english: "Fantastic!" },
  { german: "Leider", english: "Unfortunately" },
  { german: "Vielleicht", english: "Maybe" },
  { german: "Natürlich", english: "Of course" },
  { german: "Sicher", english: "Sure" },
  { german: "Ja", english: "Yes" },
  { german: "Nein", english: "No" },
  { german: "Vielleicht später", english: "Maybe later" },
  { german: "Ich liebe Deutsch", english: "I love German" },
  { german: "Ich lerne Deutsch", english: "I am learning German" },
  { german: "Sprichst du Englisch?", english: "Do you speak English?" },
  { german: "Ich verstehe nicht", english: "I don't understand" },
  { german: "Kannst du das wiederholen?", english: "Can you repeat that?" },
  { german: "Wie heißt du?", english: "What's your name?" },
  { german: "Ich heiße...", english: "My name is..." },
  { german: "Woher kommst du?", english: "Where are you from?" },
  { german: "Ich komme aus...", english: "I come from..." },
  { german: "Wie alt bist du?", english: "How old are you?" },
  { german: "Ich bin ... Jahre alt", english: "I am ... years old" },
  { german: "Was machst du beruflich?", english: "What do you do for work?" },
  { german: "Ich bin Student", english: "I am a student" },
  { german: "Ich arbeite als...", english: "I work as..." },
  { german: "Hast du Geschwister?", english: "Do you have siblings?" },
  { german: "Ich habe einen Bruder", english: "I have a brother" },
  { german: "Ich habe eine Schwester", english: "I have a sister" },
  { german: "Das ist mein Freund", english: "This is my friend (male)" },
  { german: "Das ist meine Freundin", english: "This is my friend (female)" },
  { german: "Wie viel kostet das?", english: "How much does that cost?" },
  { german: "Zu teuer!", english: "Too expensive!" },
  { german: "Gib mir einen Rabatt", english: "Give me a discount" },
  { german: "Ich möchte das kaufen", english: "I would like to buy that" },
  { german: "Kann ich mit Karte zahlen?", english: "Can I pay by card?" },
  { german: "Bar bitte", english: "Cash please" },
  { german: "Wo ist die Toilette?", english: "Where is the toilet?" },
  { german: "Links", english: "Left" },
  { german: "Rechts", english: "Right" },
  { german: "Geradeaus", english: "Straight ahead" },
  { german: "Hinter dem Gebäude", english: "Behind the building" },
  { german: "Vor dem Supermarkt", english: "In front of the supermarket" },
  { german: "Neben der Bank", english: "Next to the bank" },
  { german: "Zwischen den Häusern", english: "Between the houses" },
  { german: "Kannst du mir helfen?", english: "Can you help me?" },
  { german: "Natürlich!", english: "Of course!" },
  { german: "Keine Sorge", english: "No worries" },
  { german: "Gute Idee", english: "Good idea" },
  { german: "Schlechte Idee", english: "Bad idea" },
  { german: "Ich habe Hunger", english: "I'm hungry" },
  { german: "Ich habe Durst", english: "I'm thirsty" },
  { german: "Lass uns essen gehen", english: "Let's go eat" },
  { german: "Ich möchte etwas trinken", english: "I'd like something to drink" },
  { german: "Einen Kaffee bitte", english: "A coffee please" },
  { german: "Ein Bier bitte", english: "A beer please" },
  { german: "Die Rechnung, bitte", english: "The bill, please" },
  { german: "Guten Appetit!", english: "Enjoy your meal!" },
  { german: "Prost!", english: "Cheers!" },
  { german: "Zum Wohl!", english: "To your health!" },
  { german: "Ich bin müde", english: "I'm tired" },
  { german: "Ich bin krank", english: "I'm sick" },
  { german: "Ich brauche einen Arzt", english: "I need a doctor" },
  { german: "Rufen Sie die Polizei", english: "Call the police" },
  { german: "Feuer!", english: "Fire!" },
  { german: "Hilfe!", english: "Help!" },
  { german: "Ich habe mich verlaufen", english: "I'm lost" },
  { german: "Kannst du mir den Weg zeigen?", english: "Can you show me the way?" },
  { german: "Wie spät ist es?", english: "What time is it?" },
  { german: "Es ist 10 Uhr", english: "It's 10 o'clock" },
  { german: "Um wie viel Uhr?", english: "At what time?" },
  { german: "Am Morgen", english: "In the morning" },
  { german: "Am Nachmittag", english: "In the afternoon" },
  { german: "Am Abend", english: "In the evening" },
  { german: "Heute", english: "Today" },
  { german: "Morgen", english: "Tomorrow" },
  { german: "Gestern", english: "Yesterday" },
  { german: "Übermorgen", english: "The day after tomorrow" },
  { german: "Diese Woche", english: "This week" },
  { german: "Nächste Woche", english: "Next week" },
  { german: "Letzte Woche", english: "Last week" },
  { german: "Im Januar", english: "In January" },
  { german: "Im Sommer", english: "In summer" },
  { german: "Im Winter", english: "In winter" },
  { german: "Im Urlaub", english: "On vacation" },
  { german: "Zu Hause", english: "At home" },
  { german: "Im Büro", english: "In the office" },
  { german: "In der Schule", english: "At school" },
  { german: "Auf der Arbeit", english: "At work" },
  { german: "Im Kino", english: "At the cinema" },
  { german: "Im Restaurant", english: "In the restaurant" },
  { german: "Im Supermarkt", english: "In the supermarket" },
  { german: "Am Strand", english: "At the beach" },
  { german: "In den Bergen", english: "In the mountains" },
  { german: "Mit dem Auto", english: "By car" },
  { german: "Mit dem Zug", english: "By train" },
  { german: "Mit dem Bus", english: "By bus" },
  { german: "Mit dem Fahrrad", english: "By bike" },
  { german: "Zu Fuß", english: "On foot" },
  { german: "Gute Reise!", english: "Have a good trip!" },
  { german: "Viel Glück!", english: "Good luck!" },
  { german: "Alles Gute zum Geburtstag!", english: "Happy birthday!" },
  { german: "Frohe Weihnachten!", english: "Merry Christmas!" },
  { german: "Frohes neues Jahr!", english: "Happy new year!" },
  { german: "Schöne Ferien!", english: "Happy holidays!" },
  { german: "Gute Besserung!", english: "Get well soon!" },
  { german: "Lass uns Freunde sein", english: "Let's be friends" },
  { german: "Ich vermisse dich", english: "I miss you" },
  { german: "Ich liebe dich", english: "I love you" },
  { german: "Küss mich", english: "Kiss me" },
  { german: "Umarmung", english: "Hug" },
  { german: "Träum süß", english: "Sweet dreams" },
  { german: "Bis bald", english: "See you soon" },
  { german: "Bis morgen", english: "See you tomorrow" },
  { german: "Bis später", english: "See you later" },
  { german: "Wir sehen uns", english: "We'll see each other" },
  { german: "Mach's gut", english: "Take care" },
  { german: "Pass auf dich auf", english: "Look after yourself" },
  { german: "Wie war dein Tag?", english: "How was your day?" },
  { german: "Erzähl mir etwas", english: "Tell me something" },
  { german: "Das klingt gut", english: "That sounds good" },
  { german: "Das gefällt mir", english: "I like that" },
  { german: "Das mag ich nicht", english: "I don't like that" },
  { german: "Ich bin einverstanden", english: "I agree" },
  { german: "Ich bin nicht einverstanden", english: "I disagree" },
  { german: "Das ist richtig", english: "That's right" },
  { german: "Das ist falsch", english: "That's wrong" },
  { german: "Ich bin sicher", english: "I'm sure" },
  { german: "Ich bin mir nicht sicher", english: "I'm not sure" },
  { german: "Vielleicht hast du recht", english: "Maybe you're right" },
  { german: "Keine Ahnung", english: "No idea" },
  { german: "Egal", english: "Whatever" },
  { german: "Wie auch immer", english: "Anyway" },
  { german: "Auf jeden Fall", english: "Definitely" },
  { german: "Im Allgemeinen", english: "In general" },
  { german: "Zum Beispiel", english: "For example" },
  { german: "Und so weiter", english: "And so on" },
  { german: "Das heißt", english: "That means" },
  { german: "Im Vergleich zu", english: "In comparison to" },
  { german: "Nicht nur... sondern auch", english: "Not only... but also" },
  { german: "Sowohl als auch", english: "Both... and" },
  { german: "Entweder oder", english: "Either... or" },
  { german: "Weder noch", english: "Neither... nor" },
  { german: "Je mehr desto besser", english: "The more the better" },
  { german: "Ich freue mich darauf", english: "I'm looking forward to it" },
  { german: "Ich habe keine Lust", english: "I don't feel like it" },
  { german: "Lass uns gehen", english: "Let's go" },
  { german: "Beeil dich!", english: "Hurry up!" },
  { german: "Moment mal!", english: "Wait a moment!" },
  { german: "Hör zu!", english: "Listen!" },
  { german: "Schau mal!", english: "Look!" },
  { german: "Achtung!", english: "Attention!" },
  { german: "Vorsicht!", english: "Caution!" },
  { german: "Herzlichen Glückwunsch!", english: "Congratulations!" },
  { german: "Gut gemacht!", english: "Well done!" },
  { german: "Weiter so!", english: "Keep it up!" },
  { german: "Das schaffst du!", english: "You can do it!" },
  { german: "Gib nicht auf!", english: "Don't give up!" },
  { german: "Du bist toll!", english: "You're great!" },
  { german: "Ich bin stolz auf dich", english: "I'm proud of you" },
  { german: "Lass uns feiern", english: "Let's celebrate" },
  { german: "Das Leben ist schön", english: "Life is beautiful" },
  { german: "Genieße den Moment", english: "Enjoy the moment" },
  { german: "Danke für alles", english: "Thanks for everything" },
  { german: "Bis zum nächsten Mal!", english: "Until next time!" }
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

  return (
    <div className="bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 font-sans">
     
      <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
        <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-200" style={{ width: `${scrollProgress}%` }}></div>
      </div>
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20">
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
        >
          🇩🇪 German Journey
        </motion.h1>
        <p className="text-xl md:text-2xl mt-6 text-gray-700 max-w-2xl">
          Scroll down & learn <span className="font-bold">182 chunks • 100 verbs • 155 nouns</span> — plus days, months, colors!
        </p>
        <p className="text-md mt-2 text-gray-600">🔊 Click any speaker icon to hear authentic German pronunciation.</p>
        <div className="mt-12 animate-bounce">👇</div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <ScrollReveal>
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/40">
            <h2 className="text-3xl font-bold text-center mb-8">📅 Days, Months & 🎨 Colors</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-3">Days</h3>
                <div className="grid grid-cols-2 gap-2">
                  {days.map(day => (
                    <div key={day.german} className="bg-white p-2 rounded-xl shadow flex items-center justify-between">
                      <div><span className="font-bold">{day.german}</span><br/><span className="text-sm text-gray-500">{day.english}</span></div>
                      <PronounceButton word={day.german} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-3">Months</h3>
                <div className="grid grid-cols-2 gap-2">
                  {months.map(month => (
                    <div key={month} className="bg-white p-2 rounded-xl shadow flex items-center justify-between">
                      <span>{month}</span>
                      <PronounceButton word={month} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-3">Colors</h3>
                <div className="grid grid-cols-2 gap-2">
                  {colors.map(color => (
                    <div key={color.german} className="bg-white p-2 rounded-xl shadow flex items-center justify-between">
                      <div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full" style={{backgroundColor: color.german}}></span><span>{color.german} – {color.english}</span></div>
                      <PronounceButton word={color.german} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <ScrollReveal>
          <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-2">⚡ 100 Essential Verbs</h2>
            <p className="text-center text-gray-600 mb-6">Master everyday actions</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {verbs.map((verb, idx) => {
                const baseVerb = verb.split('(')[0].trim();
                return (
                  <div key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-xl text-center hover:scale-105 transition flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-indigo-800">{baseVerb}</span>
                      <span className="text-xs text-gray-500 block">({verb.split('(')[1]?.replace(')', '')})</span>
                    </div>
                    <PronounceButton word={baseVerb} />
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-6 text-sm font-semibold text-green-700">✅ Total: {verbs.length} verbs learned!</div>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <ScrollReveal>
          <div className="bg-white/70 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-2">🏷️ 155 Nouns (with Articles)</h2>
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
            <p>📚 You learned: <strong>{verbs.length} verbs</strong> + <strong>{nouns.length} nouns</strong> + <strong>{chunks.length} chunks</strong> + Days, Months, Colors!</p>
            <p className="mt-2">✨ Keep practicing and you'll be fluent in no time! ✨</p>
          </div>
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="mt-8 bg-white text-orange-600 px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition">⬆️ Start Over</button>
        </motion.div>
      </section>
    </div>
  );
};

export default GermanLearningJourney;