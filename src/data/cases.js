export const casesData = [
  {
    name: "Nominative",
    usage: "Subject of the sentence – who or what is doing the action.",
    color: "blue",
    articles: { der: "der", die: "die", das: "das", plural: "die" },
    examples: [
      { german: "Der Hund schläft.", english: "The dog sleeps." },
      { german: "Die Katze miaut.", english: "The cat meows." },
      { german: "Das Kind spielt.", english: "The child plays." },
      { german: "Die Lehrerin erklärt die Grammatik.", english: "The teacher explains the grammar." },
      { german: "Der Mann arbeitet im Büro.", english: "The man works in the office." }
    ],
    explanation: "The subject is the person or thing that performs the action. Ask: 'Who or what is doing something?'"
  },
  {
    name: "Accusative",
    usage: "Direct object – the person or thing that directly receives the action.",
    color: "green",
    articles: { der: "den", die: "die", das: "das", plural: "die" },
    examples: [
      { german: "Ich sehe den Hund.", english: "I see the dog." },
      { german: "Sie liest die Zeitung.", english: "She reads the newspaper." },
      { german: "Wir kaufen das Buch.", english: "We buy the book." },
      { german: "Er trägt den Koffer.", english: "He carries the suitcase." },
      { german: "Die Kinder lieben die Oma.", english: "The children love the grandmother." }
    ],
    explanation: "The direct object receives the action directly. Ask: 'Whom or what is being verbed?'"
  },
  {
    name: "Dative",
    usage: "Indirect object – the person or thing that benefits or is affected by the action.",
    color: "orange",
    articles: { der: "dem", die: "der", das: "dem", plural: "den" },
    examples: [
      { german: "Ich gebe dem Hund einen Knochen.", english: "I give the dog a bone." },
      { german: "Er hilft der Frau.", english: "He helps the woman." },
      { german: "Wir folgen dem Auto.", english: "We follow the car." },
      { german: "Sie antwortet dem Lehrer.", english: "She answers the teacher." },
      { german: "Das Kind dankt seiner Mutter.", english: "The child thanks his mother." }
    ],
    explanation: "The indirect object is often the recipient of the action. Ask: 'To whom or for whom is something done?'"
  },
  {
    name: "Genitive",
    usage: "Possession – shows ownership or relationship.",
    color: "purple",
    articles: { der: "des", die: "der", das: "des", plural: "der" },
    examples: [
      { german: "Das ist das Haus des Mannes.", english: "That is the man's house." },
      { german: "Die Farbe der Blume ist schön.", english: "The color of the flower is beautiful." },
      { german: "Das Ende des Films war spannend.", english: "The end of the movie was exciting." },
      { german: "Der Klang der Musik ist laut.", english: "The sound of the music is loud." },
      { german: "Die Tasche der Frau ist rot.", english: "The woman's bag is red." }
    ],
    explanation: "Shows possession or belonging. Often replaced by 'von' + dative in spoken German."
  }
];