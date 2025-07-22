import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogindetailsService {

  constructor(private http:HttpClient) { }
  private url = `http://localhost:5000/api`;
  addUser(data:{user_name:string,email:string,pass_word:string}){
    return this.http.post(`${this.url}/register`,data);
  }
  login(data:{email:string,pass_word:string}): Observable<{token: string;user_id: number;}>{
    return this.http.post<{token: string;user_id: number;}>(`${this.url}/login`,data);
  }

}
