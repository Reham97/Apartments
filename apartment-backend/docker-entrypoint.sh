#!/bin/sh

echo "Waiting for database..."
until nc -z db 5432; do
  sleep 1
done

echo "Database is available"

echo "Running Prisma generate..."
npm run prisma:generate

echo "Running database migrations..."
npm run db:migrate

echo "Running database seed..."
npm run db:seed

echo "Starting NestJS..."
npm run start:dev