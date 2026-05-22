import { NextRequest, NextResponse } from 'next/server'
import { query, testConnection } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const dbTest = await testConnection()
    if (!dbTest.success) {
      console.warn('Database not available, session not saved')
      return NextResponse.json({ 
        success: false, 
        message: 'Database not available, progress not saved',
        sessionId: null 
      })
    }

    const body = await request.json()
    const { userId = '1', category, level, score, totalQuestions, results } = body

    const sessionResult = await query(
      `INSERT INTO learning_sessions (user_id, category, level, end_time, score, total_questions)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4, $5)
      RETURNING id`,
      [userId, category, level, score, totalQuestions]
    )

    const sessionId = sessionResult.rows[0].id

    if (results && results.length > 0) {
      for (const result of results) {
        await query(
          `INSERT INTO quiz_results (session_id, question_id, term_id, is_correct, user_answer, correct_answer, time_spent)
          VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            sessionId,
            result.questionId,
            result.termId,
            result.isCorrect,
            result.userAnswer,
            result.correctAnswer,
            result.timeSpent,
          ]
        )

        if (result.isCorrect) {
          await query(
            `INSERT INTO mastered_terms (user_id, term_id)
            VALUES ($1, $2)
            ON CONFLICT (user_id, term_id) DO NOTHING`,
            [userId, result.termId]
          )
        }
      }
    }

    return NextResponse.json({ success: true, sessionId })
  } catch (error) {
    console.error('Error saving session:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save session' },
      { status: 500 }
    )
  }
}
