export const config: { [key: string]: any } = {
  default: {
    REDIS_HOST: 'localhost',
    REDIS_PORT: 6379,
  },
  dev: {
    REDIS_HOST: 'redis',
    REDIS_PORT: 6379,
  },
};
