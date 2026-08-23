import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ApartmentsModule } from './apartments/apartments.module';
import { HealthModule } from './health/health.module';

const appEnv = process.env.APP_ENV || 'dev';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${appEnv}`,
    }),

    // Physical folder:
    // apartment-backend/uploads
    //
    // URL:
    // dev -> /dev/uploads
    // sit -> /sit/uploads
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: `/${appEnv}/uploads`,
    }),

    PrismaModule,
    ApartmentsModule,
    HealthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }