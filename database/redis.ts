import Redis from 'ioredis';

const { REDIS_URL, REDIS_TLS_URL } = process.env;
const url: string = REDIS_TLS_URL || REDIS_URL;

interface Opts {
  tls: {
    rejectUnauthorized: boolean;
  };
}

const opts: Opts = {
  tls: {
    rejectUnauthorized: false,
  },
};

export const client = new Redis(url, opts);

client.on('connect', (): void => {
  console.log('Redis connected!');
});

client.on('error', (err): void => {
  console.log('Redis connection error!', err);
});
