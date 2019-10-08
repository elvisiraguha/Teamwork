import { Pool } from 'pg';
import { config } from 'dotenv';

config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

class connect {
  static async connectToDB(dbQuery) {
    try {
      const result = await pool.query(dbQuery);
      return result.rows[0];
    } catch (error) {
      return error;
    }
  }
}

export default connect;
