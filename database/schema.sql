-- users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  bio TEXT,
  user_id TEXT UNIQUE NOT NULL
  registered_on DATE DEFAULT CURRENT_DATE
);


--blogs
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(user_id)
  blog_id VARCHAR(20) UNIQUE NOT NULL,
  title VARCHAR(100),
  category VARCHAR(50),
  author VARCHAR(255),
  body TEXT,
  topic VARCHAR(255),
  views INT DEFAULT 0,
  posted_on DATE DEFAULT CURRENT_DATE
);




