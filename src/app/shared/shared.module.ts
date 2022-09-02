import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TopNavComponent } from './top-nav/top-nav.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TopNavComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    TopNavComponent
  ]
})
export class SharedModule { }
