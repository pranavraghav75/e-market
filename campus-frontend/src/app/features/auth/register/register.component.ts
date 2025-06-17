// src/app/features/auth/register/register.component.ts
import { Component, OnInit }         from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService }               from '../../../core/services/auth.service';
import { Router }                    from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name:     ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      campus:   ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    const { name, email, password, campus } = this.registerForm.value;
    this.auth.register(name, email, password, campus).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => this.error = err.error.message || 'Registration failed'
    });
  }
}
