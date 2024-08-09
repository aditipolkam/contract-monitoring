import { config } from 'dotenv';
config();

export const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'] as string;
export const GOOGLE_CLIENT_SECRET = process.env['GOOGLE_CLIENT_SECRET'] as string;
export const GOOGLE_REDIRECT_URI = process.env['GOOGLE_REDIRECT_URI'] as string;

export const ACCESS_TOKEN = process.env['ACCESS_TOKEN'] as string;
export const REFRESH_TOKEN = process.env['REFRESH_TOKEN'] as string;

export const FROM_EMAIL = process.env['FROM_EMAIL'] as string;
export const EMAIL_PASSWORD = process.env['EMAIL_PASSWORD'] as string;
