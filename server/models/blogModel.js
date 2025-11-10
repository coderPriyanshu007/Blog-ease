
import pool from '../config/db.js';


export const fetchAllBlogs = async () => {
  const { rows } = await pool.query('SELECT * FROM blogs ORDER BY id DESC');
  return rows;
}



export const insertBlog = async (blog) => {
  const { blog_id, title, category, body,author,topic,user_id } = blog;
  const query = `
    INSERT INTO blogs (blog_id, title, category,  body,author,topic,user_id)
    VALUES ($1, $2, $3, $4, $5, $6,$7)
  `;
  const values = [blog_id, title, category,  body,author,topic,user_id];
  await pool.query(query, values);
}

export const getBlogById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
  return rows[0];
}


export const updateBlog = async (id, blog) => {
  const { title, category, topic, author, body } = blog;
  const query = `
    UPDATE blogs
    SET title = $1, category = $2, topic = $3,  author = $4, body = $5
    WHERE blog_id = $6
    RETURNING *
  `;
  const values = [title, category, topic, author, body, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

export const updateViews = async (id) => { 
  await pool.query('UPDATE blogs SET views = views + 1 WHERE id = $1',[id])
}





export const removeBlog = async (blog_id) => {
  await pool.query('DELETE FROM blogs where blog_id = $1', [blog_id]);
}



