import { cache } from 'react'

export type Dictionary = {
  "before-we-start": string;
  "replacing-special-characters-in-a-key-as-text": string;
  "select-your-language": string;
  "english": string;
  "french": string;

  "a-brief-history-of-languages": string;
  "the-origins-of-language": string;
  "language-has-been-a-defining-feature-of-human-civilization-for-tens-of-thousands-of-years-from-early-cave-symbols-to-the-complex-writing-systems-of-ancient-mesopotamia-language-has-evolved-as-both-a-tool-and-an-art-form": string;
  "some-of-the-earliest-evidence-of-symbolic-communication-dates-back-over-yearsago-ancient-humans-used-petroglyphs-handprints-and-rudimentary-carvings-to-tell-stories-convey-warnings-and-mark-territory-learn-more-at-cave-art-wikipedia": string;
  "from-sound-to-script": string;
  "spoken-languages-likely-began-as-simple-survival-sounds-warnings-calls-or-expressions-of-need-over-time-these-primitive-utterances-became-more-structured-forming-the-basis-of-what-we-now-call-speech": string;
  "the-invention-of-writing-systems-revolutionized-human-communication-from-the-cuneiform-tablets-of-sumer-to-egyptian-hieroglyphs-early-scripts-allowed-knowledge-to-be-stored-shared-and-preserved-across-generations-see-more-at-britannica-s-cuneiform-overview": string;
  "today-there-are-over-languagecount-spoken-languages-in-the-world-each-one-telling-its-own-story-of-origin-migration-and-change": string;
  "language-and-identity": string;
  "language-is-more-than-a-tool-it-s-a-reflection-of-identity-the-words-we-use-often-carry-cultural-significance-and-historical-depth-dialects-and-accents-tell-stories-of-regional-roots-migration-and-influence": string;
  "in-many-indigenous-communities-efforts-to-preserve-endangered-languages-are-tied-directly-to-cultural-survival-when-a-language-dies-a-way-of-understanding-the-world-disappears-say-many-linguists-visit-endangeredlanguages-com-to-learn-more": string;
  "the-digital-age-of-language": string;
  "with-the-rise-of-the-internet-and-global-communication-language-is-changing-faster-than-ever-emojis-memes-and-abbreviations-are-shaping-how-we-express-ourselves-online": string;
  "tech-giants-now-invest-in-real-time-translation-voice-recognition-and-ai-generated-subtitles-proof-that-language-remains-a-cutting-edge-technology-try-tools-like-platformname": string;
  "final-thoughts": string;
  "language-is-how-we-preserve-culture-share-knowledge-and-connect-across-time-whether-written-spoken-or-signed-language-remains-at-the-heart-of-what-makes-us-human": string;
  "in-a-world-of-increasing-connection-understanding-each-other-s-words-literally-and-figuratively-has-never-been-more-important": string;
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
