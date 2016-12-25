import 'core-js';
import * as Hapi from 'hapi';
import * as Joi from 'joi';

import { getWatsonSpeechToTextToken } from './watson/speech-to-text';
import { gcpTranslate } from './gcp/translator';
import { tokenSchema, translationSchema } from './schema';


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
    reply('Hello');
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
  config: {
    response: {
      schema: tokenSchema
    }
  }
});


server.route({
  method: 'GET',
  path: '/api/gcp/translator/{translateTo}/{text}',
  handler: (request, reply) => {
    const text = request.params['text'];
    const translateTo = request.params['translateTo'];

    gcpTranslate(text, translateTo)
      .then(obj => reply(obj))
      .catch(err => { throw err; });
  },
  config: {
    validate: {
      params: {
        text: Joi.string().min(1).required(),
        translateTo: Joi.string().min(2).max(2).required(),
      }
    },
    response: {
      schema: translationSchema
    }
  }
});


server.start((err) => {
  if (err) { throw err; }
  console.log(`Server running at: ${server.info.uri}`);
});
