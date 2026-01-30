import * as fs from 'fs';
import * as path from 'path';

type DynamicData = Record<string, any>;

const DATA_DIR_PATH = '../data';

export function loadDataFile(fileName: string): DynamicData | null {
  const resolvedDataPath = path.resolve(__dirname, DATA_DIR_PATH);
  const filePath = path.join(resolvedDataPath, `${fileName}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Data file not found: ${filePath}.`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as DynamicData;
}
