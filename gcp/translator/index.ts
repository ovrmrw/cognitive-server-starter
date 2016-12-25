import {
  translatorProjectId as projectId,
  translatorKeyFilename as keyFilename,
} from '../../config';

const gct = require('@google-cloud/translate')({
  projectId,
  keyFilename,
});


console.log('gct:', gct);

// const text: string = 'hi';
// const translateTo: string = 'ja';


export function translate(text: string, translateTo: string = 'ja'): Promise<TranslationObject> {
  return new Promise<TranslationObject>((resolve, reject) => {
    gct.translate(text, translateTo, (err, translation: string) => {
      if (err) { reject(err); }
      // console.log(text, '=>', translation); // "hi => こんにちは"
      resolve({ translation });
    });
  });
}


interface TranslationObject {
  translation: string;
}
