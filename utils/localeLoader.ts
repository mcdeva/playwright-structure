import * as fs from 'fs';
import * as path from 'path';

type DynamicLocale = Record<string, any>;

const LOCALE_DIR_PATH = '../locale';

export function loadLocaleFile(localeCode?: string): DynamicLocale & { currentLang: string } {
  const activeLocaleCode = localeCode || process.env.TEST_LANG || 'en';
  const resolvedLocalePath = path.resolve(__dirname, LOCALE_DIR_PATH);
  const filePath = path.join(resolvedLocalePath, `${activeLocaleCode}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Locale file not found for locale code: "${activeLocaleCode}". Expected file: "${filePath}"`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const config: DynamicLocale = JSON.parse(fileContent);
  return { ...config, currentLang: activeLocaleCode };
}

export const LangConfig = loadLocaleFile();
