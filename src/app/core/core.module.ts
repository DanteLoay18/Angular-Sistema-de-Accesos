import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services';
import { Store } from '@ngrx/store';
import { APP_LOCAL_STORAGE } from './constants/app.constans';
import { SessionActions } from './store';

export function appInitializerFn(
  store: Store,
  localStorage: LocalStorageService
) {
  return () => {
    const session = localStorage.get<any>(
      APP_LOCAL_STORAGE.SAC_TOKEN_KEY
    );
    if(session){
      store.dispatch(SessionActions.SessionValidateUser());
    }
  };
}


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [Store, LocalStorageService],
    },
  ],
})
export class CoreModule { }
