import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogginInComponent } from './container/loggin-in/loggin-in.component';

const routes: Routes = [
  {
    path:'',
    component: LogginInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogginInRoutingModule { }
