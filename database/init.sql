-- AI Vocabulary Trainer Database Schema
-- Version: 1.0
-- Description: Complete database schema for vocabulary learning application

\echo 'Creating database schema...'

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS quiz_results CASCADE;
DROP TABLE IF EXISTS learning_sessions CASCADE;
DROP TABLE IF EXISTS mastered_terms CASCADE;
DROP TABLE IF EXISTS user_progress CASCADE;
DROP TABLE IF EXISTS users CASCADE;

\echo 'Creating users table...'

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

\echo 'Creating user_progress table...'

-- User progress table
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL CHECK (category IN ('network', 'coding', 'hardware')),
  level VARCHAR(50) NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  correct_answers INTEGER DEFAULT 0 CHECK (correct_answers >= 0),
  total_questions INTEGER DEFAULT 0 CHECK (total_questions >= 0),
  streak INTEGER DEFAULT 0 CHECK (streak >= 0),
  last_studied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, category, level)
);

\echo 'Creating mastered_terms table...'

-- Mastered terms table
CREATE TABLE mastered_terms (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  term_id VARCHAR(50) NOT NULL,
  mastered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  review_count INTEGER DEFAULT 1,
  UNIQUE(user_id, term_id)
);

\echo 'Creating learning_sessions table...'

-- Learning sessions table
CREATE TABLE learning_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL CHECK (category IN ('network', 'coding', 'hardware')),
  level VARCHAR(50) NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  total_questions INTEGER CHECK (total_questions > 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

\echo 'Creating quiz_results table...'

-- Quiz results table
CREATE TABLE quiz_results (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES learning_sessions(id) ON DELETE CASCADE,
  question_id VARCHAR(50) NOT NULL,
  term_id VARCHAR(50) NOT NULL,
  is_correct BOOLEAN NOT NULL,
  user_answer TEXT,
  correct_answer TEXT,
  time_spent INTEGER CHECK (time_spent >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

\echo 'Creating indexes...'

-- Create indexes for better performance
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_category ON user_progress(category);
CREATE INDEX idx_user_progress_level ON user_progress(level);
CREATE INDEX idx_mastered_terms_user_id ON mastered_terms(user_id);
CREATE INDEX idx_mastered_terms_term_id ON mastered_terms(term_id);
CREATE INDEX idx_learning_sessions_user_id ON learning_sessions(user_id);
CREATE INDEX idx_learning_sessions_category ON learning_sessions(category);
CREATE INDEX idx_learning_sessions_created_at ON learning_sessions(created_at DESC);
CREATE INDEX idx_quiz_results_session_id ON quiz_results(session_id);
CREATE INDEX idx_quiz_results_term_id ON quiz_results(term_id);

\echo 'Creating functions and triggers...'

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users table
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

\echo 'Inserting demo data...'

-- Insert demo user
INSERT INTO users (username, email) 
VALUES ('demo_user', 'demo@vocabulary.com')
ON CONFLICT (username) DO NOTHING;

-- Get demo user ID and insert sample data
DO $$
DECLARE
    demo_user_id INTEGER;
BEGIN
    SELECT id INTO demo_user_id FROM users WHERE username = 'demo_user';

    -- Sample progress data
    INSERT INTO user_progress (user_id, category, level, correct_answers, total_questions, streak)
    VALUES 
      (demo_user_id, 'network', 'beginner', 25, 30, 5),
      (demo_user_id, 'coding', 'beginner', 30, 35, 7),
      (demo_user_id, 'hardware', 'beginner', 8, 10, 3)
    ON CONFLICT (user_id, category, level) DO NOTHING;
END $$;

\echo 'Database schema created successfully!'

-- Display table information
\echo ''
\echo '==================================='
\echo 'Database Tables Created:'
\echo '==================================='
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

\echo ''
\echo '==================================='
\echo 'Summary:'
\echo '==================================='
SELECT 
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM user_progress) as progress_records,
    (SELECT COUNT(*) FROM mastered_terms) as mastered_terms,
    (SELECT COUNT(*) FROM learning_sessions) as learning_sessions,
    (SELECT COUNT(*) FROM quiz_results) as quiz_results;
