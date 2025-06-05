import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private http = inject(HttpClient);
  private url = `http://localhost:5000/user`;

  getSummery(){
   return this.http.get(this.url);
  }

  getIncomeOrExpenseDetail(type:string,userId:string){
    return this.http.get(`${this.url}/${type}/${userId}`);
  }

  getIncomeOrExpenseAmount(type:string,year:string,userId:string):Observable<{ data: number[] }>{
    return this.http.get<{ data: number[] }>(`${this.url}/${type}/${year}/${userId}`);
  }

  addData(data:{type: "income" | "expense",category: string,amount: number,payment_method: string,created_at: string},userId:string){
      return this.http.post(`${this.url}/add_data/${userId}`,data);
  }
}
