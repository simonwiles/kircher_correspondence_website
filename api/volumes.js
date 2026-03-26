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
    console.log('🔍 Connecting to database...');
    
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    });

    await client.connect();
    console.log('✅ Connected to database');
    
    const result = await client.query(
      'SELECT volume_id, volume_number, volume_extent, volume_preview, volume_manifest FROM volumes ORDER BY volume_id'
    );
    
    console.log('✅ Found', result.rows.length, 'volumes');
    res.status(200).json(result.rows);
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ 
      error: 'Failed to fetch volumes',
      details: err.message
    });
  } finally {
    if (client) {
      try {
        await client.end();
      } catch (e) {
        console.error('Error closing client:', e);
      }
    }
  }
};