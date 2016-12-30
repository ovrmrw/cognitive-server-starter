# cognitive-server-starter
Server-side app for cognitive services.

---

### Getting Watson Speech-to-Text Token

```
http://localhost:4000/api/watson/speech-to-text/token

⇒ {"token":"GIWsdvQ2qn2kwu3lh....."}
```

### Getting GCP Translation

```
http://localhost:4000/api/gcp/translator
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
```

## Build JS files
```
$ npm run build
```
