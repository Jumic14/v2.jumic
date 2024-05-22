import { Component } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  name: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.name, this.password).subscribe({
      next: (response) => {
        if (response.token) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Token not received';
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        console.log('Error:', error);
      },
    });
  }

  backToWebsite(): void {
    this.router.navigate(['/']);
  }
}
