import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Task from 'src/app/models/task.model';
import { SocketIoService } from 'src/app/services/socket.io.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  room: string ='';
  message: string = '';
  messages: string[] = [];

  task: Task = new Task();

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private socketService: SocketIoService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.taskService.getById(parseInt(id!)).subscribe(t => {
      this.task = t as Task;

      this.room = this.task.title;

      this.socketService.joinRoom(this.room);
      
      this.messages = [...this.task.comments];

      this.socketService.getMessage().subscribe((message: any) => {
        this.messages.push(message);
      });
    });
  }
  
  sendMessage() {
    if (this.message.trim() !== '') {
      this.socketService.sendMessage(this.room, this.message, this.task);
      this.message = '';
    }
  }
}