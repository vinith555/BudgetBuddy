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
  
  private detail = inject(DetailsService);

  selectedYear:number = 2025; 
  availableYears:number[] = [2021, 2022, 2023, 2024, 2025];

  totalIncome:number = 0;
  totalExpense:number = 0;

  ngOnInit(): void {
    this.detail.getTotalIncomeOrExpenseAmount("Income","1",this.selectedYear).subscribe((data)=>{this.totalIncome = data;});
    this.detail.getTotalIncomeOrExpenseAmount("Expense","1",this.selectedYear).subscribe((data)=>{this.totalExpense = data;});
    // income
    this.detail.getIncomeOrExpenseAmount("income",this.selectedYear,"1").subscribe((data)=>{ 
    this.monthlySavingChartData = {
    datasets: [{ data: data,label: 'Monthly Saving',backgroundColor:'#1E3A47',borderColor:'#2E8A99' }],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'] };
    });
    // expense
    this.detail.getIncomeOrExpenseAmount("expense",this.selectedYear,"1").subscribe((data)=>{
    this.monthlyExpenseChartData= {
    datasets: [{data: data,label: 'Monthly Expense',backgroundColor:'#1E3A47',borderColor:'#2E8A99',}],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December']};
    });
    
    this.incomeExpenseChartData = {
      datasets:[{data:[this.totalIncome,this.totalExpense],label:'Income VS Expenses'}],
      labels:['Income','Expenses']
    }

  }

  onYearChange() {
  console.log('Selected year:', this.selectedYear);

  forkJoin({
    income:this.detail.getTotalIncomeOrExpenseAmount("Income","1",this.selectedYear),
    expense:this.detail.getTotalIncomeOrExpenseAmount("Expense","1",this.selectedYear)
  }).subscribe(({ income, expense }) => {
    this.totalIncome = income;
    this.totalExpense = expense;})
  
  console.log(this.totalExpense + " "+this.totalIncome);
  
  this.detail.getIncomeOrExpenseAmount("income",this.selectedYear,"1").subscribe((data)=>{ 
    this.monthlySavingChartData = {
    datasets: [{ data: data,label: 'Monthly Saving',backgroundColor:'#1E3A47',borderColor:'#2E8A99' }],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'] };
    });

    this.detail.getIncomeOrExpenseAmount("expense",this.selectedYear,"1").subscribe((data)=>{
    this.monthlyExpenseChartData= {
    datasets: [{data: data,label: 'Monthly Expense',backgroundColor:'#1E3A47',borderColor:'#2E8A99',}],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December']};
    });

    this.incomeExpenseChartData = {
      datasets:[{data:[this.totalIncome,this.totalExpense],label:'Income VS Expenses'}],
      labels:['Income','Expenses']
    }
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
