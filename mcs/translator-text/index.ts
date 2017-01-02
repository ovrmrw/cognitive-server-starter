import {
  mcsTranslatorTextSecretKey,
} from '../../config';

import * as request from 'request';
import { parseString } from 'xml2js';


let accessToken: string = '';
let tokenTimestamp: number = 0;


function requestToken(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    request({
      method: 'post',
      url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
      headers: {
        'Ocp-Apim-Subscription-Key': mcsTranslatorTextSecretKey,
      }
    }, (err, res, body) => {
      if (err) { reject(err); }

      accessToken = body;
      tokenTimestamp = new Date().getTime();
      console.log('Access Token:', accessToken);
      resolve(accessToken);
    });
  });
}


function getToken(): Promise<string> {
  const now = new Date().getTime();
  if (now - tokenTimestamp > 1000 * 60 * 9) { // 前回のToken取得から9分以上経過していたら再度取得。
    console.log('Request new token.');
    return requestToken();
  } else {
    console.log('Reuse token.');
    return Promise.resolve(accessToken);
  }
}


export function mcsTranslate(text: string, translateTo: string): Promise<TranslationObject> {
  return new Promise<TranslationObject>((resolve, reject) => {
    const translateFrom = translateTo === 'ja' ? 'en' : 'ja';

    getToken()
      .then(token => {
        request({
          method: 'get',
          url: 'http://api.microsofttranslator.com/v2/Http.svc/Translate' + `?text=${encodeURI(text)}&from=${translateFrom}&to=${translateTo}`,
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }, (err, res, body) => {
          if (err) { reject(err); }

          // 取得したbodyはXMLなのでパースする必要がある。
          parseString(body, (err, result) => {
            if (err) { reject(err); }

            console.log(body, '↓ parsing XML to JS object');
            console.log(result);
            const translation: string = result.string._;
            console.log('MCS Translation: ' + translation); // 翻訳結果の表示。
            resolve({ translation });
          });
        });
      })
      .catch(err => reject(err));
  });
}



interface TranslationObject {
  translation: string;
}
