// server.js (Node.js Express Bridge)
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/stream', async (req, res) => {
    const channelId = req.query.channelId || '0bf41e66a18dfa3fee7fc3f678fea378';
    const targetUrl = `https://api.chzzk.naver.com/service/v2/channels/${channelId}/live-detail`;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Referer": "https://chzzk.naver.com/",
                "Origin": "https://chzzk.naver.com",
                "X-Forwarded-For": "211.234.240.1", // Spoofing IP Korea
                "Client-IP": "211.234.240.1"
            }
        });

        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Bridge server running on port ${PORT}`);
});
