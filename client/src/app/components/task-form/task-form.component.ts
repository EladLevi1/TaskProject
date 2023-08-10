import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Task from 'src/app/models/task.model';
import { ListSocketIoService } from 'src/app/services/listsocket.io.service';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = new Task();
  taskDup : Task = new Task();
  date: any;
  newdate: string = '';
  isEditing: boolean = false;

  constructor(
    private taskService: TaskService,
    private socketService: ListSocketIoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getById(parseInt(id)).subscribe(t => {
        this.task = t as Task;

        this.taskDup = {...this.task};

        this.isEditing = true;
        
        this.updatingDate();
      });
    }
  }

  updatingDate() {
    let originalDate = new Date(this.task.expireddate);
    let year = originalDate.getFullYear().toString();
    let month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month as it is 0-based
    let day = originalDate.getDate().toString().padStart(2, '0');
    this.newdate = `${year}-${month}-${day}`;
    this.date = formatDate(this.newdate, 'yyyy-MM-dd', 'en-US');
  }

  minDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
    const day = tomorrow.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private async submitEdit(taskForm : NgForm){
    const formData = taskForm.value;

    const isDuplicateTitle = await this.taskService.checkExistTitle(formData.title);
        
    if (isDuplicateTitle) {
      if (formData.title !== this.task.title){
        taskForm.controls['title'].setErrors({ 'duplicate': true });
        return;
      }
    }
    const status = document.getElementById("isdone-accomplished") as HTMLInputElement;
    this.taskDup.isdone = status.checked ? true : false;
    this.taskDup.expireddate = this.date;
    this.socketService.editTask(this.taskDup);
    this.taskService.put(this.taskDup).subscribe();
  }

  private async submitNew(taskForm : NgForm){
    const formData = taskForm.value;
    
    const isDuplicateTitle = await this.taskService.checkExistTitle(formData.title);

    if (isDuplicateTitle) {
      taskForm.controls['title'].setErrors({ 'duplicate': true });
      return;
    }

    const task = new Task(
      "0",
      formData.title,
      formData.description,
      formData.priority,
      false,
      new Date(),
      formData.expireddate
    );

    this.socketService.addTask(task);
    this.taskService.post(task).subscribe();
  }

  async onSubmit(taskForm : NgForm){
    if (taskForm.valid) {
      if (this.isEditing){
        await this.submitEdit(taskForm);
        this.router.navigate(['task', this.task.id]);
      }
      else{
        await this.submitNew(taskForm);
        this.router.navigate(['list']);
      }
    }
  }
}
