const express = require('express');
const app = express();

// Sample data for the feed
const feedData = [
    { id: 1, content: 'First feed item' },
    { id: 2, content: 'Second feed item' },
    { id: 3, content: 'Third feed item' },
];

// Define the /feed route
app.get('/feed', (req, res) => {
    res.json(feedData);
});

// Optional: Define other routes
app.get('/', (req, res) => {
    res.send('Hello from Lambda!');
});

module.exports = app;