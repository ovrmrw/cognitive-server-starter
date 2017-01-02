import {
  translatorProjectId as projectId,
  translatorKeyFilename as keyFilename,
} from '../../config';

const gct = require('@google-cloud/translate')({
  projectId,
  keyFilename,
});

console.log('gct:', gct);


export function gcpTranslate(text: string, translateTo: string = 'ja'): Promise<TranslationObject> {
  return new Promise<TranslationObject>((resolve, reject) => {
    gct.translate(text, translateTo, (err, translation: string) => {
      if (err) { reject(err); }
      console.log('GCP Translation:', translation);
      resolve({ translation });
    });
  });
}


interface TranslationObject {
  translation: string;
}
