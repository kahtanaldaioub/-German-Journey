export const casesData = [
  {
    name: "Nominative",
    usage: "subject of the sentence (who/what is doing the action)",
    color: "blue",
    articles: { der: "der", die: "die", das: "das", plural: "die" },
    examples: [
      { german: "Der Hund schläft.", english: "The dog sleeps." },
      { german: "Die Katze miaut.", english: "The cat meows." },
      { german: "Das Kind spielt.", english: "The child plays." }
    ]
  },
  {
    name: "Accusative",
    usage: "direct object (who/what receives the action)",
    color: "green",
    articles: { der: "den", die: "die", das: "das", plural: "die" },
    examples: [
      { german: "Ich sehe den Hund.", english: "I see the dog." },
      { german: "Sie liest die Zeitung.", english: "She reads the newspaper." },
      { german: "Wir kaufen das Buch.", english: "We buy the book." }
    ]
  },
  {
    name: "Dative",
    usage: "indirect object (to/for whom)",
    color: "orange",
    articles: { der: "dem", die: "der", das: "dem", plural: "den" },
    examples: [
      { german: "Ich gebe dem Hund einen Knochen.", english: "I give the dog a bone." },
      { german: "Er hilft der Frau.", english: "He helps the woman." },
      { german: "Wir folgen dem Auto.", english: "We follow the car." }
    ]
  },
  {
    name: "Genitive",
    usage: "possession (whose)",
    color: "purple",
    articles: { der: "des", die: "der", das: "des", plural: "der" },
    examples: [
      { german: "Das ist das Haus des Mannes.", english: "That is the man's house." },
      { german: "Die Farbe der Blume ist schön.", english: "The color of the flower is beautiful." },
      { german: "Das Ende des Films war spannend.", english: "The end of the movie was exciting." }
    ]
  }
];