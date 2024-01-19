import { Module } from '@nestjs/common';
import { BackController } from './back.controller';

@Module({ imports: [], controllers: [BackController] })
export class BackModule {}
