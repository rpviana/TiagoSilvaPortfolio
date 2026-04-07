import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

async function runMigration() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('Conectando à base de dados...');
    const client = await pool.connect();
    
    try {
      // Ler o ficheiro de migration
      const migrationPath = path.join(__dirname, 'migrations', 'add_projects_site_content.sql');
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
      
      console.log('Executando migration: add_projects_site_content.sql');
      await client.query(migrationSQL);
      
      console.log('✅ Migration executada com sucesso!');
      
      // Verificar os registos inseridos
      const result = await client.query(
        "SELECT key, value_pt, value_en FROM site_content WHERE key LIKE 'projects_%' ORDER BY key"
      );
      
      console.log(`\n📋 Registos na tabela site_content (${result.rows.length} total):`);
      result.rows.forEach(row => {
        console.log(`  - ${row.key}`);
      });
      
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('❌ Erro ao executar migration:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
