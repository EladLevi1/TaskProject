import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Task from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = 'http://localhost:8080/TasksProject/Tasks/';

  constructor(
    private httpClient: HttpClient,
  ) {}

  get() {
    return this.httpClient.get(this.url);
  }

  getById(id: number) {
    return this.httpClient.get(this.url + id);
  }

  async checkExistTitle(title: string): Promise<boolean> {
    const tasks = await this.get().toPromise();
    if (!tasks || !Array.isArray(tasks)) {
      throw new Error("Invalid tasks data received");
    }
    const isExist = tasks.some(task => task.title === title);
    return isExist;
  }

  // async checkExistTitle(title: string): Promise<boolean> {
  //   let isExist = false;
  //   let tasks: Task[] = [];
  //   this.get().subscribe(async (tsks) => {
  //     tasks = tsks as Task[];

  //     for (const task of tasks) {
  //       if (task.title == title) {
  //         console.log('duplicate title');
  //         isExist = true;
  //         break;
  //       }
  //     }
  //   });
  //   console.log(isExist)
  //   return isExist;
  // }

  // checkExistTitle(title: string): boolean {
  //   let isExist = false;
  //   let tasks: Task[] = [];
  //   let tasksMap : Map<string, Task> = new Map();
  //   this.get().subscribe((tsks) => {
  //     tasks = tsks as Task[];
  //     for (const task of tasks) {
  //       if (tasksMap.has(task.title)){
  //         isExist = true;
  //         break;
  //       }
  //       tasksMap.set(task.title, task);
  //     }
  //   });
  //   return isExist;
  // }

  // checkExistTitle(title: string): boolean {
  //   let tasks: Task[] = [];

  //   // Fetch tasks and sort them by title
  //   this.get().subscribe((tsks) => {
  //     tasks = tsks as Task[];
  //     tasks.sort((a, b) => a.title.localeCompare(b.title));
  //   });

  //   // Binary search
  //   let left = 0;
  //   let right = tasks.length - 1;

  //   while (left <= right) {
  //     const mid = Math.floor((left + right) / 2);
  //     if (tasks[mid].title === title) {
  //       return true; // Title found
  //     } else if (tasks[mid].title < title) {
  //       left = mid + 1;
  //     } else {
  //       right = mid - 1;
  //     }
  //   }

  //   return false; // Title not found
  // }

  post(task: Task) {
    return this.httpClient.post(this.url, task);
  }

  postMessage(id: string, comment: string) {
    return this.httpClient.post(this.url + id + "/comments", { comment: comment });
  }

  delete(id: string) {
    return this.httpClient.delete(this.url + id);
  }

  put(task: Task) {
    return this.httpClient.put(this.url + task.id, task);
  }
}
