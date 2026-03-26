// api/items/by-canvas.js
const { Client } = require('pg');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { canvas } = req.query;
  console.log("🪶 /api/items/by-canvas called with canvas:", canvas);

  if (!canvas) {
    return res.status(400).json({ error: 'Canvas URL is required' });
  }

  let client;

  try {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false, require: true }
    });
    await client.connect();

    const query = `
      SELECT 
        i.title_id,
        i.item_id,
        i.title_name,
        i.title_description,
        i.title_extent,
        i.location,
        i.year,
        i.date,
        i.datetime,
        i.language,
        i.topics,
        i.related_people,
        i.related_folios,
        i.original_text,
        i.translated_text,
        i.canvas_link,
        i.modern_day_country,
        v.volume_id,
        v.volume_number,
        v.volume_extent AS volume_extent_info,
        v.volume_preview,
        v.volume_manifest
      FROM items i
      JOIN volumes v ON i.volume_id = v.volume_id
      WHERE i.canvas_link = $1
      LIMIT 1
    `;

    console.log("🪶 Executing DB query...");
    const result = await client.query(query, [canvas]);
    console.log("🪶 Query returned rows:", result.rows.length);

    if (result.rows.length === 0) {
      console.warn("⚠️ No metadata found for canvas:", canvas);
      return res.status(404).json({ error: 'No metadata found for this canvas' });
    }

    console.log("✅ Found metadata for title_id:", result.rows[0].title_id);
    return res.status(200).json(result.rows[0]);

  } catch (err) {
    console.error("💥 Error fetching metadata:", err.message);
    return res.status(500).json({ error: 'Failed to fetch item data', details: err.message });
  } finally {
    if (client) await client.end();
  }
};
