import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogindetailsService } from '../logindetails.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private login = inject(LogindetailsService);
    constructor(private router:Router){}
    loginForm(form:NgForm){   
      this.login.login({email:form.value.email,pass_word:form.value.password}).subscribe((res)=>{
        localStorage.setItem('token', res.token);
        localStorage.setItem('user_id', res.user_id+"");
        this.router.navigate(['/dashboard']);
      });
    }
}
