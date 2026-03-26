// api/items.js
const { Client } = require('pg');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let client;
  try {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false, require: true }
    });
    await client.connect();
    
    const { canvas_link, volume_id, search } = req.query;
    
    let query, params;
    
    if (canvas_link) {
      // Search by canvas link
      query = 'SELECT * FROM items WHERE canvas_link = $1';
      params = [canvas_link];
    } else if (search && volume_id) {
      // Search by keyword within volume
      query = `
        SELECT * FROM items 
        WHERE volume_id = $1 
        AND (
          title_name ILIKE $2 
          OR related_folios ILIKE $2 
          OR canvas_link ILIKE $2
        )
        ORDER BY item_id
        LIMIT 20
      `;
      params = [volume_id, `%${search}%`];
    } else {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    const result = await client.query(query, params);
    res.status(200).json(result.rows);
    
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch items', details: err.message });
  } finally {
    if (client) await client.end();
  }
};