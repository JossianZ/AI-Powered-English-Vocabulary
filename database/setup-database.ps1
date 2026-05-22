# PostgreSQL Database Setup Script for AI Vocabulary Trainer
# This script creates the database and initializes all tables

$PSQL = "C:\Program Files\PostgreSQL\17\bin\psql.exe"
$DB_NAME = "vocabulary_db"
$DB_USER = "postgres"

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "AI Vocabulary Trainer - Database Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if database exists
Write-Host "Checking if database exists..." -ForegroundColor Yellow
$dbExists = & $PSQL -U $DB_USER -lqt | Select-String -Pattern "^\s*$DB_NAME\s"

if ($dbExists) {
    Write-Host "Database '$DB_NAME' already exists." -ForegroundColor Green
    $response = Read-Host "Do you want to drop and recreate it? (y/N)"
    
    if ($response -eq 'y' -or $response -eq 'Y') {
        Write-Host "Dropping existing database..." -ForegroundColor Yellow
        & $PSQL -U $DB_USER -c "DROP DATABASE IF EXISTS $DB_NAME;"
        Write-Host "Creating new database..." -ForegroundColor Yellow
        & $PSQL -U $DB_USER -c "CREATE DATABASE $DB_NAME;"
    }
} else {
    Write-Host "Creating database '$DB_NAME'..." -ForegroundColor Yellow
    & $PSQL -U $DB_USER -c "CREATE DATABASE $DB_NAME;"
}

Write-Host ""
Write-Host "Initializing database schema..." -ForegroundColor Yellow

# Run the initialization script
$initScript = Join-Path $PSScriptRoot "init.sql"
& $PSQL -U $DB_USER -d $DB_NAME -f $initScript

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==================================" -ForegroundColor Green
    Write-Host "Database setup completed successfully!" -ForegroundColor Green
    Write-Host "==================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Database: $DB_NAME" -ForegroundColor Cyan
    Write-Host "Connection string: postgresql://$DB_USER:password@localhost:5432/$DB_NAME" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Update .env.local with your database password" -ForegroundColor White
    Write-Host "2. Run 'npm run dev' to start the application" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "Error: Database setup failed!" -ForegroundColor Red
    exit 1
}
