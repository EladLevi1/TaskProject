import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { TaskService } from './task.service';
import Task from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socket;

  constructor(private taskService: TaskService) {
    this.socket = io('http://localhost:8080');
  }

  joinRoom(room: string) {
    this.socket.emit('joinRoom', room);
  }

  sendMessage(room: string, message: string, task : Task) {
    this.socket.emit('chatMessage', { room, message });
    task.comments.push(message);
    this.taskService.put(task).subscribe();
  }

  getMessage() {
    return new Observable<string>((observer:any) => {
      this.socket.on('message', message => {
        observer.next(message);
      });
    });
  }
}