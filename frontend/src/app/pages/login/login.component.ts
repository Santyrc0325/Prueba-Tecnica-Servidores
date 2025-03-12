import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        alert('Login exitoso');
        this.router.navigate(['/servers']);
      }, err => {
        alert(err.error.message);
      });
  }
}
