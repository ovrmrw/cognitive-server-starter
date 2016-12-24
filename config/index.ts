import * as fs from 'fs';
import * as path from 'path';


const secretJsonPath = path.join(__dirname, '..', 'secret.json');

const secret = JSON.parse(fs.readFileSync(secretJsonPath, 'utf8'));


export const url = secret.url;
export const username = secret.username;
export const password = secret.password;

if ([url, username, password].some(key => !key)) {
  console.error('secret env keys:', { url, username, password });
  throw new Error('Env keys for Auth0 is not corrected.');
}
