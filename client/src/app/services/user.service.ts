import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/tasksproject/users/';

  constructor(private httpClient: HttpClient) { }

  get(){
    return this.httpClient.get(this.url)
  }

  login(email:string, password:string){
    return this.httpClient.post(this.url + "login",
       {email:email, password:password});
  }

  storeToken(token:string){
    localStorage.setItem("token", token);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  post(user : User){
    return this.httpClient.post(this.url, user);
  }

  delete(id : number){
    return this.httpClient.delete(this.url + id);
  }

  put(user: User){
    return this.httpClient.put(this.url + user.id, user);
  }
}