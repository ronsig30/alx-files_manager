// controllers/AppController.js
import { redisClient, dbClient } from './utils'; // Import Redis and DB clients

class AppController {
    static async getStatus(req, res) {
        try {
            // Check Redis and DB status
            const redisStatus = await redisClient.isAlive();
            const dbStatus = await dbClient.isAlive();

            return res.status(200).json({
                redis: redisStatus,
                db: dbStatus
            });
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while checking status' });
        }
    }

    static async getStats(req, res) {
        try {
            // Get the number of users and files from the DB
            const nbUsers = await dbClient.nbUsers();
            const nbFiles = await dbClient.nbFiles();

            return res.status(200).json({
                users: nbUsers,
                files: nbFiles
            });
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while fetching stats' });
        }
    }
}

export default AppController;

