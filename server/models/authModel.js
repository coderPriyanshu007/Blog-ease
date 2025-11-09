// backend/models/authModel.js
import pool from '../config/db.js';

// Create a new user
export const createUser = async ({ username, email, password }) => {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email
  `;
  const values = [username, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Find user by email
export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
