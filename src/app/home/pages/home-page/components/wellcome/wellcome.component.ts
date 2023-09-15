import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.scss']
})
export class WellcomeComponent {
  @Output('on-click-login') onClickLoginEvent: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  handleClickLogin = () => {
    this.onClickLoginEvent.emit();
  }
}
