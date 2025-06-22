
  export type Dictionary = {
    "before-we-start": string;
    "replacing-special-characters-in-a-key-as-text": string;
    "select-your-language": string;
    "english": string;
    "french": string;
  }

  type Dictionaries = {
    [key: string]: () => Promise<Dictionary>;
  };
  
  const dictionaries: Dictionaries = {
    
    "en": () => import("./en.json").then((module) => module.default),
    "fr": () => import("./fr.json").then((module) => module.default),
  };
  
  export const getDictionary = async (locale: string) => dictionaries[locale]?.() || dictionaries['en']();
  
  