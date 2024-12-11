// utils/healthCheck.js
const redis = require('redis');
const mongoose = require('mongoose');

// Create a Redis client
const redisClient = redis.createClient();

// Check if Redis is alive
exports.checkRedisAlive = () => {
  return new Promise((resolve, reject) => {
    redisClient.ping((err, reply) => {
      if (err) {
        reject(false);
      } else {
        resolve(reply === 'PONG');
      }
    });
  });
};

// Check if the DB (MongoDB) is alive
exports.checkDbAlive = async () => {
  try {
    await mongoose.connection.db.admin().ping(); // Ping the database
    return true;
  } catch (err) {
    return false;
  }
};
