import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { WellcomeComponent } from './components/wellcome/wellcome.component';
import { HomeComponent } from './container/home/home.component';
import { SharedModule } from 'ngx-sigape';



@NgModule({
  declarations: [
    WellcomeComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule
  ]
})
export class HomePageModule { }
