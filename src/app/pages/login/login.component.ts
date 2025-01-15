import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
name= "world";
n1=0;
n2=0;
n3=0;
sum=0;
add() 
{
  this.sum = this.n1 + this.n2+ this.n3;
}
}
