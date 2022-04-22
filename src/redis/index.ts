require('dotenv').config();
import Redis from 'ioredis';

const cache = new Redis(process.env.CACHE_URL);

export default cache;
