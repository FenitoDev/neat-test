import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterComponent {
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
      .register(email, password)
      .then(() => this.router.navigateByUrl('/home'))
      .catch((error: Error) => {
        error.message;
        console.error('Error durante el registro', error);
      });
  }
  goHome(): void {
    this.router.navigateByUrl('/');
  }

  constructor(private auth: Auth) {}
}
