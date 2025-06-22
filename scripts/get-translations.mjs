import dotenv from "dotenv";
import fs from "fs";
import fetch from "node-fetch";

dotenv.config({ path: [".env.local", ".env"] });

const KEY = process.env.GOOGLE_SHEETS_KEY;
const SHEET_ID = process.env.SHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME;
const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A1:Z1000?key=${KEY}`;

let body;

console.log("\nFetching localizations from Google Sheets");

try {
  const response = await fetch(SHEET_URL);
  body = await response.json();
} catch (error) {
  console.error(error);
}

if (!body || !body.values || !body.values.length) {
  console.log("body", body);
  console.log("No localizations found");
  process.exit();
}

// First row is the column headers
// Each row is then the key and it's translations
const [header, ...localizations] = body.values; // split the header row off

const [, ...languageKeys] = header; // split the key column off

console.log(`Found potential localizations for: `, languageKeys.join(", "));

// prepare the locales object
const locales = languageKeys.map((lang) => {
  return { [lang]: {} };
});

localizations.forEach((translations) => {
  const [key, ...rest] = translations; // split the localisation key from the translations

  // if the number of translations in this row is less than the number of languages in the header the array will be short
  // this fills the remaining array elements so we can print "" in th output file for the language without this translation
  if (rest.length < languageKeys.length) {
    const fillerArray = new Array(languageKeys.length - rest.length).fill("");
    rest.push(...fillerArray);
  }

  rest.forEach((text, index) => {
    locales[index][languageKeys[index]][key] = text;
  });
});

if (fs.existsSync("src/dictionaries")) {
  console.log("Dictionaries folder already exists, deleting");
  fs.rmSync("src/dictionaries", { recursive: true, force: true });
}

console.log("\nCreating dictionaries folder");
fs.mkdirSync("src/dictionaries");

locales.forEach((lang) => {
  const langKey = Object.keys(lang)[0];
  console.log(`Creating ${langKey} localization`);

  fs.writeFileSync(
    `src/dictionaries/${langKey}.json`,
    JSON.stringify(lang[langKey], null, 2)
  );
});

console.log("\nFinished creating localizations");

console.log(localizations);

function generateIndexFile() {
  console.log(`\n Creating index file`);

  const fileData = `
  export type Dictionary = {
    ${localizations
      .map((columns) => {
        const key = columns[0];
        if (key === undefined) return;
        return `"${key}": string;`;
      })
      .join("\n    ")}
  }

  type Dictionaries = {
    [key: string]: () => Promise<Dictionary>;
  };
  
  const dictionaries: Dictionaries = {
    ${locales
      .map((lang) => {
        const langKey = Object.keys(lang)[0];

        if (langKey === "key-as-text") return;

        return `"${langKey}": () => import("./${langKey}.json").then((module) => module.default),`;
      })
      .join("\n    ")}
  };
  
  export const getDictionary = async (locale: string) => dictionaries[locale]?.() || dictionaries['en']();
  
  `;
  fs.writeFileSync(`src/dictionaries/index.ts`, fileData);
}

generateIndexFile();
