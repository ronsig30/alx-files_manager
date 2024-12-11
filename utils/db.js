import pkg from 'mongodb';
const { MongoClient } = pkg;

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';

class DBClient {
  constructor() {
    const uri = `mongodb://${host}:${port}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.connected = false; // Track connection status

    // Attempt to connect
    this.client.connect()
      .then(() => {
        this.connected = true;
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
      });

    this.db = null; // Initialize db as null
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    if (!this.connected) return 0;
    if (!this.db) this.db = this.client.db(database);
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.connected) return 0;
    if (!this.db) this.db = this.client.db(database);
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
