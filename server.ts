import 'core-js';

import * as Hapi from 'hapi';
import * as Joi from 'joi';

import { getWatsonSpeechToTextToken } from './watson/speech-to-text';
import { translate } from './gcp/translator';

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
  path: '/api/watson/speech-to-text/token',
  handler: (request, reply) => {
    getWatsonSpeechToTextToken()
      .then(obj => reply(obj))
      .catch(err => { throw err; });
  },
});

server.route({
  method: 'GET',
  path: '/api/gcp/translator/{translateTo}/{text}',
  handler: (request, reply) => {
    const text = request.params['text'];
    const translateTo = request.params['translateTo'];
    translate(text, translateTo)
      .then(obj => reply(obj))
      .catch(err => { throw err; });
  },
});


server.start((err) => {
  if (err) { throw err; }
  console.log(`Server running at: ${server.info.uri}`);
});
