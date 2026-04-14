export const verbsData = [
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
  "umarmen (to hug)", "küssen (to kiss)", "kämpfen (to fight)", "verhandeln (to negotiate)"
];

export const verbs = verbsData.slice(0, 100).map(v => {
  const parts = v.split('(');
  return { infinitive: parts[0].trim(), english: parts[1]?.replace(')', '').trim() || "" };
});