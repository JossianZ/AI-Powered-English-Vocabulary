import { Pool } from 'pg'

let pool: Pool | null = null

export function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL
    
    if (!connectionString) {
      console.warn('DATABASE_URL not found, database features will be disabled')
      return null
    }

    try {
      pool = new Pool({
        connectionString,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      })

      pool.on('error', (err) => {
        console.error('Unexpected database error:', err)
      })
    } catch (error) {
      console.error('Failed to create database pool:', error)
      return null
    }
  }
  return pool
}

export async function query(text: string, params?: any[]) {
  const pool = getPool()
  
  if (!pool) {
    throw new Error('Database connection not available')
  }

  try {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Query executed:', { duration: `${duration}ms`, rows: res.rowCount })
    }
    
    return res
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

// Test database connection
export async function testConnection() {
  try {
    const pool = getPool()
    if (!pool) {
      return { success: false, message: 'Database not configured' }
    }

    const result = await pool.query('SELECT NOW()')
    return { 
      success: true, 
      message: 'Database connected successfully',
      timestamp: result.rows[0].now 
    }
  } catch (error: any) {
    return { 
      success: false, 
      message: error.message || 'Database connection failed' 
    }
  }
}
