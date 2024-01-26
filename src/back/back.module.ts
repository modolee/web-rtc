import { Module } from '@nestjs/common';
import { BackController } from './back.controller';
import { ChatEventModule } from './chat-event/chat-event.module';

@Module({ imports: [ChatEventModule], controllers: [BackController] })
export class BackModule {}
