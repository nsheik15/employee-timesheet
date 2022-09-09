import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  spinner = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthenticationService, private userService: UserService, private messageService: MessageService, private toast: ToastService) { }

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

  async login() {
    if(this.loginForm.valid) {
      const payload = this.loginForm.value;
      const rememberMe = this.loginForm.get('rememberMe')?.value;

      this.spinner = true;
      try {
        const login$ = this.auth.login(payload);
        const res: any = await firstValueFrom(login$);
        this.spinner = false;

        this.toast.login(res.message);

        const token = res.content.token;
        const user = res.content.user;

        this.userService.setToken(token);
        this.userService.setUser(user)

        if(rememberMe) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('user', JSON.stringify(user));
        }

        if(user.role === 'admin') {
          this.router.navigate(['admin']);
        } else if(user.role === 'user') {
          this.router.navigate(['timesheet', user.id]);
        }
      } catch(err: any) {
        this.spinner = false;
        this.messageService.add({severity:'error', summary:'Error', detail: err.error.message, key: 'toast'});
      }
    }
  }

}
