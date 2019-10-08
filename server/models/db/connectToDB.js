import { Pool } from 'pg';
import { config } from 'dotenv';

config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

class connectToDB {
  static async select(table, selector, key) {
    try {
      const dbQuery = {
        text: `SELECT * FROM ${table} WHERE ${selector} = $1;`,
        values: [key],
      };
      const result = await pool.query(dbQuery);
      return result.rows[0];
    } catch (error) {
      return error;
    }
  }

  static async insertUser(values) {
    try {
      const dbQuery = {
        text: 'INSERT INTO users (firstname, lastname, email, password, gender, jobrole, address, department, isadmin) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        values,
      };
      const result = await pool.query(dbQuery);
      return result.rows[0];
    } catch (error) {
      return error;
    }
  }
}

export default connectToDB;
