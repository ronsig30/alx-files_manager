import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    this.client.connect()
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
      });

    this.db = this.client.db(dbName);
  }

  async isAlive() {
    try {
      await this.client.db('admin').command({ ping: 1 });
      return true;
    } catch (err) {
      return false;
    }
  }

  async nbUsers() {
    const usersCollection = this.db.collection('users');
    const count = await usersCollection.countDocuments();
    return count;
  }

  async nbFiles() {
    const filesCollection = this.db.collection('files');
    const count = await filesCollection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();

export default dbClient;
