import { Component, ViewChild, TemplateRef, AfterContentInit, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPerfiles, ISistema } from '@sac/core';
import * as globalActions from 'src/app/core/store/actions';
import { IContentSource } from 'src/app/core/interfaces/contentSource.interface';
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterContentInit{
  private store= inject(Store);

  state$ =  this.store.select('mantenimiento');
  contentSource:IContentSource[]=[

    {
      name:'Gestion de Sistemas',
      visible:false,
      key:0
    },
    {
      name:'Gestion de Opciones',
      visible:false,
      key:1
    },
    {
      name:'Gestion de Menus',
      visible:false,
      key:2
    },
    {
      name:'Gestion de Perfiles',
      visible:false,
      key:3,

    },
    {
      name:'Gestion de Usuarios',
      visible:false,
      key:4
    },

  ]
  sistemaId:string=""
  loading:boolean=true;

  @ViewChild('sistemas', {static:true})  sistemas!:TemplateRef<any>;
  @ViewChild('perfiles', {static:true})  perfiles!:TemplateRef<any>;
  @ViewChild('opciones', {static:true} ) opciones!:TemplateRef<any>;
  @ViewChild('usuarios', {static:true})  usuarios!:TemplateRef<any>;
  @ViewChild('menus', {static:true})     menus!:TemplateRef<any>;


  templates:TemplateRef<any>[]=[]

  ngOnInit(): void {
    this.store.dispatch(globalActions.globalConfigCargarMenu({menu:"mantenimiento"}))
    this.store.select('globalConfig').subscribe(({guidSistema})=>{
      this.sistemaId=guidSistema
    })
    const menu = window.location.pathname.substring(1).toUpperCase();
    this.store.select('session')
                              .pipe(
                                filter(({ user }) => user !== null),
                                map(({ user }) => user.perfiles.filter(({ activo }:IPerfiles) => activo)),
                                map((perfiles) =>
                                  perfiles.reduce((result:any, { perfil }:IPerfiles) => [...result, ...perfil.sistemas], [])
                                )
                              )
                              .subscribe((sistemas) => {
                                sistemas.forEach(({ id, menus }:ISistema) => {
                                  if (id === this.sistemaId) {
                                    menus.forEach(({ url, submenus }) => {
                                      if (url === menu) {
                                        this.contentSource = this.contentSource.map(({ name, visible, key }) => ({
                                          name,
                                          visible: submenus?.find(({ nombre }) => nombre === name.toUpperCase()) ? true : visible,
                                          key,
                                        }));
                                        this.loading=false;
                                      }
                                    });
                                  }
                                });
                              });
  }

  ngAfterContentInit(): void {
    this.templates.push(this.sistemas, this.opciones, this.menus, this.perfiles, this.usuarios)
 }

 user={
  usuario:'Holaaa'
 }
}
