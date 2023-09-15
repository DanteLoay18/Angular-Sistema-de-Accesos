import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-login-error',
  templateUrl: './login-error.component.html',
  styleUrls: ['./login-error.component.scss']
})
export class LoginErrorComponent {
  @Input() message:string='';
  @Output('on-retry') onRetryEvent: EventEmitter<any> = new EventEmitter();

  handleRetry = () => {
    this.onRetryEvent.emit();
  };
}
