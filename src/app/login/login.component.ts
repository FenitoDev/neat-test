import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  fc = inject(FormBuilder);
  router = inject(Router);

  form = this.fc.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  authService = inject(AuthService);

  onSubmit(): void {
    if (this.form.invalid) return;
    const { email, password } = this.form.getRawValue();
    this.authService
      .login(email, password)
      .then(() => this.router.navigateByUrl('/home'))
      .catch((error: Error) => {
        error.message;
        console.error('Error durante el registro', error);
      });
  }
  constructor(private auth: Auth) {}
}
