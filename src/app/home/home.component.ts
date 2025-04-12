import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
name = 'Vinith';
 budgetData = [
  { date: "2025-03-01", category: "Groceries", amount: 120.50, paymentMethod: "Credit Card" },
  { date: "2025-03-03", category: "Rent", amount: 1200.00, paymentMethod: "Bank Transfer" },
  { date: "2025-03-05", category: "Utilities", amount: 150.00, paymentMethod: "Debit Card" },
  { date: "2025-03-08", category: "Dining Out", amount: 45.30, paymentMethod: "Cash" },
  { date: "2025-03-12", category: "Entertainment", amount: 60.00, paymentMethod: "Credit Card" },
  { date: "2025-03-15", category: "Internet", amount: 75.00, paymentMethod: "Bank Transfer" },
  { date: "2025-03-18", category: "Transportation", amount: 40.00, paymentMethod: "Debit Card" },
  { date: "2025-03-20", category: "Shopping", amount: 200.00, paymentMethod: "Credit Card" },
  { date: "2025-03-25", category: "Medical", amount: 90.00, paymentMethod: "Insurance Coverage" },
  { date: "2025-03-28", category: "Savings", amount: 300.00, paymentMethod: "Bank Transfer" }
];
dispPLay:boolean = true;
dispCount:number = 1;
ngOnInit(): void {
    setTimeout(()=>{
      this.dispPLay = false;
    },5000);
    console.log("ngOnint");
    
}
}
