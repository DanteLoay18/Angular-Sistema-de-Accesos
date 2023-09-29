import { Component, Input, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService, FormModel, FormType } from 'ngx-sigape';
import { IMenu } from '../../interfaces/menu.interface';
import * as MenusActions from '../../store/menu/menu.actions'
import * as SubmenusActions from '../../store/submenu/submenu.actions'
@Component({
  selector: 'app-form-search-menu',
  templateUrl: './form-search-menu.component.html',
  styleUrls: ['./form-search-menu.component.scss']
})
export class FormSearchMenuComponent implements OnInit{
  @Input() esMenu:boolean = false;
  private dialogService = inject(DialogService);
  private store = inject(Store);
  form!: FormModel<IMenu>;
  state$= this.store.select('mantenimiento');
  formOpcion:IMenu={
    nombre:'',
    icono:'',
    url:'',
  }
  tieneNuevoOpcion:boolean=false;

  ngOnInit(): void {
   this.buildForm();
   this.state$.subscribe(({sistema})=>{
     sistema.current.opciones.map(({nombre, icono, esEmergente, esEliminado}:any)=>{
        if(nombre==="NUEVO" && esEliminado===false){
          this.tieneNuevoOpcion=true;
        }
      })
   })
  }

  private buildForm() {

    this.form = new FormModel<any>(
      FormType.BUSCAR,
      this.formOpcion,
      {},
      {
        onSearch: this.handleSearch
      }
    );
  };



  handleSearch = (formValue:any) => {

  };

  handleClear = () => {
    this.form.model['nombre'].setValue('');
    this.form.model['icono'].setValue('');
    this.form.model['url'].setValue('');
  };


  handleInputChange({ value }: any, model:string) {
    const validationRules:any = {
      nombre: /^[A-Za-z\s]+$/,
      icono: /^[A-Za-z_]+$/,
      url: /^[A-Za-z]+$/,
    };


    if (validationRules.hasOwnProperty(model)) {
      const regex = validationRules[model];
      if (regex.test(value)) {
        if (model === 'nombre' || model === 'icono' || model === 'url') {
          this.form.model[model].setValue(value.toUpperCase());
        }
      } else {
        this.form.model[model].setValue(value.slice(0, -1));
      }
    }



  }
  handleSubmit(){
    let pageSizeMenu:number=0;
    let idMenu:string="";
    let pageSizeSubmenu:number=0;
    let titulo:string="";
    this.state$.subscribe(({menu, submenu})=>{
      pageSizeMenu=menu.source.pageSize;
      idMenu=submenu.current.idMenu;
      pageSizeSubmenu=submenu.source.pageSize;
      titulo=submenu.current.titulo;
    })
    if(this.form.submit()){
      if(this.form.model['nombre'].value==="" && this.form.model['icono'].value==="" && this.form.model['url'].value==="" && this.esMenu){
        this.store.dispatch(MenusActions.CargarListadoDeMenus({page:1, pageSize:pageSizeMenu}))
      }else if(this.form.model['nombre'].value==="" && !this.esMenu){
        this.store.dispatch(SubmenusActions.CargarListadoDeSubmenus({id:idMenu,titulo,page:1, pageSize:pageSizeSubmenu}))
      }else if(this.esMenu){
        this.store.dispatch(MenusActions.BuscarMenu({nombre:this.form.model['nombre'].value, icono:this.form.model['icono'].value, url:this.form.model['url'].value,page:1, pageSize:pageSizeMenu}))


      }else if(!this.esMenu){
        this.store.dispatch(SubmenusActions.BuscarSubmenu({nombre:this.form.model['nombre'].value,page:1, pageSize:pageSizeSubmenu}))
      }


    }
  }
}
