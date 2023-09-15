import { Component, OnInit, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppState, IAppGlobalConfig, globalConfig } from '@sac/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  state$: Observable<IAppGlobalConfig> = of();

  private store= inject(Store<AppState>)

  ngOnInit(): void {
    this.store.dispatch(globalConfig());
    this.state$ = this.store.select('globalConfig');
    //TODO : VALIDAR SI ESTA LOGEADO SI NO REDIRIGIRLO A /LOCALHOST:4200/AUTH/LOGIN
  }

}
