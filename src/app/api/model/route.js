import { NextResponse } from 'next/server';
import { Pool } from 'pg';


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

export async function GET() {
  try {
    const result = await pool.query('SELECT file_data FROM models WHERE id = $1', [1]);
    
    if (result.rows.length > 0) {
      const modelData = result.rows[0].file_data;
      
      return new NextResponse(modelData, {
        status: 200,
        headers: {
          'Content-Type': 'model/gltf-binary',
          'Content-Disposition': 'attachment; filename="vaconMCXCover1.glb"'
        }
      });
    } else {
      console.log('Model not found');
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching model:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
