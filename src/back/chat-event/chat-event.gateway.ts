import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { getRandomNickname } from 'src/helpers/nickname.helper';
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

  @SubscribeMessage('join')
  handleJoin(@ConnectedSocket() connectedSocket: WebSocket) {
    const nickname = getRandomNickname();
    connectedSocket['user'] = { nickname };
    console.log(`${nickname} joined`);
    return { event: 'join', data: `Hello ${nickname}` };
  }

  @SubscribeMessage('nickname')
  handleNickname(
    @ConnectedSocket() connectedSocket: WebSocket,
    @MessageBody() nickname: string,
  ) {
    console.log(`${nickname} got a nickname`);
    connectedSocket['user'] = { nickname };
    return {
      event: 'nickname',
      data: nickname,
    };
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() connectedSocket: WebSocket,
    @MessageBody() message: string,
  ) {
    console.log(`Message from client: ${message}`);
    this.sockets.forEach((socket) =>
      socket.send(
        JSON.stringify({
          event: 'message',
          data: {
            nickname: connectedSocket['user']?.nickname,
            message,
            mine: connectedSocket === socket,
          },
        }),
      ),
    );
  }
}
