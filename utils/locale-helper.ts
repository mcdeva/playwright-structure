import fs from 'fs';

export function loadLocale(locale: string) {
  const filePath = `./locale/${locale}.json`;
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}