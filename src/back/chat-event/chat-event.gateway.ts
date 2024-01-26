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
  private sockets: WebSocket[] = [];

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.port = this.configService.get<number>('PORT');
  }

  handleConnection(@ConnectedSocket() socket: WebSocket, ...args: any[]) {
    console.log('Client connected ✅');
    this.sockets.push(socket);
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() connectedSocket: WebSocket,
    @MessageBody() data: string,
  ) {
    console.log(`Message from client: ${data}`);
    this.sockets.forEach((socket) =>
      socket.send(JSON.stringify({ event: 'message', data })),
    );
  }

  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() connectedSocket: WebSocket,
    @MessageBody() data: any,
  ) {
    console.log(`${data.name} joined`);
    return { event: 'join', data: `Hello ${data.name}` };
  }
}
