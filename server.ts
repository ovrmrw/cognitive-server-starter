import * as Hapi from 'hapi';
import * as Joi from 'joi';

import { getWatsonSpeechToTextToken } from './watson/speech-to-text';
import { gcpTranslate } from './gcp/translator';
import { mcsTranslate } from './mcs/translator-text';
import { tokenSchema, translationSchema } from './schema';

const server = new Hapi.Server({
  host: '0.0.0.0',
  port: 4000
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, h) {
    return 'Hello';
  },
  options: {
    cors: {
      origin: ['*']
    }
  }
});

server.route({
  method: 'GET',
  path: '/api/watson/speech-to-text/token',
  handler: (request, h) => {
    return getWatsonSpeechToTextToken()
      .then(obj => obj)
      .catch(err => {
        throw err;
      });
  },
  options: {
    response: {
      schema: tokenSchema
    },
    cors: {
      origin: ['*']
    }
  }
});

server.route({
  method: 'POST',
  path: '/api/gcp/translator',
  handler: (request, h) => {
    const text = request.payload['text'];
    const translateTo = request.payload['translateTo'];

    return gcpTranslate(text, translateTo)
      .then(obj => obj)
      .catch(err => {
        throw err;
      });
  },
  options: {
    validate: {
      payload: {
        text: Joi.string()
          .min(1)
          .required(),
        translateTo: Joi.string()
          .min(2)
          .max(2)
          .required()
      }
    },
    response: {
      schema: translationSchema
    },
    cors: {
      origin: ['*']
    }
  }
});

server.route({
  method: 'POST',
  path: '/api/mcs/translator',
  handler: (request, h) => {
    const text = request.payload['text'];
    const translateTo = request.payload['translateTo'];

    return mcsTranslate(text, translateTo)
      .then(obj => obj)
      .catch(err => {
        throw err;
      });
  },
  options: {
    validate: {
      payload: {
        text: Joi.string()
          .min(1)
          .required(),
        translateTo: Joi.string()
          .min(2)
          .max(2)
          .required()
      }
    },
    response: {
      schema: translationSchema
    },
    cors: {
      origin: ['*']
    }
  }
});

server
  .start()
  .then(() => console.log(`Server running at: ${server.info.uri}`))
  .catch(console.error);
