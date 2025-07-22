import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private http = inject(HttpClient);
  private url = `http://localhost:5000/api/user`;

  private baseHeaders = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("token"));

  getSummery(userId:string):Observable<{category:string,amount:number,payment_method:string,created_date:string}[]>{
   return this.http.get<{category:string,amount:number,payment_method:string,created_date:string}[]>(`${this.url}/summery/${userId}`,{headers:this.baseHeaders});
  }

  getHighestExpense(id:number):Observable<number>{
    return this.http.get<number>(`${this.url}/highestTransaction/${id}`);
  }

  getTotalIncomeOrExpenseAmount(type:string,userId:string,year:number):Observable<number>{
    return this.http.get<number>(`${this.url}/total/${type}/${year}/${userId}`);
  }

  getIncomeOrExpenseDetail(type:string,userId:string):Observable<{id:number,category:string,amount:number,payment_method:string,created_date:string}[]>{
    return this.http.get<{id:number,category:string,amount:number,payment_method:string,created_date:string}[]>(`${this.url}/${type}/${userId}`);
  }

  getIncomeOrExpenseAmount(type:string,year:number,userId:string):Observable<number[]>{
    return this.http.get<number[]>(`${this.url}/${type}/${year}/${userId}`);
  }

  addData(data:{type: "income" | "expense",category: string,amount: number,payment_method: string,created_at: string},userId:string){
      return this.http.post(`${this.url}/add_data/${userId}`,data);
  }

  deleteData(uniqueId:number){
    return this.http.delete(`${this.url}/delete/${uniqueId}`);
  }
}
