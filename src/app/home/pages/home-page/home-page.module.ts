import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { WellcomeComponent } from './components/wellcome/wellcome.component';
import { HomeComponent } from './container/home/home.component';



@NgModule({
  declarations: [
    WellcomeComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
  ]
})
export class HomePageModule { }
