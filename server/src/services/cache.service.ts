import { rejects } from 'assert';
import redis from 'redis';
import { config } from '../config/config';

export default class CacheService {
  service: redis.RedisClient;

  constructor() {
    const mode = process.env.MODE ? process.env.MODE : 'default';
    try {
      this.service = redis.createClient({
        host: config[mode].REDIS_HOST,
        port: config[mode].REDIS_PORT,
      });
    } catch (error) {
      console.log(error);
      throw new Error('Redis connect failed.');
    }
  }

  async set() {}

  async get(s: string): Promise<any> {
    const data = await new Promise((resolve, reject) => this.service.get(s, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    }));
    return data;
  }
}
