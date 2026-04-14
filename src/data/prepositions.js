export const prepositions = [
  { 
    case: "Accusative", 
    color: "blue",
    preps: [
      { word: "durch", meaning: "through", example: { german: "Ich gehe durch den Park.", english: "I walk through the park." } },
      { word: "für", meaning: "for", example: { german: "Das Geschenk ist für dich.", english: "The gift is for you." } },
      { word: "gegen", meaning: "against", example: { german: "Er ist gegen den Krieg.", english: "He is against the war." } },
      { word: "ohne", meaning: "without", example: { german: "Ich trinke Kaffee ohne Zucker.", english: "I drink coffee without sugar." } },
      { word: "um", meaning: "around", example: { german: "Wir gehen um den See.", english: "We walk around the lake." } }
    ]
  },
  { 
    case: "Dative", 
    color: "green",
    preps: [
      { word: "aus", meaning: "out of / from", example: { german: "Sie kommt aus Berlin.", english: "She comes from Berlin." } },
      { word: "bei", meaning: "at / near", example: { german: "Ich wohne bei meinen Eltern.", english: "I live with my parents." } },
      { word: "mit", meaning: "with", example: { german: "Ich fahre mit dem Zug.", english: "I travel by train." } },
      { word: "nach", meaning: "after / to", example: { german: "Nach der Arbeit gehe ich nach Hause.", english: "After work I go home." } },
      { word: "von", meaning: "from", example: { german: "Das Geschenk ist von meiner Oma.", english: "The gift is from my grandma." } },
      { word: "zu", meaning: "to", example: { german: "Ich gehe zu meinem Freund.", english: "I go to my friend." } }
    ]
  },
  { 
    case: "Two‑way (accusative / dative)", 
    color: "purple",
    preps: [
      { word: "an", meaning: "on / at", 
        accExample: { german: "Ich hänge das Bild an die Wand.", english: "I hang the picture on the wall." },
        datExample: { german: "Das Bild hängt an der Wand.", english: "The picture hangs on the wall." } },
      { word: "auf", meaning: "on top of", 
        accExample: { german: "Ich lege das Buch auf den Tisch.", english: "I put the book on the table." },
        datExample: { german: "Das Buch liegt auf dem Tisch.", english: "The book lies on the table." } },
      { word: "hinter", meaning: "behind", 
        accExample: { german: "Ich stelle mich hinter den Baum.", english: "I stand behind the tree." },
        datExample: { german: "Ich stehe hinter dem Baum.", english: "I am standing behind the tree." } },
      { word: "in", meaning: "in / into", 
        accExample: { german: "Ich gehe in die Schule.", english: "I go into the school." },
        datExample: { german: "Ich bin in der Schule.", english: "I am in the school." } },
      { word: "neben", meaning: "next to", 
        accExample: { german: "Ich setze mich neben dich.", english: "I sit down next to you." },
        datExample: { german: "Ich sitze neben dir.", english: "I am sitting next to you." } },
      { word: "über", meaning: "over / above", 
        accExample: { german: "Ich hänge die Lampe über den Tisch.", english: "I hang the lamp over the table." },
        datExample: { german: "Die Lampe hängt über dem Tisch.", english: "The lamp hangs over the table." } },
      { word: "unter", meaning: "under", 
        accExample: { german: "Ich lege die Tasche unter den Tisch.", english: "I put the bag under the table." },
        datExample: { german: "Die Tasche liegt unter dem Tisch.", english: "The bag is under the table." } },
      { word: "vor", meaning: "in front of", 
        accExample: { german: "Ich stelle mich vor das Haus.", english: "I stand in front of the house." },
        datExample: { german: "Ich stehe vor dem Haus.", english: "I am standing in front of the house." } },
      { word: "zwischen", meaning: "between", 
        accExample: { german: "Ich stelle den Tisch zwischen die Stühle.", english: "I put the table between the chairs." },
        datExample: { german: "Der Tisch steht zwischen den Stühlen.", english: "The table stands between the chairs." } }
    ]
  }
];