import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ApartmentsModule } from './apartments/apartments.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.APP_ENV || 'dev'}`,
    }),

    // Serve:
    // D:\apartment\apartment-backend\uploads
    //
    // as:
    // http://localhost:3000/uploads
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: `/${process.env.APP_ENV || 'dev'}/uploads`,
    }),

    PrismaModule,
    ApartmentsModule,
    HealthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }