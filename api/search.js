const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { q, language, topic, limit, offset } = req.query;
  
  if (!q && !language && !topic) {
    return res.status(400).json({ error: 'Search query, language, or topic required' });
  }
  
  try {
    // Build dynamic WHERE clause
    const conditions = [];
    const params = [];
    let paramCount = 1;
    
    if (q) {
      params.push(`%${q}%`);
      conditions.push(`(title_name ILIKE $${paramCount} 
                       OR title_description ILIKE $${paramCount} 
                       OR related_people ILIKE $${paramCount} 
                       OR topics ILIKE $${paramCount}
                       OR location ILIKE $${paramCount}
                       OR modern_day_country ILIKE $${paramCount})`);
      paramCount++;
    }
    
    if (language) {
      params.push(language);
      conditions.push(`language = $${paramCount}`);
      paramCount++;
    }
    
    if (topic) {
      params.push(`%${topic}%`);
      conditions.push(`topics ILIKE $${paramCount}`);
      paramCount++;
    }
    
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    
    // Parse limit and offset with defaults
    const limitValue = parseInt(limit) || 50;
    const offsetValue = parseInt(offset) || 0;
    
    params.push(limitValue, offsetValue);
    
    const query = `
      SELECT * FROM items 
      ${whereClause}
      ORDER BY item_id
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;
    
    console.log('Query:', query);
    console.log('Params:', params);
    
    const result = await pool.query(query, params);
    
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error searching items:', err);
    res.status(500).json({ error: 'Failed to search items' });
  }
};