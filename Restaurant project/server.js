const express = require('express');
const path = require('path'); // Import the path module

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define other routes if needed
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

