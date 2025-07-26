import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let currentLanguage = process.env.TEST_LANG || 'en';
let messages = {};

export function loadLanguage(lang) {
  try {
    const filePath = join(__dirname, `../locales/${lang}.json`);
    const fileContent = readFileSync(filePath, 'utf8');
    messages = JSON.parse(fileContent);
    currentLanguage = lang;
  } catch (error) {
    console.error(`Error loading language file for ${lang}:`, error);
    throw new Error(`Failed to load language file: ${lang}`);
  }
}

export function getMessage(key) {
  const keys = key.split('.');
  let value = messages;
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Missing translation for key: ${key} for language: ${currentLanguage}`);
      return `MISSING_KEY[${key}]`;
    }
  }
  return value;
}