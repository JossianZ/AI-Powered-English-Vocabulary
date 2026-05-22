import { VocabularyTerm, QuizQuestion } from '@/types'

export function generateMultipleChoiceQuestion(
  term: VocabularyTerm,
  allTerms: VocabularyTerm[]
): QuizQuestion {
  // Get 3 random wrong answers from the same category
  const wrongAnswers = allTerms
    .filter(t => t.id !== term.id && t.category === term.category)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(t => t.definition)

  // Combine correct and wrong answers and shuffle
  const options = [term.definition, ...wrongAnswers].sort(() => Math.random() - 0.5)

  return {
    id: `q-${term.id}`,
    term,
    type: 'multiple-choice',
    options,
    correctAnswer: term.definition,
  }
}

export function generateMatchingQuestion(
  term: VocabularyTerm,
  allTerms: VocabularyTerm[]
): QuizQuestion {
  // Get 3 additional terms for matching
  const additionalTerms = allTerms
    .filter(t => t.id !== term.id && t.category === term.category)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  const allMatchTerms = [term, ...additionalTerms]
  const options = allMatchTerms.map(t => t.definition).sort(() => Math.random() - 0.5)

  return {
    id: `q-${term.id}`,
    term,
    type: 'matching',
    options,
    correctAnswer: term.definition,
  }
}

export function generateFillInBlankQuestion(term: VocabularyTerm): QuizQuestion {
  // Replace the term in the example with a blank
  const example = term.example.replace(
    new RegExp(term.term, 'gi'),
    '______'
  )

  return {
    id: `q-${term.id}`,
    term: { ...term, example },
    type: 'fill-in-blank',
    correctAnswer: term.term.toLowerCase(),
  }
}

export function generateQuiz(
  terms: VocabularyTerm[],
  allTerms: VocabularyTerm[],
  questionCount: number = 10
): QuizQuestion[] {
  const selectedTerms = terms.slice(0, questionCount)
  const questions: QuizQuestion[] = []

  selectedTerms.forEach((term, index) => {
    // Vary question types
    const questionType = index % 3
    
    if (questionType === 0) {
      questions.push(generateMultipleChoiceQuestion(term, allTerms))
    } else if (questionType === 1) {
      questions.push(generateMatchingQuestion(term, allTerms))
    } else {
      questions.push(generateFillInBlankQuestion(term))
    }
  })

  return questions
}

export function calculateScore(results: { isCorrect: boolean }[]): number {
  const correct = results.filter(r => r.isCorrect).length
  return Math.round((correct / results.length) * 100)
}

export function getPerformanceFeedback(score: number): {
  message: string
  color: string
  emoji: string
} {
  if (score >= 90) {
    return {
      message: 'Outstanding! You\'re mastering these terms!',
      color: 'text-green-600',
      emoji: '🎉',
    }
  } else if (score >= 70) {
    return {
      message: 'Great job! Keep up the good work!',
      color: 'text-blue-600',
      emoji: '👏',
    }
  } else if (score >= 50) {
    return {
      message: 'Good effort! Practice makes perfect!',
      color: 'text-yellow-600',
      emoji: '💪',
    }
  } else {
    return {
      message: 'Keep practicing! You\'ll improve!',
      color: 'text-orange-600',
      emoji: '📚',
    }
  }
}
