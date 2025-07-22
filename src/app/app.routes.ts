import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VisualboardComponent } from './visualboard/visualboard.component';
import { AboutComponent } from './about/about.component';
import { childauthGuard } from './childauth.guard';


export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'register',component:RegisterComponent},

    {path:'dashboard',component:DashboardComponent,
        children:[
        {path:'',component:HomeComponent},
        {path:'visualboard',component:VisualboardComponent},
        {path:'about',component:AboutComponent}
    ]},
    
];
