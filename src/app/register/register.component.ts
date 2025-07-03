import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LogindetailsService } from '../logindetails.service';
@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 constructor(private route:Router,private login:LogindetailsService){}
 register(form:NgForm){
  console.log(form.value);
  this.login.addUser({user_name:form.value.name,email:form.value.email,pass_word:form.value.password}).subscribe();
  this.route.navigate(['/']);
 }
}
