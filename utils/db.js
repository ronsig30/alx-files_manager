import { MongoClient } from 'mongodb';
import { promisify } from 'util';

// Set MongoDB connection configuration
const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';


class DBClient {
  constructor() {
    const url = `mongodb://${HOST}:${PORT}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });

    this.client.connect((err) => {
      if (err) {
        console.log(`Unable to connect to MongoDB: ${err.message}`);
      } else {
        console.log('MongoDB client connected');
        this.db = this.client.db(DATABASE);
      }
    });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const usersCollection = this.db.collection('users');
    return usersCollection.countDocuments();
  }

  async nbFiles() {
    const filesCollection = this.db.collection('files');
    return filesCollection.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
