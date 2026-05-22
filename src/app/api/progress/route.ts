import { NextRequest, NextResponse } from 'next/server'
import { query, testConnection } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Test database connection first
    const dbTest = await testConnection()
    if (!dbTest.success) {
      console.warn('Database not available, returning mock data')
      return NextResponse.json({
        progress: [],
        masteredTerms: 0,
        recentSessions: [],
        usingMockData: true,
      })
    }

    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId') || '1'

    const progressResult = await query(
      `SELECT 
        category,
        level,
        correct_answers,
        total_questions,
        streak,
        last_studied
      FROM user_progress
      WHERE user_id = $1`,
      [userId]
    )

    const masteredResult = await query(
      `SELECT COUNT(*) as count FROM mastered_terms WHERE user_id = $1`,
      [userId]
    )

    const sessionsResult = await query(
      `SELECT 
        category,
        level,
        score,
        total_questions,
        start_time,
        end_time
      FROM learning_sessions
      WHERE user_id = $1
      ORDER BY start_time DESC
      LIMIT 10`,
      [userId]
    )

    return NextResponse.json({
      progress: progressResult.rows,
      masteredTerms: parseInt(masteredResult.rows[0]?.count || '0'),
      recentSessions: sessionsResult.rows,
      usingMockData: false,
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json({
      progress: [],
      masteredTerms: 0,
      recentSessions: [],
      usingMockData: true,
      error: 'Database unavailable',
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const dbTest = await testConnection()
    if (!dbTest.success) {
      return NextResponse.json({ 
        success: false, 
        message: 'Database not available' 
      })
    }

    const body = await request.json()
    const { userId = '1', category, level, correctAnswers, totalQuestions } = body

    await query(
      `INSERT INTO user_progress (user_id, category, level, correct_answers, total_questions, last_studied)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id, category, level)
      DO UPDATE SET
        correct_answers = user_progress.correct_answers + $4,
        total_questions = user_progress.total_questions + $5,
        last_studied = CURRENT_TIMESTAMP`,
      [userId, category, level, correctAnswers, totalQuestions]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}
