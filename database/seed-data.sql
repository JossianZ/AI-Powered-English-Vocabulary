-- Seed Data for AI Vocabulary Trainer
-- This file populates the database with sample data for testing

-- Insert demo user
INSERT INTO users (username, email) 
VALUES ('demo_user', 'demo@vocabulary.com')
ON CONFLICT (username) DO NOTHING;

-- Get the demo user ID
DO $$
DECLARE
    demo_user_id INTEGER;
BEGIN
    SELECT id INTO demo_user_id FROM users WHERE username = 'demo_user';

    -- Insert sample progress data
    INSERT INTO user_progress (user_id, category, level, correct_answers, total_questions, streak, last_studied)
    VALUES 
        (demo_user_id, 'network', 'beginner', 25, 30, 5, CURRENT_TIMESTAMP - INTERVAL '1 day'),
        (demo_user_id, 'network', 'intermediate', 15, 20, 3, CURRENT_TIMESTAMP - INTERVAL '2 days'),
        (demo_user_id, 'coding', 'beginner', 30, 35, 7, CURRENT_TIMESTAMP - INTERVAL '1 hour'),
        (demo_user_id, 'coding', 'intermediate', 12, 18, 2, CURRENT_TIMESTAMP - INTERVAL '3 days'),
        (demo_user_id, 'hardware', 'beginner', 8, 10, 3, CURRENT_TIMESTAMP - INTERVAL '5 hours')
    ON CONFLICT (user_id, category, level) DO UPDATE SET
        correct_answers = EXCLUDED.correct_answers,
        total_questions = EXCLUDED.total_questions,
        streak = EXCLUDED.streak,
        last_studied = EXCLUDED.last_studied;

    -- Insert mastered terms
    INSERT INTO mastered_terms (user_id, term_id, mastered_at)
    VALUES 
        (demo_user_id, 'net-001', CURRENT_TIMESTAMP - INTERVAL '5 days'),
        (demo_user_id, 'net-002', CURRENT_TIMESTAMP - INTERVAL '4 days'),
        (demo_user_id, 'net-003', CURRENT_TIMESTAMP - INTERVAL '3 days'),
        (demo_user_id, 'code-001', CURRENT_TIMESTAMP - INTERVAL '2 days'),
        (demo_user_id, 'code-002', CURRENT_TIMESTAMP - INTERVAL '1 day'),
        (demo_user_id, 'hw-001', CURRENT_TIMESTAMP - INTERVAL '6 hours')
    ON CONFLICT (user_id, term_id) DO NOTHING;

    -- Insert sample learning sessions
    INSERT INTO learning_sessions (user_id, category, level, start_time, end_time, score, total_questions)
    VALUES 
        (demo_user_id, 'network', 'beginner', CURRENT_TIMESTAMP - INTERVAL '2 days', CURRENT_TIMESTAMP - INTERVAL '2 days' + INTERVAL '15 minutes', 85, 10),
        (demo_user_id, 'coding', 'beginner', CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_TIMESTAMP - INTERVAL '1 day' + INTERVAL '12 minutes', 90, 10),
        (demo_user_id, 'hardware', 'beginner', CURRENT_TIMESTAMP - INTERVAL '5 hours', CURRENT_TIMESTAMP - INTERVAL '5 hours' + INTERVAL '10 minutes', 80, 10);

    -- Insert sample quiz results for the latest session
    DECLARE
        latest_session_id INTEGER;
    BEGIN
        SELECT id INTO latest_session_id FROM learning_sessions WHERE user_id = demo_user_id ORDER BY start_time DESC LIMIT 1;

        INSERT INTO quiz_results (session_id, question_id, term_id, is_correct, user_answer, correct_answer, time_spent)
        VALUES 
            (latest_session_id, 'q-hw-001', 'hw-001', true, 'Central Processing Unit - the brain of the computer', 'Central Processing Unit - the brain of the computer', 5000),
            (latest_session_id, 'q-hw-002', 'hw-002', true, 'Random Access Memory - temporary storage for running programs', 'Random Access Memory - temporary storage for running programs', 4500),
            (latest_session_id, 'q-hw-003', 'hw-003', false, 'Solid State Drive', 'A storage device that permanently stores data', 6000),
            (latest_session_id, 'q-hw-004', 'hw-004', true, 'The main circuit board that connects all computer components', 'The main circuit board that connects all computer components', 5500),
            (latest_session_id, 'q-hw-005', 'hw-005', true, 'Graphics Processing Unit - handles graphics rendering', 'Graphics Processing Unit - handles graphics rendering', 4000);
    END;
END $$;

-- Display summary
SELECT 
    'Database seeded successfully!' as message,
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM user_progress) as progress_records,
    (SELECT COUNT(*) FROM mastered_terms) as mastered_terms,
    (SELECT COUNT(*) FROM learning_sessions) as learning_sessions,
    (SELECT COUNT(*) FROM quiz_results) as quiz_results;
