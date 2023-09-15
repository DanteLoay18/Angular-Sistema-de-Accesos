import { Store } from '@ngrx/store';
import { Component, inject, OnInit } from '@angular/core';
import { buildUrlLogin } from '@sac/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


  private store =inject(Store);

  session$ = this.store.select('session');

  ngOnInit(): void {
  }

  handleLogin = () => {

    this.session$.subscribe(session=> {
      if (!session.isLoggedIn) {
        window.location.href = buildUrlLogin();
      }
    });

  }
}
