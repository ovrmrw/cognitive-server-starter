import * as fs from 'fs';
import * as path from 'path';
import { path as appRoot } from 'app-root-path';


////////////////////////// Watson Speech-to-Text
const secretJsonPath = path.join(appRoot, 'secret', 'watson-speech-to-text.json');

const secret = JSON.parse(fs.readFileSync(secretJsonPath, 'utf8'));


export const url = secret.url;
export const username = secret.username;
export const password = secret.password;

if ([url, username, password].some(key => !key)) {
  console.error('secret env keys:', { url, username, password });
  throw new Error('Env keys for Auth0 is not corrected.');
}


////////////////////////// GCP Translator
export const translatorProjectId: string = 'jserinfo'; // edit this for your environment.
export const translatorKeyFilename = path.join(appRoot, 'secret', 'jserinfo-d84d624e97da.json'); // make sure this file exists.
