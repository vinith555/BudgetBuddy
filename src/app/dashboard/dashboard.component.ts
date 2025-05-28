import { AfterViewInit, Component, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit{
 displayToggle:boolean = false;
 displaySidebar:boolean = false;

private adjust(width:number){
      if(width < 860){
      this.displayToggle = true;
      }else{
        this.displayToggle = false;
        this.displaySidebar = false;
      } 
}
 @HostListener('window:resize',['$event'])onResize(event:any){
    this.adjust(event.target.innerWidth); 
 };
 ngAfterViewInit(): void {
     this.adjust(window.innerWidth);
 }
}
