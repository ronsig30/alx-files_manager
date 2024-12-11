// utils/db.js
import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    // MongoDB connection details from environment variables or defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${host}:${port}`;
    this.database = database;
    this.client = new MongoClient(this.url, { useUnifiedTopology: true });

    this.db = null;
  }

  // Check if MongoDB connection is alive
  async isAlive() {
    try {
      if (!this.db) {
        await this.client.connect();
        this.db = this.client.db(this.database);
      }
      return true;
    } catch (error) {
      console.error(`MongoDB error: ${error}`);
      return false;
    }
  }

  // Get the number of documents in the "users" collection
  async nbUsers() {
    try {
      if (!this.db) {
        await this.isAlive();
      }
      const usersCollection = this.db.collection('users');
      return await usersCollection.countDocuments();
    } catch (error) {
      console.error(`Error fetching number of users: ${error}`);
      return 0;
    }
  }

  // Get the number of documents in the "files" collection
  async nbFiles() {
    try {
      if (!this.db) {
        await this.isAlive();
      }
      const filesCollection = this.db.collection('files');
      return await filesCollection.countDocuments();
    } catch (error) {
      console.error(`Error fetching number of files: ${error}`);
      return 0;
    }
  }
}

// Export a single instance of the DBClient class
const dbClient = new DBClient();
export default dbClient;
