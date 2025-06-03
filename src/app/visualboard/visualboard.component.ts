import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-visualboard',
  imports: [BaseChartDirective,FormsModule,CommonModule],
  templateUrl: './visualboard.component.html',
  styleUrl: './visualboard.component.css'
})
export class VisualboardComponent {
  selectedYear:number = 2021; 
  availableYears:number[] = [2021, 2022, 2023, 2024, 2025];

  onYearChange() {
  console.log('Selected year:', this.selectedYear);
 }

  incomeExpenseChartData:ChartConfiguration['data'] = {
    datasets:[
      {data:[12000,15000],
       label:'Income VS Expenses' 
      }
    ],
    labels:['Income','Expenses']
  };
  incomeExpenseChartOption: ChartConfiguration['options']={
    responsive:true,
  }
  incomeExpenseChartType:ChartType = 'doughnut';
  
  monthlyExpenseChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40,50,60,70,80,90 ],
        label: 'Monthly Expense',
        backgroundColor:'#1E3A47',
        borderColor:'#2E8A99',
      }
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December']
  };
  monthlyExpenseChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  monthlyExpenseChartType: ChartType = 'line';

  spendingByCategoryChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Spending By Category',
        backgroundColor:'#2E8A99',
        borderColor:'#2E8A99',
      }
    ],
    labels: [ 'Groceries','Rent','Internet','Shopping','Medical','Entertainment','Savings' ]
  };
  spendingByCategoryOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  spendingByCategoryChartType: ChartType = 'bar';

  monthlySavingChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 40,50,60,70,80,90,90,80,70,60,50,40 ],
        label: 'Monthly Saving',
        backgroundColor:'#1E3A47',
        borderColor:'#2E8A99',
      }
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December']
  };
  monthlySavingChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  monthlySavingChartType: ChartType = 'line';
}
