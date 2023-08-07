import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Task from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.css']
})
export class TaskNewComponent {

  constructor(private taskService: TaskService){}

  minDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
    const day = tomorrow.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addtask(taskForm: NgForm) {
    if (taskForm.valid) {
      const formData = taskForm.value;
      const task = new Task(
        "0",
        formData.title,
        formData.description,
        formData.priority,
        false,
        new Date(),
        formData.expireddate
      );

      this.taskService.post(task).subscribe();
    }
  }
}
