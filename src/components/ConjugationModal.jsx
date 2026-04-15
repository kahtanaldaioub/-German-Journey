import React from 'react';
import PronounceButton from './PronounceButton';

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

  // Regular verbs – fix for sibilant stems (s, ss, ß, x, z)
  const endsWithSibilant = (s) => /[sßxz]$/.test(s);
  const duForm = endsWithSibilant(stem) ? stem + "t" : stem + "st";
  const erForm = stem + "t";

  return {
    ich: stem + "e",
    du: duForm,
    er: erForm,
    wir: stem + "en",
    ihr: stem + "t",
    sie: stem + "en"
  };
};

const ConjugationModal = ({ verb, infinitive, english, onClose }) => {
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

export default ConjugationModal;