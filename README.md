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
