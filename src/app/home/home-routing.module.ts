import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home-page/home-page.module').then(m=> m.HomePageModule)
  },
  {
    path: 'loggin-in',
    loadChildren: () => import('./pages/loggin-in/loggin-in.module').then(m=> m.LogginInModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
