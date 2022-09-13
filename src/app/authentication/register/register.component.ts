import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  registerForm!: FormGroup;
  spinner = false;
  orgList = [
    { name: 'TVM Infotech' },
    { name: 'AsmindsTech' }
  ];
  filteredOrg: any = [];
  emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  passwordRe = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  passwordRules = 'Password must contain one uppercase, one lowercase, one number and one special character';

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthenticationService, private messageService: MessageService, private toast: ToastService) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  ngAfterViewInit() {
    this.getWarnMsg();
  }

  getWarnMsg() {
    this.toast.getWarnMsg().subscribe(msg => {
      if(!!msg) {
        setTimeout(() => {
          this.messageService.add({severity: 'warn', summary: 'Warning', detail: msg, key: 'toast'});
        }, 300);
        this.toast.warn(null);
      }
    });
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      organization: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailRe)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(this.passwordRe)]],
      confirmPassword: ['', [Validators.required, this.confirmPasswordVal()]],
      isAdmin: [false]
    });
  }

  confirmPasswordVal(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const password = this.registerForm?.get('password')?.value;
      return (control.value !== password) ? { invalid: true } : null;
    }
  }

  register() {
    if(this.registerForm.valid) {
      this.spinner = true;
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

  filterOrg(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.orgList.length; i++) {
      let org = this.orgList[i];
      if (org.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(org);
      }
    }

    this.filteredOrg = filtered;
  }

}
