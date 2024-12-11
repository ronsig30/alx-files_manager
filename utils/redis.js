import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => {
      console.error(`Redis client not connected to the server: ${error.message}`);
    });

    // Promisify the methods to use async/await
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  /**
   * Checks if the Redis client is alive.
   * @returns {boolean} - True if Redis is connected, otherwise false.
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Gets the value of a key from Redis.
   * @param {string} key - The key to fetch.
   * @returns {Promise<string|null>} - The value stored in Redis or null.
   */
  async get(key) {
    return this.getAsync(key);
  }

  /**
   * Sets a key-value pair in Redis with an expiration time.
   * @param {string} key - The key to store.
   * @param {string|number} value - The value to store.
   * @param {number} duration - The time-to-live in seconds.
   */
  async set(key, value, duration) {
    await this.setAsync(key, value, 'EX', duration);
  }

  /**
   * Deletes a key from Redis.
   * @param {string} key - The key to delete.
   */
  async del(key) {
    await this.delAsync(key);
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
