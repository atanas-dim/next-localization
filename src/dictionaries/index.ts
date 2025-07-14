import { cache } from 'react'

export type Dictionary = {
  "replacing-special-characters-in-a-key-as-text": string;
  "select-your-language": string;
  "english": string;
  "french": string;
  "server-side": string;
  "client-side": string;
  "article-title": string;
  "origins-heading": string;
  "origins-p-1": string;
  "origins-p-2": string;
  "writing-section-heading": string;
  "writing-p-1": string;
  "writing-p-2": string;
  "writing-p-3": string;
  "identity-section-heading": string;
  "identity-p-1": string;
  "identity-p-2": string;
  "digital-section-heading": string;
  "digital-p-1": string;
  "digital-p-2": string;
  "summary-section-heading": string;
  "summary-p-1": string;
  "summary-p-2": string;
}

type Dictionaries = {
  [key: string]: () => Promise<Dictionary>;
};

const dictionaries: Dictionaries = {

  "en": () => import("./en.json").then((module) => module.default),
  "fr": () => import("./fr.json").then((module) => module.default),
};

export const getDictionary = cache(async (locale: string) => {
  return dictionaries[locale]?.() || dictionaries['en']()
});
