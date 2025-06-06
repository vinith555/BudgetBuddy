import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DetailsService } from '../details.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[DetailsService]
})
export class HomeComponent implements OnInit{

 private detail = inject(DetailsService);
 name = 'Vinith';
budgetData:{category:string,amount:number,payment_method:string,created_date:string}[] = [];
dispPLay:boolean = true;
displayForm:boolean = false;
formNumber:number = 0;
displayDeleteOption:boolean = true;
dataToBeAdded:{type: "income" | "expense",category: string,amount: number,payment_method: string,created_at: string} = 
{type: "income", 
  category: '',
  amount: 0,
  payment_method: '',
  created_at: ''};

formData(data:{date:string,category:string,amount:number,payment_method:string}){
  this.dataToBeAdded.category = data.category;
  this.dataToBeAdded.amount = data.amount;
  this.dataToBeAdded.payment_method = data.payment_method;
  this.dataToBeAdded.created_at = data.date;
  if(this.formNumber == 1)this.dataToBeAdded.type = "expense";
  else this.dataToBeAdded.type = "income";
  this.detail.addData(this.dataToBeAdded,'1').subscribe();
  this.displayForm = false;
};

ngOnInit(): void {
    setTimeout(()=>{
      this.dispPLay = false;
    },5000);
    this.detail.getIncomeOrExpenseDetail("income","1").subscribe((data)=>{
      console.log(data);
      this.budgetData = data;
    });
}

addExpence(){
  this.displayForm = true;
  this.formNumber = 1;
}

addIncome(){
  this.displayForm = true;
  this.formNumber = 2;
}
}
