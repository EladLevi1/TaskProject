import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Task from 'src/app/models/task.model';
import { ChatSocketIoService } from 'src/app/services/chatsocket.io.service';
import { ListSocketIoService } from 'src/app/services/listsocket.io.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  room: string = '';
  message: string = '';
  messages: string[] = [];
  task: Task = new Task();

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private chatService: ChatSocketIoService,
    private listService: ListSocketIoService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.taskService.getById(parseInt(id!)).subscribe((t) => {
      this.task = t as Task;

      this.room = this.task.title;
      
      this.chatService.joinRoom(this.room);

      this.messages = [...this.task.comments];

      this.chatService.getMessage().subscribe((message: string) => {
        this.messages.push(message);
      });

      this.listService.TasksAfterEdited().subscribe((t) => {
        this.task = t as Task;
      }); 
    });
  }

  sendMessage() {
    if (this.message.trim() !== '') {
      this.chatService.sendMessage(this.room, this.message);
      this.taskService.postMessage(this.task.id, this.message).subscribe();
      this.message = '';
    }
  }

  changeStatus(){
    console.log(this.task.comments)
    this.task.isdone = !this.task.isdone;
    this.listService.editTask(this.task);
    this.taskService.put(this.task).subscribe();
  }
}