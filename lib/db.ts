import { Pool } from 'pg'

declare global {
	var pgPool: Pool | undefined
}

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
	throw new Error('DATABASE_URL environment variable is required')
}

export const pool: Pool =
	global.pgPool ||
	new Pool({
		connectionString,
		ssl: process.env.PGSSL === 'false' ? false : { rejectUnauthorized: false },
	})

if (process.env.NODE_ENV !== 'production') {
	global.pgPool = pool
}

export async function query<T = any>(text: string, params?: any[]): Promise<{ rows: T[] }> {
	return pool.query(text, params)
}


