const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
  url: 'redis://localhost:6379'
});
const PORT = 3000;
const CACHE_DURATION = 60;

client.on('error', (err) => console.log('🔥 Redis Client Error', err));
client.connect();

async function getCache(key) {
  try {
    const data = await client.get(key);
    if (data != null) return JSON.parse(data);
    return null;
  } catch (err) {
    console.error(err);
  }
}

async function setCache(key, data) {
  try {
    await client.set(key, JSON.stringify(data), { EX: CACHE_DURATION });
  } catch (err) {
    console.error(err);
  }
}

app.get('/data', async (req, res) => {
  const cacheKey = 'unique_key';
  const cachedData = await getCache(cacheKey);

 if (cachedData) {
    console.log('🚀 Cache Hit');
    return res.json(cachedData);
  }

  console.log('💨 Cache Miss');
  const response = await fetch('https://dummyjson.com/products/1');
  const data = await response.json();
  await setCache(cacheKey, data);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`🌍 Server running on port ${PORT}`);
});