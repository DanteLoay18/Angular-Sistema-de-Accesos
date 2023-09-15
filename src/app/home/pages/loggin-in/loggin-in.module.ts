import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogginInRoutingModule } from './loggin-in-routing.module';
import { LoginErrorComponent } from './components/login-error/login-error.component';
import { LogginInComponent } from './container/loggin-in/loggin-in.component';
import { SharedModule } from 'ngx-sigape';


@NgModule({
  declarations: [
    LoginErrorComponent,
    LogginInComponent
  ],
  imports: [
    CommonModule,
    LogginInRoutingModule,
    SharedModule
  ]
})
export class LogginInModule { }
