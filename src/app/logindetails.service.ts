import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogindetailsService {

  constructor(private http:HttpClient) { }
  private url = `http://localhost:5000/api`;
  addUser(data:{user_name:string,email:string,pass_word:string}){
    return this.http.post(`${this.url}/addUser`,data);
  }
}
