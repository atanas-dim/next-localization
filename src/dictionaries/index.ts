
  export type Dictionary = {
    "before-we-start": string;
    "replacing-special-characters-in-a-key-as-text": string;
    "select-your-language": string;
    "english": string;
    "french": string;
    
    "a-brief-history-of-languages": string;
    "the-origins-of-language": string;
    "language-has-been-a-defining-feature-of-human-civilization-for-tens-of-thousands-of-years-from-early-cave-symbols-to-the-complex-writing-systems-of-ancient-mesopotamia-language-has-evolved-as-both-a-tool-and-an-art-form": string;
    "from-sound-to-script": string;
    "spoken-languages-likely-began-as-simple-sounds-tied-to-survival-over-time-these-sounds-grew-into-structured-speech-and-later-written-scripts-today-there-are-over-7-000-spoken-languages-across-the-world-each-with-its-own-story": string;
    "language-is-how-we-preserve-culture-share-knowledge-and-connect-across-generations": string;
    "there-are-approximately-number-languages-spoken-around-the-world-today": string;
  }

  type Dictionaries = {
    [key: string]: () => Promise<Dictionary>;
  };
  
  const dictionaries: Dictionaries = {
    
    "en": () => import("./en.json").then((module) => module.default),
    "fr": () => import("./fr.json").then((module) => module.default),
  };
  
  export const getDictionary = async (locale: string) => dictionaries[locale]?.() || dictionaries['en']();
  
  