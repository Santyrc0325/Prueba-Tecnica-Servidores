import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const body = {
      username: this.username,
      email: this.email,
      password: this.password
    };
    this.authService.register(body)
      .subscribe(() => {
        alert("Registro exitoso");
        this.router.navigate(['/login']);
      });
  }
}
