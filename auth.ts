// const vcapServices = require('vcap_services');
import * as watson from 'watson-developer-cloud';

import * as config from './config';


const authConfig = {
  version: 'v1',
  url: config.url || '',
  username: config.username || '',
  password: config.password || '',
}

const authService = watson.authorization(authConfig);

console.log('authService:', authService);

export { authService, authConfig };
