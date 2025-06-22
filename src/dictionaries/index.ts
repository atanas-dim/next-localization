
  export type Dictionary = {
    "before-we-start": string;
    "select-your-language": string;
    "replacing-special-characters-in-a-key-as-text": string;
  }

  type Dictionaries = {
    [key: string]: () => Promise<Dictionary>;
  };
  
  const dictionaries: Dictionaries = {
    
    "en": () => import("./en.json").then((module) => module.default),
    "fr": () => import("./fr.json").then((module) => module.default),
  };
  
  export const getDictionary = async (locale: string) => dictionaries[locale]?.() || dictionaries['en']();
  
  