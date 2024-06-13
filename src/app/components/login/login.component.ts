import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdentityService } from '../../services/identity.service';
import { LoginRequest } from '../../models/authentication.models';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this._formBuilder.group({
    email: ["", Validators.required],
    //TODO: Add password pattern validator.
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _identityService: IdentityService,
    private readonly _router: Router
  ) { }

  print(msg: any): string {
    return JSON.stringify(msg);
  }

  onSubmit() {
    if (!this.loginForm.valid || !this.loginForm.get("email")?.value || !this.loginForm.get("password")?.value) return;
    let request: LoginRequest = {
      email: this.loginForm.get("email")?.value!,
      password: this.loginForm.get("password")?.value!
    }
    console.log(request);
    this._identityService.login(request).subscribe({
      next: response => {
        document.cookie = `token=${response.token}`;
        this._router.navigate(["/"]);
      },
      error: error => {
        console.error("Unable to login:\n", error)
        if (error.error && error.status === 400) {
          this.loginForm.setErrors({ "badCredentials": true });
        }
      }
    })
  }
}
