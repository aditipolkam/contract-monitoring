import { config } from 'dotenv';
config();

export const SEPOLIA_NODE = process.env['SEPOLIA_NODE'] as string;
