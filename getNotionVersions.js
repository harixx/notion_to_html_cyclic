const axios = require('axios');

async function getNotionDatabaseData() {
  try {
    const response = await axios.get('https://api.notion.com/v1/databases/58e22306a3a04f6696621867f18c365b?v=7a2cab1e1d3242f7a02601438c823f28', {
      headers: {
        'Authorization': 'Bearer secret_JWeMVmEmwo4xjgVJ8e16epv5cPpkQX7gkjewDrd0H2S',
        'Notion-Version': '2022-06-28', // Replace with the latest Notion API version
      },
    });

    const databaseData = response.data;

    // Log the retrieved Notion database data
    console.log('Retrieved Notion Database Data:', databaseData);

    // Process the data as needed
    // ...

  } catch (error) {
    console.error('Error fetching Notion database data:', error.message);
    throw error;
  }
}

// Example usage
getNotionDatabaseData();
