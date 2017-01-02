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
const azureDataMarketJsonPath = path.join(appRoot, 'secret', 'azureDataMarket.json'); // make sure this file exists.
const azureDataMarket = JSON.parse(fs.readFileSync(azureDataMarketJsonPath, 'utf8'));

export const ClientId: string = azureDataMarket.ClientId;
export const ClientSecret: string = azureDataMarket.ClientSecret;
