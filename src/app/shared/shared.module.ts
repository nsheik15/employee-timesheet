import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { PrimengModule } from '../primeng/primeng.module';



@NgModule({
  declarations: [
    HeaderComponent,
    TopNavComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports: [
    HeaderComponent,
    TopNavComponent
  ]
})
export class SharedModule { }
