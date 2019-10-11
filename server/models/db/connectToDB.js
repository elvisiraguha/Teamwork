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
      throw new Error(error);
    }
  }

  static async selectWhole(table, selector, key) {
    try {
      const dbQuery = {
        text: `SELECT * FROM ${table} WHERE ${selector} = $1;`,
        values: [key],
      };
      const result = await pool.query(dbQuery);
      return result.rows;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async selectArticles() {
    try {
      const dbQuery = {
        text: 'SELECT * FROM articles',
        values: [],
      };
      const result = await pool.query(dbQuery);
      return result.rows;
    } catch (error) {
      throw new Error(error);
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
      throw new Error(error);
    }
  }

  static async insertArticles(values) {
    try {
      const dbQuery = {
        text: 'INSERT INTO articles (title, article, createdon, authorid) VALUES($1, $2, $3, $4) RETURNING *',
        values,
      };
      const result = await pool.query(dbQuery);
      return result.rows[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateArticle(values) {
    try {
      const dbQuery = {
        text: 'UPDATE articles SET title = $2, article = $3 WHERE id = $1 RETURNING *',
        values,
      };
      const result = await pool.query(dbQuery);
      return result.rows[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async delete(values) {
    try {
      const dbQuery = {
        text: 'DELETE FROM articles WHERE id = $1 RETURNING *',
        values,
      };
      const result = await pool.query(dbQuery);
      return result.rows[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async insertComment(values) {
    try {
      const dbQuery = {
        text: 'INSERT INTO comments (comment, article, articleid, createdon, authorid) VALUES($1, $2, $3, $4, $5) RETURNING *',
        values,
      };
      const result = await pool.query(dbQuery);
      return result.rows[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async execute(dbQuery) {
    try {
      const result = await pool.query(dbQuery);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default connectToDB;
