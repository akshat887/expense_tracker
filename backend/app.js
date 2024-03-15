const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const routes = readdirSync('./routes');
routes.forEach((route) => {
    const routePath = require(`./routes/${route}`);
    if (typeof routePath === 'function') {
        app.use('/api/v1', routePath);
    }
});

// Default route
app.get("/", (req, res) => res.send("Express on Vercel"));

// Start the server
const server = async () => {
    try {
        await db(); // Connect to database
        app.listen(PORT, () => {
            console.log('Server is listening on port:', PORT);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

server(); // Start the server

module.exports = app; // Export app for testing purposes or future integration
