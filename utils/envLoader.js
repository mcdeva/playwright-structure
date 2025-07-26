import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const currentEnv = process.env.TEST_ENV || 'dev';
let envConfig = {};

try {
  const filePath = join(__dirname, `../config/${currentEnv}.json`);
  const fileContent = readFileSync(filePath, 'utf8');
  envConfig = JSON.parse(fileContent);
} catch (error) {
  console.error(`Error loading environment config for ${currentEnv}:`, error);
  throw new Error(`Failed to load environment config: ${currentEnv}`);
}

export  { envConfig };