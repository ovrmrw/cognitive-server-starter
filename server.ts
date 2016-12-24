import 'core-js';

import * as Hapi from 'hapi';
import * as Joi from 'joi';

import { authService, authConfig } from './auth';


const server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: 4000,
  routes: {
    cors: true,
  },
});


server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, Watson!');
  }
});

server.route({
  method: 'GET',
  path: '/api/token',
  handler: (request, reply) => {
    authService.getToken({ url: authConfig.url }, (err, token) => {
      if (err) { throw err; }
      reply({ token });
    });
  },
});


server.start((err) => {
  if (err) { throw err; }
  console.log(`Server running at: ${server.info.uri}`);
});
