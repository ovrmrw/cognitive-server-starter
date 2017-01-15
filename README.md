# cognitive-server-starter
Server-side app for cognitive services.

---

### Watson Speech-to-Text - Get Token

```
http://localhost:4000/api/watson/speech-to-text/token

⇒ {"token":"GIWsdvQ2qn2kwu3lh....."}
```

### Google Cloud Translator - Get Translation

```
http://localhost:4000/api/gcp/translator
body: {"text":"hello", "translateTo":"ja"}

⇒ {"translation":"こんにちは"}
```

### Microsoft Cognitive Services Translator-Text - Get Translation

```
http://localhost:4000/api/mcs/translator
body: {"text":"hello", "translateTo":"ja"}

⇒ {"translation":"こんにちは"}
```

---

## Setup
```
$ npm install
```

## Run (ts files directly)
```
$ npm start
or
$ npm run s
```

## Build JS files
```
$ npm run build
```

---

## Secret Keys

### IBM Watson Speech to Text API
reference [http://www.ibm.com/smarterplanet/jp/ja/ibmwatson/developercloud/speech-to-text.html](http://www.ibm.com/smarterplanet/jp/ja/ibmwatson/developercloud/speech-to-text.html)

Create /secret/watson-speech-to-text.json

```
{
  "url": "https://stream.watsonplatform.net/speech-to-text/api",
  "password": "<your-password>",
  "username": "<your-username>"
}
```

### Microsoft Cognitive Services Translator Text API
reference [https://www.microsoft.com/ja-jp/translator/translatorapi.aspx](https://www.microsoft.com/ja-jp/translator/translatorapi.aspx)

Create /secret/mcs-translator-text.json

```
{
  "secretKey": "<your-secretkey>"
}

```

### Google Cloud Translator API
reference [https://cloud.google.com/translate/](https://cloud.google.com/translate/)

Download a serviceAccountKey file from Google Cloud Platform. 

/secret/jserinfo-d84d624e97da.json (in my case)

```
{
  "type": "service_account",
  "project_id": "<your-project-id>",
  "private_key_id": "<your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n.........=\n-----END PRIVATE KEY-----\n",
  "client_email": "<your-client-email>",
  "client_id": "<your-client-id>",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "<your-client-x509-cert-url>"
}
```
