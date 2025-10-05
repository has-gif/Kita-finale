# Kita-Doku – All-in-one (Render-fähig)

Enthält
- `public/index.html` → Frontend (Login, Felder, Export, GPT-Button)
- `server.js` → Proxy-Server für OpenAI (Key bleibt serverseitig, kein CORS)
- `package.json`

## Deploy auf Render (Web Service)
1. Neues GitHub-Repo erstellen und *diesen kompletten Ordner* pushen.
2. Render → **New → Web Service → Connect Repo**
3. **Build Command**: `npm install`
4. **Start Command**: `node server.js`
5. **Environment Variable** setzen: `OPENAI_API_KEY = sk-...`
   (optional) `OPENAI_MODEL = gpt-4o`
6. Deploy klicken → URL öffnen (z. B. `https://dein-name.onrender.com`)

Das Frontend ruft `POST /api/chat` auf, der Server leitet sicher zur OpenAI-API weiter.
