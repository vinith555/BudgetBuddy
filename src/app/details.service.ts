import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private http = inject(HttpClient);
  private url = `http://localhost:5000/user`;

  getSummery(){
   return this.http.get(this.url);
  }

  addData(data:{type: "income" | "expense",category: string,amount: number,payment_method: string,created_at: string},userId:string){
      return this.http.post(`${this.url}/add_data/${userId}`,data);
  }
}
