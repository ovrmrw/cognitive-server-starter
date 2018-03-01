import * as fs from 'fs';
import * as path from 'path';
import { path as appRoot } from 'app-root-path';

////////////////////////// Watson Speech-to-Text
const secretJsonPath = path.join(appRoot, 'secret', 'watson-speech-to-text.json'); // make sure this file exists.
const secret = JSON.parse(fs.readFileSync(secretJsonPath, 'utf8'));

export const wsttUrl: string = secret.url;
export const wsttUsername: string = secret.username;
export const wsttPassword: string = secret.password;

////////////////////////// GCP Translator
export const translatorProjectId: string = 'jserinfo'; // edit this value for your environment.
export const translatorKeyFilename = path.join(appRoot, 'secret', 'jserinfo-d84d624e97da.json'); // make sure this file exists.

////////////////////////// Microsoft Translator Text
const mcsTranslatorTextJsonPath = path.join(appRoot, 'secret', 'mcs-translator-text.json'); // make sure this file exists.
const mcsTranslatorText = JSON.parse(fs.readFileSync(mcsTranslatorTextJsonPath, 'utf8'));

export const mcsTranslatorTextSecretKey: string = mcsTranslatorText.secretKey;
