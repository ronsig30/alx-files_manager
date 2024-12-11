import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env file if available
dotenv.config();

class DBClient {
  constructor() {
    // Set up MongoDB configuration using environment variables or defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    // Create a MongoDB client instance
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.dbName = database;

    // Connect to MongoDB
    this.client.connect()
      .then(() => {
        this.db = this.client.db(this.dbName);
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });
  }

  /**
   * Check if the MongoDB client is connected
   * @returns {boolean}
   */
  isAlive() {
    return this.client && this.client.isConnected();
  }

  /**
   * Get the number of documents in the "users" collection
   * @returns {Promise<number>}
   */
  async nbUsers() {
    if (!this.isAlive()) return 0;
    return this.db.collection('users').countDocuments();
  }

  /**
   * Get the number of documents in the "files" collection
   * @returns {Promise<number>}
   */
  async nbFiles() {
    if (!this.isAlive()) return 0;
    return this.db.collection('files').countDocuments();
  }
}

// Create and export a singleton instance of DBClient
const dbClient = new DBClient();
export default dbClient;
