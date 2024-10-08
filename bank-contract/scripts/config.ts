import fs from "fs";
import path from "path";

const filepath = path.resolve(__dirname, "../../../global-config.json");

interface ConfigData {
  proxyAddress: string;
  attackContractAddress: string;
  privateKey: string;
  bankContractName: string;
}

let configData: ConfigData = {} as ConfigData;

try {
  configData = JSON.parse(fs.readFileSync(filepath, "utf-8"));
} catch (error) {
  // Handle error appropriately
}

function set(data: Partial<ConfigData>): void {
  configData = { ...configData, ...data };
  fs.writeFileSync(filepath, JSON.stringify(configData, null, 2));
}

export default { data: configData, set };
