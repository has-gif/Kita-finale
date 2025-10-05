const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || "gpt-4o";

if (!OPENAI_KEY) {
  console.error("ERROR: OPENAI_API_KEY is not set");
  process.exit(1);
}

app.use(express.json({ limit: '1mb' }));

app.use('/api/', rateLimit({ windowMs: 60 * 1000, max: 30 }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body || {};
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error || data || 'OpenAI error' });
    }
    const content = data?.choices?.[0]?.message?.content || '';
    res.json({ content });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Proxy error' });
  }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));