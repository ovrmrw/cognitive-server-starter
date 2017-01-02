/*
  TODO: このAPIは2017年3月31日で廃止になるため、それまでに新APIで書き直すこと。
*/

import {
  ClientId as client_id,
  ClientSecret as client_secret
} from '../../config';

import * as request from 'request';
import { parseString } from 'xml2js';


let accessToken: string = '';
let tokenTimestamp: number = 0;


async function requestToken(): Promise<string> {
  try {
    // request.postでbodyを取得する。awaitでPromiseを待機する。
    const body = await new Promise<string>((resolve, reject) => {
      request({
        method: 'post',
        url: 'https://datamarket.accesscontrol.windows.net/v2/OAuth2-13',
        form: {
          grant_type: 'client_credentials',
          client_id,
          client_secret,
          scope: 'http://api.microsofttranslator.com'
        }
      }, (err, res, body) => {
        if (err) { reject(err); }
        resolve(body);
      });
    });
    // request.postで取得したbodyからaccess_tokenを取得する。
    accessToken = JSON.parse(body)['access_token'];
    tokenTimestamp = new Date().getTime();
    console.log('Access Token:', accessToken);
    return accessToken;
  } catch (err) {
    console.error(err);
    return accessToken;
  }
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



export async function microsoftTranslate(text: string, translateTo: string): Promise<TranslationObject> {
  const translateFrom = translateTo === 'ja' ? 'en' : 'ja';

  try {
    const _accessToken = await getToken();

    // request.getでbodyを取得する。accessTokenがないとエラーになる。awaitでPromiseを待機する。
    const body = await new Promise<string>((resolve, reject) => {
      request(
        {
          method: 'get',
          url: 'http://api.microsofttranslator.com/v2/Http.svc/Translate' + `?text=${encodeURI(text)}&from=${translateFrom}&to=${translateTo}`,
          headers: {
            'Authorization': 'Bearer ' + _accessToken
          }
        }, (err, res, body) => {
          if (err) { reject(err); }
          resolve(body);
        });
    });

    // 取得したbodyはXMLなのでパースする必要がある。awaitでPromiseを待機する。
    const translation = await new Promise<string>((resolve, reject) => {
      parseString(body, (err, result) => {
        if (err) { reject(err); }
        console.log(body, '↓ parsing XML to JS object');
        console.log(result);
        resolve(result.string._);
      });
    });
    console.log('Translation: ' + translation); // 翻訳結果の表示。
    return { translation };
  } catch (err) {
    console.error(err);
    return { translation: err.message || err };
  }
}



interface TranslationObject {
  translation: string;
}
