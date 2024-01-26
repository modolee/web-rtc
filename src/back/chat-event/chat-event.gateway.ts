import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { WebSocket } from 'ws';

@WebSocketGateway({ transports: ['websocket'] })
export class ChatEventGateway implements OnModuleInit, OnGatewayConnection {
  private port: number;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.port = this.configService.get<number>('PORT');
  }

  handleConnection(socket: WebSocket, ...args: any[]) {
    socket.send('Hello client');
  }

  @SubscribeMessage('message')
  handleMessage(socket: WebSocket, data: string) {
    console.log({ data });
    return data;
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() data: any, @ConnectedSocket() socket: WebSocket) {
    console.log({ socket });
    return data;
  }
}
