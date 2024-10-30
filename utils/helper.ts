import fs from 'fs';
import * as config from '../config.json';

const site = config.site;
const lang = config.lang;

export function loadLocale() {
  const filePath = `./locale/${lang}.json`;
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export function loadDataSite() {
  const filePath = `./data/${site}.json`;
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}