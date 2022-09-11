import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  spinner = false;
  user: any;

  constructor(private router: Router, private auth: AuthenticationService, private messageService: MessageService, private toast: ToastService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUser().asObservable().subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.spinner = true;
    this.auth.logout().subscribe({
      next: (res: any) => {
        this.spinner = false;
        if(res.status === 200) {
          this.toast.logout(res.message);
          this.auth.onLogout();
        }
      },
      error: (err) => {
        this.spinner = false;
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.message, key: 'toast'});
      }
    });
  }

}
