// Test Database Connection
// Run with: node database/test-connection.js

const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  console.log('🔍 Testing database connection...\n');
  
  try {
    // Test basic connection
    const client = await pool.connect();
    console.log('✅ Database connection successful!\n');
    
    // Get database info
    const dbInfo = await client.query('SELECT version(), current_database(), current_user;');
    console.log('📊 Database Information:');
    console.log('   Version:', dbInfo.rows[0].version.split(',')[0]);
    console.log('   Database:', dbInfo.rows[0].current_database);
    console.log('   User:', dbInfo.rows[0].current_user);
    console.log('');
    
    // Check tables
    const tables = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public' 
      ORDER BY tablename;
    `);
    
    console.log('📋 Tables in database:');
    tables.rows.forEach(row => {
      console.log('   ✓', row.tablename);
    });
    console.log('');
    
    // Check data counts
    const counts = await client.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) as users,
        (SELECT COUNT(*) FROM user_progress) as progress,
        (SELECT COUNT(*) FROM mastered_terms) as mastered,
        (SELECT COUNT(*) FROM learning_sessions) as sessions,
        (SELECT COUNT(*) FROM quiz_results) as results;
    `);
    
    console.log('📈 Data Statistics:');
    console.log('   Users:', counts.rows[0].users);
    console.log('   Progress Records:', counts.rows[0].progress);
    console.log('   Mastered Terms:', counts.rows[0].mastered);
    console.log('   Learning Sessions:', counts.rows[0].sessions);
    console.log('   Quiz Results:', counts.rows[0].results);
    console.log('');
    
    // Check indexes
    const indexes = await client.query(`
      SELECT indexname 
      FROM pg_indexes 
      WHERE schemaname = 'public' 
      ORDER BY indexname;
    `);
    
    console.log('🔍 Indexes created:', indexes.rows.length);
    console.log('');
    
    client.release();
    
    console.log('✅ All checks passed! Database is ready to use.\n');
    
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error('Error:', error.message);
    console.error('\nPlease check:');
    console.error('1. PostgreSQL service is running');
    console.error('2. Database "vocabulary_db" exists');
    console.error('3. Credentials in .env.local are correct');
    console.error('4. Connection string format is correct\n');
    process.exit(1);
  } finally {
    await pool.end();
  }
}

testConnection();
