import { Component, OnInit } from '@angular/core';
import Task from 'src/app/models/task.model';
import { ListSocketIoService } from 'src/app/services/listsocket.io.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  filterOption: 'all' | 'done' | 'notDone' = 'all';
  currentSortKey: keyof Task = 'title';
  isAscending: boolean = true;

  constructor(
    private taskService: TaskService,
    private socketService: ListSocketIoService
  ) { }

  ngOnInit(): void {
    this.taskService.get().subscribe((data) => {
      this.tasks = data as Task[];
    });
    this.socketService.TasksAfterAdded().subscribe((t: any) => {
      this.tasks.push(t);
    });

    this.socketService.TasksAfterEdited().subscribe((editedTask: Task) => {
      const index = this.tasks.findIndex(task => task.id === editedTask.id);
      if (index !== -1) {
        this.tasks[index] = editedTask;
      }
    });
    
    this.socketService.TasksAfterDeleted().subscribe((deletedTask: Task) => {
      this.tasks = this.tasks.filter(task => task.id !== deletedTask.id);
    });
  }

  deleteTask(task: Task){
    this.taskService.delete(task.id).subscribe();
    this.socketService.removeTask(task);
  }

  sort(key: keyof Task) {
    if (this.currentSortKey === key) {
      this.isAscending = !this.isAscending;
    } else {
      this.currentSortKey = key;
      this.isAscending = true;
    }

    this.tasks.sort((a, b) => {
      const comparison = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      return this.isAscending ? comparison : -comparison;
    });
  }

  getSortClass(key: keyof Task) {
    if (this.currentSortKey === key) {
      return this.isAscending ? 'arrow-up' : 'arrow-down';
    }
    return '';
  }
  
  get filteredTasks(): Task[] {
    if (this.filterOption === 'done') {
      return this.tasks.filter(task => task.isdone);
    } else if (this.filterOption === 'notDone') {
      return this.tasks.filter(task => !task.isdone);
    }
    return this.tasks;
  }
}
