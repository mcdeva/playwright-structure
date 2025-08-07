import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let lang = process.env.TEST_LANG || 'en';
let messages = {};

try {
  const filePath = join(__dirname, `../locales/${lang}.json`);
  const fileContent = readFileSync(filePath, 'utf8');
  messages = JSON.parse(fileContent);
} catch (error) {
  console.error(`Error loading language file for ${lang}:`, error);
  throw new Error(`Failed to load language file: ${lang}`);
}

export { lang, messages };