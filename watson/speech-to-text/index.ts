import * as watson from 'watson-developer-cloud';

import {
  wsttUrl as url,
  wsttUsername as username,
  wsttPassword as password
} from '../../config';


const authConfig = {
  version: 'v1',
  url,
  username,
  password,
};

const watsonAuthService = watson.authorization(authConfig);

console.log('authService:', watsonAuthService);


export function getWatsonSpeechToTextToken(): Promise<TokenObject> {
  return new Promise<TokenObject>((resolve, reject) => {
    watsonAuthService.getToken({ url }, (err, token: string) => {
      if (err) { reject(err); }
      resolve({ token });
    });
  });
}


interface TokenObject {
  token: string;
}
