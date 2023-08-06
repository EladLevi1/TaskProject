import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socket;

  constructor() {
    this.socket = io('http://localhost:8080');
  }

  joinRoom(room: string) {
    this.socket.emit('joinRoom', room);
  }

  sendMessage(room: string, message: string) {
    this.socket.emit('chatMessage', { room, message });
  }

  getMessage() {
    return new Observable<string>((observer:any) => {
      this.socket.on('message', message => {
        observer.next(message);
      });
    });
  }
}