# cognitive-server-starter
Server-side app for cognitive services.

---

### Getting Watson Speech-to-Text Token

```
http://localhost:4000/api/watson/speech-to-text/token

⇒ {"token":"GIWsdvQ2qn2kwu3lh....."}
```

### Getting Google Cloud Translation

```
http://localhost:4000/api/gcp/translator
body: {"text":"hello", "translateTo":"ja"}

⇒ {"translation":"こんにちは"}
```

### Getting Microsoft Translation

```
http://localhost:4000/api/microsoft/translator
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
