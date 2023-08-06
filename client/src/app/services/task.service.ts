import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import Task from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = 'http://localhost:8080/TasksProject/Tasks/';

  constructor(private httpClient : HttpClient, private userService : UserService) { }

  get(){
    return this.httpClient.get(this.url);
  }

  getById(id : number){
    return this.httpClient.get(this.url + id);
  }

  post(task : Task){
    console.log(task);
    return this.httpClient.post(this.url, task);
  }

  delete(id : number){
    return this.httpClient.delete(this.url + id);
  }

  put(task : Task){
    return this.httpClient.put(this.url + task.id, task);
  }
}
