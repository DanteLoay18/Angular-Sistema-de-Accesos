import { Component, ContentChildren, QueryList, AfterViewInit, ViewChild, TemplateRef, AfterContentInit } from '@angular/core';
import { SigapeTemplateDirective } from 'ngx-sigape';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit{
  contentSource:any=[
    {
      name:'Gestion de Perfiles',
      visible:true,
      key:0,

    },
    {
      name:'Gestion de Opciones',
      visible:true,
      key:1
    },
    {
      name:'Gestion de Usuarios',
      visible:true,
      key:2
    },
    {
      name:'Gestion de Menus',
      visible:true,
      key:2
    },
    {
      name:'Gestion de Sistemas',
      visible:true,
      key:2
    }
  ]
  @ViewChild('perfiles', {static:true}) perfiles!:TemplateRef<any>;
  @ViewChild('opciones', {static:true} ) opciones!:TemplateRef<any>;
  @ViewChild('usuarios', {static:true}) usuarios!:TemplateRef<any>;

  templates:TemplateRef<any>[]=[]

  ngAfterContentInit(): void {
    this.templates.push(this.perfiles, this.opciones, this.usuarios)
 }

 user={
  usuario:'Holaaa'
 }
}
