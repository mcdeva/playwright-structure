import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function loadTestData(fileName) {
  try {
    const filePath = join(__dirname, `../data/${fileName}.json`);
    const fileContent = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error loading test data file: ${fileName}.json`, error);
    throw new Error(`Failed to load test data file: ${fileName}.json`);
  }
}