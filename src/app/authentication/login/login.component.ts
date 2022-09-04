import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  login() {
    if(this.loginForm.valid) {
      if((this.loginForm.get('email')?.value === 'user') && (this.loginForm.get('password')?.value === 'user'))
        this.router.navigate(['timesheet/1']);
      else if((this.loginForm.get('email')?.value === 'admin') && (this.loginForm.get('password')?.value === 'admin'))
        this.router.navigate(['admin']);
    }
  }

}
