import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this._formBuilder.group({
    email: ["", Validators.required],
    //TODO: Add password pattern validator.
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  constructor(private readonly _formBuilder: FormBuilder) { }

  print(msg: any): string {
    return JSON.stringify(msg);
  }
}
