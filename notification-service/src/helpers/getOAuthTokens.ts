// import { oAuth2Client } from '../config/email.config';
// import { google } from 'googleapis';
// import fs from 'fs';

// interface Credentials {
//   access_token?: string | null | undefined;
//   refresh_token?: string | null | undefined;
// }

// export const verifyAuthorizationCode = async (code: string) => {
//   try {
//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);

//     const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
//     const gmailUser = await gmail.users.getProfile({ userId: 'me' });

//     const email = gmailUser.data.emailAddress;

//     if (!email) {
//       return { result: null, error: "Coudn't get the email." };
//     }

//     return { result: { email, tokens }, error: null };
//   } catch (err) {
//     const error = err as Error;
//     console.error(error.message);
//     return { result: null, error: error.message };
//   }
// };

// export const saveTokensToFile = (tokens: Credentials) => {
//   return new Promise((resolve) => {
//     fs.writeFile('credentials.json', JSON.stringify(tokens), (err) => {
//       if (err) {
//         console.error(err);
//         resolve(false);
//       } else {
//         console.info('Oauth Token saved to file.');
//         resolve(true);
//       }
//     });
//   });
// };

// export const getTokensFromFile = () => {
//   return new Promise((resolve, reject) => {
//     fs.readFile('credentials.json', 'utf8', (err, data) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       try {
//         const tokens = JSON.parse(data);
//         resolve(tokens);
//       } catch (parseError) {
//         reject(parseError);
//       }
//     });
//   });
// };
