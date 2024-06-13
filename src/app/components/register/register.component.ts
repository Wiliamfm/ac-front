import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from '../../models/authentication.models';
import { IdentityService } from '../../services/identity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup = this._formBuilder.group({
    email: ["", Validators.required],
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    //TODO: Add password pattern validator.
    password: ["", [Validators.required, Validators.minLength(6)]]
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
    if (!this.registerForm.valid) return;
    let request: RegisterRequest = {
      email: this.registerForm.get("email")?.value!,
      firstName: this.registerForm.get("firstName")?.value!,
      lastName: this.registerForm.get("lastName")?.value!,
      password: this.registerForm.get("password")?.value!
    }
    this._identityService.register(request).subscribe({
      next: response => {
        document.cookie = `token=${response.token}`;
        this._router.navigate(["/"]);
      },
      error: error => {
        console.error("Unable to register:\n", error)
        if (error.error && error.status === 400) {
          this.registerForm.setErrors({ "badUsername": true });
        }
      }
    });
  }

}
