import * as fs from 'fs';
import * as path from 'path';

type DynamicEnv = Record<string, any>;

const ENV_DIR_PATH = '../env';

function loadEnvFile(): DynamicEnv & { currentEnv: string } {
  const activeEnv = process.env.TEST_ENV || 'qa';
  const resolvedEnvPath = path.resolve(__dirname, ENV_DIR_PATH);
  const filePath = path.join(resolvedEnvPath, `${activeEnv}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Env file not found for env: "${activeEnv}". Expected file: "${filePath}"`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const config: DynamicEnv = JSON.parse(fileContent);

  if (!config.baseURL) {
    console.warn("WARN: 'baseURL' is missing in the loaded env config.");
  }

  return { ...config, currentEnv: activeEnv };
}

export const EnvConfig = loadEnvFile();
