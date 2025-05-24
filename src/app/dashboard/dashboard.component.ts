import { Component, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
 displayToggle:boolean = false;
 displaySidebar:boolean = false;
 @HostListener('window:resize',['$event'])onResize(event:any){
  const width = event.target.innerWidth;
  if(width < 860){
    this.displayToggle = true;
  }else{
    this.displayToggle = false;
    this.displaySidebar = false;
  } 
    // console.log(event.target.innerWidth); 
 };
}
