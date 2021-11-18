import { rejects } from 'assert';
import redis from 'redis';

export default class CacheService {
  service: redis.RedisClient;

  constructor() {
    this.service = redis.createClient({ host: 'localhost', port: 6379 });
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
