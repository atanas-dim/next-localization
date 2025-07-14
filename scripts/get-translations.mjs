import dotenv from "dotenv";
import fs from "fs";
import fetch from "node-fetch";
import path from "path";

dotenv.config({ path: [".env.local", ".env"] });

const KEY = process.env.GOOGLE_SHEETS_KEY;
const SHEET_ID = process.env.SHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME;
const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!A1:Z1000?key=${KEY}`;

const OUTPUT_DIR = path.join("src", "dictionaries");

// === Main Execution ===
async function main() {
	console.log("\nFetching localizations from Google Sheets");

	const sheetData = await fetchSheetData();

	if (!sheetData || !sheetData.values || !sheetData.values.length) {
		console.log("sheetData", sheetData);
		console.log("No localizations found");
		process.exit();
	}

	const { header, languageKeys, localizations } = parseSheetData(sheetData);
	console.log(`Found potential localizations for: ${languageKeys.join(", ")}`);

	const locales = buildLocales(languageKeys, localizations);

	prepareOutputFolder(OUTPUT_DIR);
	writeLocaleFiles(locales, OUTPUT_DIR);
	generateIndexFile(locales, localizations, OUTPUT_DIR);

	console.log("\nFinished creating localizations");
	console.log(localizations);
}

// === Fetching ===
async function fetchSheetData() {
	try {
		const response = await fetch(SHEET_URL);
		return await response.json();
	} catch (error) {
		console.error("Error fetching sheet data:", error);
		process.exit(1);
	}
}

// === Parsing Sheet ===
function parseSheetData(sheetData) {
	const [headerRow, ...localizations] = sheetData.values;
	const [, ...languageKeys] = headerRow;
	return {
		header: headerRow,
		languageKeys,
		localizations,
	};
}

// === Building Locales ===
function buildLocales(languageKeys, localizations) {
	const locales = languageKeys.map((lang) => ({ [lang]: {} }));

	localizations.forEach((translations) => {
		const [key, ...rest] = translations;

		// Ensure we have a value for each language
		if (rest.length < languageKeys.length) {
			const fillerArray = new Array(languageKeys.length - rest.length).fill("");
			rest.push(...fillerArray);
		}

		rest.forEach((text, index) => {
			locales[index][languageKeys[index]][key] = text;
		});
	});

	return locales;
}

// === Output Directory Handling ===
function prepareOutputFolder(dir) {
	if (fs.existsSync(dir)) {
		console.log("Dictionaries folder already exists, deleting");
		fs.rmSync(dir, { recursive: true, force: true });
	}

	console.log("\nCreating dictionaries folder");
	fs.mkdirSync(dir, { recursive: true });
}

// === Writing Locale Files ===
function writeLocaleFiles(locales, dir) {
	locales.forEach((lang) => {
		const langKey = Object.keys(lang)[0];
		console.log(`Creating ${langKey} localization`);
		const filePath = path.join(dir, `${langKey}.json`);
		fs.writeFileSync(filePath, JSON.stringify(lang[langKey], null, 2));
	});
}

// === Generate Index File ===
function generateIndexFile(locales, localizations, dir) {
	console.log(`\nCreating index file`);

	const typeEntries = localizations
		.map((row) => {
			const key = row[0];
			return key ? `  "${key}": string;` : "";
		})
		.join("\n");

	const dictionaryEntries = locales
		.map((lang) => {
			const langKey = Object.keys(lang)[0];
			if (langKey === "key-as-text") return "";
			return `  "${langKey}": () => import("./${langKey}.json").then((module) => module.default),`;
		})
		.join("\n");

	const fileData = `import { cache } from 'react'

export type Dictionary = {
${typeEntries}
}

type Dictionaries = {
  [key: string]: () => Promise<Dictionary>;
};

const dictionaries: Dictionaries = {
${dictionaryEntries}
};

export const getDictionary = cache(async (locale: string) => {
  return dictionaries[locale]?.() || dictionaries['en']()
});
`;

	const indexPath = path.join(dir, "index.ts");
	fs.writeFileSync(indexPath, fileData);
}

// Run it
main();
