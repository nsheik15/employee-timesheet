import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  spinner = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthenticationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      organization: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      isAdmin: [false]
    });
  }

  register() {
    this.spinner = true;
    if(this.registerForm.valid) {
      let payload = { ...this.registerForm.value };
      delete payload.confirmPassword;
      payload.role = this.registerForm.get('isAdmin')?.value ? 'admin' : 'user';
      delete payload.isAdmin;

      this.auth.register(payload).subscribe({
        next: (res) => {
          this.spinner = false;
          if(res.status === 201) {
            this.messageService.add({severity:'success', summary:'Success', detail: res.message, key: 'toast'});
            this.router.navigate(['/login']);
          }
        }, error: (err) => {
          this.spinner = false;
          this.messageService.add({severity:'error', summary:'Error', detail: err.error.message, key: 'toast'});
        }
      });
    }
  }

}
