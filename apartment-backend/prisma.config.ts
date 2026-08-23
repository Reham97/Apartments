import { defineConfig } from 'prisma/config';
import { config } from 'dotenv';
import { resolve } from 'path';

const appEnv = process.env.APP_ENV || 'dev';

const result = config({
  path: resolve(process.cwd(), `.env.${appEnv}`),
});

if (result.error) {
  throw result.error;
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    `DATABASE_URL is missing in .env.${appEnv}`,
  );
}

export default defineConfig({
  schema: 'prisma/schema.prisma',

  migrations: {
    path: 'prisma/migrations',
  },

  engine: 'classic',

  datasource: {
    url: process.env.DATABASE_URL,
  },
});