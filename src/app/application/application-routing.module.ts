import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ApplicationComponent} from './application.component'

const routes: Routes = [
    {
      path: '',
      component: ApplicationComponent,
      children: [
        {
          path: 'mantenimiento',
          loadChildren: () => import('@sac/mantenimiento/app/app.module').then(m => m.AppModule)
        }
      ],
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
