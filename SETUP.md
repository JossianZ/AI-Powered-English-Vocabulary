# Setup Guide - AI Vocabulary Trainer

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ installed (optional - for database features)
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database Configuration (Optional)
DATABASE_URL=postgresql://username:password@localhost:5432/vocabulary_db

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# App Configuration
NEXT_PUBLIC_APP_NAME=AI Vocabulary Trainer
```

### 3. Database Setup (Optional)

If you want to use the progress tracking features:

#### Create Database

```bash
# Using psql
createdb vocabulary_db

# Or using PostgreSQL command line
psql -U postgres
CREATE DATABASE vocabulary_db;
```

#### Initialize Database Schema

```bash
# Run the initialization script
psql -U postgres -d vocabulary_db -f database/init.sql
```

Or you can let the application auto-initialize the database on first run.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Features Overview

### Without Database
- Browse vocabulary terms by category (Network, Coding, Hardware)
- View terms by difficulty level (Beginner, Intermediate, Advanced)
- Take interactive quizzes
- Multiple question types (Multiple choice, Matching, Fill-in-blank)
- Immediate feedback and scoring

### With Database
All above features plus:
- User progress tracking
- Learning statistics
- Mastered terms tracking
- Session history
- Streak tracking
- Achievements system

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── learn/             # Learning pages
│   │   ├── page.tsx       # Category selection
│   │   └── [category]/[level]/page.tsx  # Term viewing
│   ├── quiz/              # Quiz pages
│   │   └── [category]/[level]/page.tsx  # Quiz interface
│   ├── progress/          # Progress tracking
│   │   └── page.tsx       # Progress dashboard
│   └── api/               # API routes
│       ├── session/       # Session management
│       └── progress/      # Progress tracking
├── components/            # React components
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/               # UI components
│       ├── Button.tsx
│       └── Card.tsx
├── lib/                  # Utility functions
│   ├── vocabulary-data.ts  # Vocabulary database
│   ├── quiz-generator.ts   # Quiz generation logic
│   └── db.ts              # Database connection
├── types/                # TypeScript types
│   └── index.ts
└── styles/               # Global styles
    └── globals.css
```

## Customization

### Adding New Terms

Edit `src/lib/vocabulary-data.ts` and add new terms to the `vocabularyDatabase` array:

```typescript
{
  id: 'unique-id',
  term: 'Term Name',
  definition: 'Definition text',
  category: 'network' | 'coding' | 'hardware',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  example: 'Example sentence',
  synonyms: ['synonym1', 'synonym2'],
  relatedTerms: ['related1', 'related2'],
}
```

### Styling

- Colors: Edit `tailwind.config.ts`
- Global styles: Edit `src/app/globals.css`
- Animations: Modify Framer Motion configurations in components

### Quiz Configuration

Edit `src/lib/quiz-generator.ts` to:
- Change number of questions per quiz
- Modify question type distribution
- Adjust scoring algorithm
- Customize feedback messages

## Troubleshooting

### Database Connection Issues

1. Verify PostgreSQL is running:
```bash
pg_isready
```

2. Check connection string in `.env.local`

3. Ensure database exists:
```bash
psql -U postgres -l
```

### Build Errors

1. Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

2. Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

Change the port in `package.json`:
```json
"dev": "next dev -p 3001"
```

## Performance Optimization

- Images are optimized automatically by Next.js
- Framer Motion animations use GPU acceleration
- Database queries are indexed for fast retrieval
- Static pages are pre-rendered at build time

## Security Notes

- Never commit `.env.local` to version control
- Use environment variables for sensitive data
- Implement authentication before deploying to production
- Sanitize user inputs in API routes

## Support

For issues or questions:
1. Check the documentation
2. Review error logs in the console
3. Verify environment configuration
4. Check database connection

## License

MIT License - Feel free to use and modify for your projects!
