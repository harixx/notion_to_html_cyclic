const express = require("express");
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Example endpoint to fetch Notion data
app.get('/notion-data', async (req, res) => {
  try {
    const notionData = await axios.get('https://api.notion.com/v1/muhammadharissalman/58e22306a3a04f6696621867f18c365b?v=7a2cab1e1d3242f7a02601438c823f28', {
      headers: {
        Authorization: 'Bearer secret_BxuXuKSNl1bPvQhgcZOUdAZUv73yXvIgy1y2Ur7QAy4',
        'Notion-Version': '2022-06-28',  // Replace with the latest Notion API version
      },
    });
    res.json(notionData.data);
  } catch (error) {
    console.error('Error fetching Notion data', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Notion data fetcher!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}...`);
});
