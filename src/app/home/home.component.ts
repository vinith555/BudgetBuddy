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

  user_id!:string;
  constructor(){
    this.user_id = localStorage.getItem("user_id")+"";
  }


private detail = inject(DetailsService);
name = 'Vinith';
incomeData:{id:number,category:string,amount:number,payment_method:string,created_date:string}[] = [];
expenseData:{id:number,category:string,amount:number,payment_method:string,created_date:string}[] = [];
summaryData:{category:string,amount:number,payment_method:string,created_date:string}[] = [];
dispPLay:boolean = true;
displayForm:boolean = false;
displayForm2:boolean = false;
formNumber:number = 0;
displayDeleteOption:boolean = true;
dataToBeAdded:{type: "income" | "expense",category: string,amount: number,payment_method: string,created_at: string} = 
{type: "income", 
  category: '',
  amount: 0,
  payment_method: '',
  created_at: ''};

// total income and expense
totalIncome:number = 0;
totalExpense:number = 0;
highestExpense:number = 0;

formData(data:{date:string,category:string,amount:number,payment_method:string}){
  this.dataToBeAdded.category = data.category;
  this.dataToBeAdded.amount = data.amount;
  this.dataToBeAdded.payment_method = data.payment_method;
  this.dataToBeAdded.created_at = data.date;
  if(this.formNumber == 1)this.dataToBeAdded.type = "expense";
  else this.dataToBeAdded.type = "income";
  // console.log(data);
  this.detail.addData(this.dataToBeAdded,this.user_id).subscribe();
  this.displayForm = false;
  this.displayForm2 = false;
};

ngOnInit(): void {
    setTimeout(()=>{
      this.dispPLay = false;
    },5000);

    this.detail.getIncomeOrExpenseDetail("income",this.user_id).subscribe((data)=>{
      this.incomeData = data;
    });

    this.detail.getIncomeOrExpenseDetail("Expense",this.user_id).subscribe((data)=>{
      this.expenseData = data;
    });

    this.detail.getSummery(this.user_id).subscribe((data)=>{this.summaryData = data;});
    // total Income and expense
    this.detail.getTotalIncomeOrExpenseAmount("Income",this.user_id,2025).subscribe((data)=>{this.totalIncome = data;});
    this.detail.getTotalIncomeOrExpenseAmount("Expense",this.user_id,2025).subscribe((data)=>{this.totalExpense = data;});
    this.detail.getHighestExpense(this.user_id).subscribe((data)=>{this.highestExpense = data});
}

deleteRecord(id:number){
  this.detail.deleteData(id).subscribe((err)=>{
    console.log(err);
  });
}

addExpence(){
  this.displayForm = true;
  this.formNumber = 1;
}

addIncome(){
  this.displayForm2 = true;
  this.formNumber = 2;
}
}
