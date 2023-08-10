import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import Task from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListSocketIoService {
  private socket;

  constructor() {
    this.socket = io('http://localhost:8080');
  }

  addTask(task: Task) {
    this.socket.emit('addTask', task);
  }

  editTask(task: Task) {
    this.socket.emit('editTask', task);
  }

  removeTask(task: Task) {
    this.socket.emit('removeTask', task);
  }

  TasksAfterAdded() {
    return new Observable<string>((observer:any) => {
      this.socket.on('newTask', task => {
        observer.next(task);
      });
    });
  }

  TasksAfterEdited() {
    return new Observable<Task>((observer: any) => {
      this.socket.on('changeTask', (editedTask: Task) => {
        observer.next(editedTask);
      });
    });
  }

  TasksAfterDeleted() {
    return new Observable<Task>((observer: any) => {
      this.socket.on('deleteTask', (editedTask: Task) => {
        observer.next(editedTask);
      });
    });
  }
}