import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FrontModule } from './front/front.module';
import { BackModule } from './back/back.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BackModule, FrontModule],
})
export class AppModule {}
