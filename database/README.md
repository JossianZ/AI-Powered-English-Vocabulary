# Database Setup Guide

## PostgreSQL Database for AI Vocabulary Trainer

### ✅ Database Status: CONFIGURED

The database has been successfully created and initialized with the following:

- **Database Name**: `vocabulary_db`
- **Tables Created**: 5
- **Sample Data**: Loaded
- **Indexes**: Created
- **Triggers**: Configured

---

## 📊 Database Structure

### Tables

1. **users** - User accounts
   - id (Primary Key)
   - username (Unique)
   - email (Unique)
   - created_at
   - updated_at

2. **user_progress** - Learning progress tracking
   - id (Primary Key)
   - user_id (Foreign Key → users)
   - category (network, coding, hardware)
   - level (beginner, intermediate, advanced)
   - correct_answers
   - total_questions
   - streak
   - last_studied

3. **mastered_terms** - Completed vocabulary terms
   - id (Primary Key)
   - user_id (Foreign Key → users)
   - term_id
   - mastered_at
   - review_count

4. **learning_sessions** - Quiz session history
   - id (Primary Key)
   - user_id (Foreign Key → users)
   - category
   - level
   - start_time
   - end_time
   - score
   - total_questions

5. **quiz_results** - Individual quiz answers
   - id (Primary Key)
   - session_id (Foreign Key → learning_sessions)
   - question_id
   - term_id
   - is_correct
   - user_answer
   - correct_answer
   - time_spent

---

## 🔧 Current Data

### Sample Data Loaded:
- ✅ 1 Demo User (username: demo_user)
- ✅ 5 Progress Records
- ✅ 6 Mastered Terms
- ✅ 3 Learning Sessions
- ✅ 5 Quiz Results

---

## 🚀 Quick Commands

### Connect to Database
```bash
psql -U postgres -d vocabulary_db
```

### View All Tables
```sql
\dt
```

### View Table Structure
```sql
\d users
\d user_progress
\d mastered_terms
\d learning_sessions
\d quiz_results
```

### Check Data
```sql
-- View all users
SELECT * FROM users;

-- View progress
SELECT * FROM user_progress;

-- View mastered terms
SELECT * FROM mastered_terms;

-- View sessions
SELECT * FROM learning_sessions;

-- View quiz results
SELECT * FROM quiz_results;
```

### Useful Queries

```sql
-- Get user statistics
SELECT 
    u.username,
    COUNT(DISTINCT up.category) as categories_studied,
    SUM(up.correct_answers) as total_correct,
    SUM(up.total_questions) as total_questions,
    ROUND(AVG(up.correct_answers::float / NULLIF(up.total_questions, 0) * 100), 2) as avg_accuracy
FROM users u
LEFT JOIN user_progress up ON u.id = up.user_id
GROUP BY u.id, u.username;

-- Get recent sessions
SELECT 
    ls.id,
    u.username,
    ls.category,
    ls.level,
    ls.score,
    ls.total_questions,
    ls.start_time
FROM learning_sessions ls
JOIN users u ON ls.user_id = u.id
ORDER BY ls.start_time DESC
LIMIT 10;

-- Get mastered terms count by category
SELECT 
    SUBSTRING(term_id FROM 1 FOR POSITION('-' IN term_id) - 1) as category,
    COUNT(*) as mastered_count
FROM mastered_terms
GROUP BY category;
```

---

## 🔄 Reset Database

If you need to reset the database:

```bash
# Using PowerShell script
.\database\setup-database.ps1

# Or manually
psql -U postgres -c "DROP DATABASE vocabulary_db;"
psql -U postgres -c "CREATE DATABASE vocabulary_db;"
psql -U postgres -d vocabulary_db -f database/init.sql
psql -U postgres -d vocabulary_db -f database/seed-data.sql
```

---

## 🔐 Security Notes

1. **Update Password**: Change the default password in `.env.local`
2. **Environment Variables**: Never commit `.env.local` to version control
3. **Production**: Use environment-specific credentials
4. **Backup**: Regularly backup your database

---

## 📝 Backup & Restore

### Backup Database
```bash
pg_dump -U postgres vocabulary_db > backup.sql
```

### Restore Database
```bash
psql -U postgres vocabulary_db < backup.sql
```

---

## 🐛 Troubleshooting

### Connection Issues
1. Check if PostgreSQL service is running
2. Verify credentials in `.env.local`
3. Ensure database exists: `psql -U postgres -l`

### Permission Issues
```sql
GRANT ALL PRIVILEGES ON DATABASE vocabulary_db TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
```

### Reset Sequences
```sql
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('user_progress_id_seq', (SELECT MAX(id) FROM user_progress));
```

---

## 📊 Performance Optimization

### Indexes Created
- user_progress: user_id, category, level
- mastered_terms: user_id, term_id
- learning_sessions: user_id, category, created_at
- quiz_results: session_id, term_id

### Analyze Tables
```sql
ANALYZE users;
ANALYZE user_progress;
ANALYZE mastered_terms;
ANALYZE learning_sessions;
ANALYZE quiz_results;
```

---

## 🔗 Connection String

```
postgresql://postgres:your_password@localhost:5432/vocabulary_db
```

Update `your_password` in `.env.local` with your actual PostgreSQL password.

---

## ✅ Verification Checklist

- [x] Database created
- [x] Tables created (5 tables)
- [x] Indexes created (10 indexes)
- [x] Triggers configured
- [x] Sample data loaded
- [x] Foreign keys configured
- [x] Constraints added
- [x] Functions created

---

**Database is ready to use!** 🎉

Start the application with `npm run dev` and the database will be automatically connected.
