// server.js
import express from 'express';
import AppController from './controllers/AppController.js';
import { redisClient, dbClient } from './utils';

const app = express();
const port = process.env.PORT || 5000;

// Load routes
app.get('/status', AppController.getStatus);
app.get('/stats', AppController.getStats);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
