import redis from 'redis';


class RedisClient {
    constructor() {
        this.client = redis.createClient();
        
        // Handle connection errors
        this.client.on('error', (err) => {
            console.error(`Redis error: ${err}`);
        });
    }

    // Check if the Redis client is alive
    isAlive() {
        return this.client.connected;
    }

    // Get the value for a given key
    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    return reject(err);
                }
                resolve(value);
            });
        });
    }

    // Set a value for a given key with expiration
    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, duration, value, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    // Delete a value for a given key
    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

// Create an instance of RedisClient and export it
const redisClient = new RedisClient();
export default redisClient;
