import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule), canActivate: [AuthGuard] },
  { path: 'timesheet/:id', loadChildren: () => import('./timesheet/timesheet.module').then(m => m.TimesheetModule), canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
