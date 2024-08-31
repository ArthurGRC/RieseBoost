import IORedis from 'ioredis';

const redis = new IORedis(process.env.REDIS_URL || '', {
  enableOfflineQueue: true,
});

export default redis;
