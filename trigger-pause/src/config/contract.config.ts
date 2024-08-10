import fs from 'fs';
import path from 'path';

const filepath = path.resolve(__dirname, '../../../global-config.json');

interface ConfigData {
  bankContractAddress: string;
  attackContractAddress: string;
  privateKey: string;
}

let configData: ConfigData = JSON.parse(fs.readFileSync(filepath, 'utf-8'));

function set(data: Partial<ConfigData>): void {
  configData = { ...configData, ...data };
  fs.writeFileSync(filepath, JSON.stringify(configData, null, 2));
}

export default { configData, set };
