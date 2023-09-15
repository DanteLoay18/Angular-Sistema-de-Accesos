import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { IAppTitle } from 'ngx-sigape';
import { IPerfiles } from '../core/interfaces/perfiles.interface';
import { SessionActions, buildUrlLogin } from '@sac/core';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
  private store =inject(Store);
  router= inject(Router)
 session$ = this.store.select('session');
 guidSistema :string= ""





 usuario:any={
           lastSession: "Última sesión: " + moment().format("DD/MM/YYYY"),
           avatarText: "SU",
           defaultRol: {
             NOMBRE_ROL: "ROL DEFAULT"
           },
 }
 menus: any[]  = [

 ];

 isMobile: boolean = false;
 drawerAttached: boolean = false;
 drawerOpen: boolean = false;
 drawerMobileOpen: boolean = false;

 title:IAppTitle = {
   full:'Sistema Integrado de Gestión Administrativa de Programas de Estudio',
   mini:'SIGAPE'
 }

 ngOnInit(): void {
   this.store.select('globalConfig').subscribe(({guidSistema})=>{
     this.guidSistema=guidSistema
   })

   this.session$.subscribe(({user})=> {
     this.usuario={
       ...this.usuario,
       fullName: user?.nombres+" "+user?.apellidos,
       avatarText: user?.avatarText,
       email: user?.email

     }
     user?.perfiles.map(({perfil,activo}:IPerfiles) => {
        if(activo){

           const {sistemas} = perfil;

           sistemas.forEach(sistema=>{
             if(sistema.id===this.guidSistema){

               const menus=sistema.menus.map(menu => {
                 return {
                   label: this.capitalizarPalabras(menu.nombre),
                   icon: menu.icono.toLowerCase(),
                   link: menu.url.toLowerCase()
                 }
               })

               this.menus=menus;
             }
           })

        }

     })
   })

 }



 handleLogin = () => {

   this.session$.subscribe(session=> {
     if (!session.isLoggedIn) {
       window.location.href = buildUrlLogin();
     }
   });

 }


 handleToogleDrawer = (open:any) => {
   if (open) {
     if (this.isMobile) {
       this.drawerMobileOpen = true;
     } else {
       this.drawerOpen = true;
     }
   } else {
     if (this.isMobile) {
       this.drawerMobileOpen = false;
     } else {
       this.drawerOpen = false;
     }
   }
 };

 handleToogleAttachDrawer = (open:any) => {
   if (open) {
     this.drawerAttached = true;
   } else {
     this.drawerAttached = false;
     this.drawerOpen = false;
   }
 };

 handleChangeMobileSize = (isMobile:any) => {
   setTimeout(() => {
     this.isMobile = isMobile;
   });
 };

 handleClickLogo = () => {
   this.router.navigate(['/'])
 };

 handleClickChangePassword = () => {

 };

 handleLogout = () => {

   this.store.dispatch(SessionActions.SessionLogout());
 };

 capitalizarPalabras(texto: string): string {
   return texto.toLowerCase().split(' ').map(word => {
     return word.charAt(0).toUpperCase() + word.slice(1);
   }).join(' ');
 }

}

