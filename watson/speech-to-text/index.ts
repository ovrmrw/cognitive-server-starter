// const vcapServices = require('vcap_services');
import * as watson from 'watson-developer-cloud';

import * as config from '../../config';


const authConfig = {
  version: 'v1',
  url: config.url || '',
  username: config.username || '',
  password: config.password || '',
}

const watsonAuthService = watson.authorization(authConfig);

console.log('authService:', watsonAuthService);


function getWatsonSpeechToTextToken(): Promise<TokenObject> {
  return new Promise<TokenObject>((resolve, reject) => {
    watsonAuthService.getToken({ url: config.url }, (err, token: string) => {
      if (err) { reject(err); }
      resolve({ token });
    });
  });
}

export { watsonAuthService, getWatsonSpeechToTextToken };


interface TokenObject {
  token: string;
}
