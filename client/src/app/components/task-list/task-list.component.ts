import { Component } from '@angular/core';
import Task from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  tasks : Task[] = [];
  filterOption: 'all' | 'done' | 'notDone' = 'all';
  currentSortKey: keyof Task = 'title';
  isAscending: boolean = true;

  constructor(private taskService: TaskService){
    this.taskService.get().subscribe((data) => {
      this.tasks = data as Task[];
    })
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
