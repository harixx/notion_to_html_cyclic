const axios = require('axios');

// Replace 'YOUR_NOTION_API_KEY' and 'YOUR_DATABASE_ID' with your actual Notion API key and database ID
const NOTION_API_KEY = 'secret_BxuXuKSNl1bPvQhgcZOUdAZUv73yXvIgy1y2Ur7QAy4';
const DATABASE_ID = '58e22306-a3a0-4f66-9662-1867f18c365b';

const NOTION_API_URL = 'https://api.notion.com/v1/databases/' + DATABASE_ID + '/query';

const headers = {
    'Authorization': `Bearer ${NOTION_API_KEY}`,
    'Notion-Version': '2022-06-28',
};

async function fetchNotionData() {
    try {
        const response = await axios.post(NOTION_API_URL, {}, { headers });

        return response.data.results;
    } catch (error) {
        throw new Error(`Error fetching Notion data: ${error.message}`);
    }
}

function extractTextFromRichText(properties) {
    const richTextProperties = properties['Description']?.rich_text || properties['Description']?.children || [];

    if (richTextProperties.length > 0) {
        const plainText = richTextProperties.map(textObj => textObj.text.content).join('');
        const htmlContent = richTextProperties.map(textObj => {
            const text = textObj.text.content;
            const isBold = textObj.annotations.bold;
            const formattedText = isBold ? `<b>${text}</b>` : text;

            return formattedText;
        }).join('');

        return { plainText, htmlContent };
    }

    return { plainText: 'No content available', htmlContent: 'No content available' };
}

async function fetchAndFormatNotionData() {
    try {
        const notionItems = await fetchNotionData();

        const formattedData = notionItems.map(item => {
            const id = item.id;
            const title = item.properties.Name.title[0]?.text.content || 'No Title';

            if (item.properties.Description) {
                const richTextContent = extractTextFromRichText(item.properties.Description);
                return {
                    id,
                    title,
                    richTextContent,
                };
            } else {
                // Handle other block types if needed
                return {
                    id,
                    title,
                    richTextContent: { plainText: 'No content available', htmlContent: 'No content available' },
                };
            }
        });

        console.log(formattedData);
    } catch (error) {
        console.error(error.message);
    }
}

fetchAndFormatNotionData();
