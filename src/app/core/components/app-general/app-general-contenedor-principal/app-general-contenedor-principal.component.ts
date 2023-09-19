import { AfterViewInit, Component, ContentChildren, Input, QueryList, TemplateRef, ViewChild, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-app-general-contenedor-principal',
  templateUrl: './app-general-contenedor-principal.component.html',
  styleUrls: ['./app-general-contenedor-principal.component.scss']
})
export class AppGeneralContenedorPrincipalComponent {
  @Input() contentSource: any;
  @Input() loading!: boolean;
  @Input() templates:TemplateRef<any>[]=[]

  contentTemplate:any;

  selectedIndexValue = 0;



  handleChangeTab = (e:any) => {
    this.selectedIndexValue = e.index;
  };

  user={
    usuario:'Lenneth'
   }




}
