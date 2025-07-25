import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetailsService } from '../details.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-visualboard',
  imports: [BaseChartDirective,FormsModule,CommonModule],
  templateUrl: './visualboard.component.html',
  styleUrl: './visualboard.component.css',
  providers:[DetailsService]
})
export class VisualboardComponent implements OnInit{

  user_id:string;
  constructor(){this.user_id = localStorage.getItem("user_id")+"";}
  
  private detail = inject(DetailsService);

  selectedYear:number = 2025; 
  availableYears:number[] = [2021, 2022, 2023, 2024, 2025];

  totalIncome:number = 0;
  totalExpense:number = 0;

  ngOnInit(): void {
    forkJoin({
    income: this.detail.getTotalIncomeOrExpenseAmount("Income", this.user_id, this.selectedYear),
    expense: this.detail.getTotalIncomeOrExpenseAmount("Expense", this.user_id, this.selectedYear)
  }).subscribe(({ income, expense }) => {
    this.totalIncome = income;
    this.totalExpense = expense;

    this.incomeExpenseChartData = {
      datasets: [{
        data: [this.totalIncome, this.totalExpense],
        label: 'Income VS Expenses'
      }],
      labels: ['Income', 'Expenses']
    };
  });

    // income
    this.detail.getIncomeOrExpenseAmount("income",this.selectedYear,this.user_id).subscribe((data)=>{ 
    this.monthlySavingChartData = {
    datasets: [{ data: data,label: 'Monthly Saving',backgroundColor:'#1E3A47',borderColor:'#2E8A99' }],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'] };
    });
    // expense
    this.detail.getIncomeOrExpenseAmount("expense",this.selectedYear,this.user_id).subscribe((data)=>{
    this.monthlyExpenseChartData= {
    datasets: [{data: data,label: 'Monthly Expense',backgroundColor:'#1E3A47',borderColor:'#2E8A99',}],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December']};
    });
    
  }

  onYearChange() {
  console.log('Selected year:', this.selectedYear);

  forkJoin({
    income: this.detail.getTotalIncomeOrExpenseAmount("Income", this.user_id, this.selectedYear),
    expense: this.detail.getTotalIncomeOrExpenseAmount("Expense", this.user_id, this.selectedYear)
  }).subscribe(({ income, expense }) => {
    this.totalIncome = income;
    this.totalExpense = expense;

    this.incomeExpenseChartData = {
      datasets: [{
        data: [this.totalIncome, this.totalExpense],
        label: 'Income VS Expenses'
      }],
      labels: ['Income', 'Expenses']
    };
  });
  
  this.detail.getIncomeOrExpenseAmount("income",this.selectedYear,this.user_id).subscribe((data)=>{ 
    this.monthlySavingChartData = {
    datasets: [{ data: data,label: 'Monthly Saving',backgroundColor:'#1E3A47',borderColor:'#2E8A99' }],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'] };
    });

    this.detail.getIncomeOrExpenseAmount("expense",this.selectedYear,this.user_id).subscribe((data)=>{
    this.monthlyExpenseChartData= {
    datasets: [{data: data,label: 'Monthly Expense',backgroundColor:'#1E3A47',borderColor:'#2E8A99',}],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December']};
    });
  }

  incomeExpenseChartData:ChartConfiguration['data'] = {
    datasets:[{data:[this.totalIncome,this.totalExpense],label:'Income VS Expenses'}],
    labels:['Income','Expenses']
  };
  incomeExpenseChartOption: ChartConfiguration['options']={ responsive:true, }
  incomeExpenseChartType:ChartType = 'doughnut';
  

  monthlyExpenseChartData: ChartConfiguration['data'] = {
    datasets: [{data: [],label: 'Monthly Expense',backgroundColor:'#1E3A47',borderColor:'#2E8A99',}],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December']
  };
  monthlyExpenseChartOptions: ChartConfiguration['options'] = { responsive: true, };
  monthlyExpenseChartType: ChartType = 'line';


  spendingByCategoryChartData: ChartConfiguration['data'] = {
    datasets: [{data: [ 65, 59, 80, 81, 56, 55, 40 ],label: 'Spending By Category',backgroundColor:'#2E8A99',borderColor:'#2E8A99',}],
    labels: [ 'Groceries','Rent','Internet','Shopping','Medical','Entertainment','Savings' ]
  };
  spendingByCategoryOptions: ChartConfiguration['options'] = { responsive: true, };
  spendingByCategoryChartType: ChartType = 'bar';

  monthlySavingChartData: ChartConfiguration['data'] = {
    datasets: [{ data: [],label: 'Monthly Saving',backgroundColor:'#1E3A47',borderColor:'#2E8A99' }],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December']
  };
  monthlySavingChartOptions: ChartConfiguration['options'] = { responsive: true, };
  monthlySavingChartType: ChartType = 'line';
}
