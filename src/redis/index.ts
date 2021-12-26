require('dotenv').config();
import Redis from 'ioredis';

const cache = new Redis(process.env.REDIS_URL);

export default cache;
