import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  clients: any[];

  @WebSocketServer()
  server: Server;

  handleConnection(client: any): void {
    // console.warn(`Client[${client.id}] connected]`);
    // this.clients.push(client);
  }

  handleDisconnect(client: any): void {
    console.warn(`Client[${client.id}] disconnected]`);
    // this.clients = this.clients.filter((c) => c !== client);
  }

  broadcast(data) {
    this.server.clients.forEach((client) => client.send(data));
  }

  @SubscribeMessage('events')
  onEvent(@MessageBody() data: unknown) {
    this.broadcast(data);
    return data;
  }
}
