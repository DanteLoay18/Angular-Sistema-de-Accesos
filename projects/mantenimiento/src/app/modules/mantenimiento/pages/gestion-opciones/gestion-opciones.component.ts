import { Component } from '@angular/core';
import { DialogService, IDataGridElement } from 'ngx-sigape';

@Component({
  selector: 'app-gestion-opciones',
  templateUrl: './gestion-opciones.component.html',
  styleUrls: ['./gestion-opciones.component.scss']
})
export class GestionOpcionesComponent {
  gridElement!: IDataGridElement<any>;

  constructor(private dialogService: DialogService) { }

  ngOnInit() {

    this.gridElement = this.gridElementEmpty();

  }

  // handleOpenNew = () => {
  //   this.dialogService.open(FormPersonaComponent, 'sm');
  // };

  handleLoadData = (e:any) => {
    console.log('event',e)
    this.gridElement = {
      ...this.gridElement,
      loading: true,
      error: null
    };

    setTimeout(() => {

      this.gridElement = {
        ...this.gridElement,
        loading: false,
        source: {
          ...this.gridElement.source,
          items: [{
            idPersona:'1',
            nombrePersona:'Kenneth Dante',
            apellidoPersona:"Loayza Avila"

          },{
            idPersona:'1',
            nombrePersona:'Kenneth Dante',
            apellidoPersona:"Loayza Avila"

          }],
          page: e.page,
          pageSize: e.pageSize,
          total: 12
        }
      };

    }, 1000);

  }


  handleClick = () => {
    this.gridElement = {
      ...this.gridElement,
      loading: true,
      error: null
    };

    setTimeout(() => {

      // const data = gridElementData();


      this.gridElement = {
        ...this.gridElement,
        loading: false,
        error: null,
        source: {
          ...this.gridElement.source,
          items: [{}, {}],
          page: 1,
          pageSize: 10,
          total: 1
        }
      };

    }, 1000);
  }

  handleClickButton = (e: any) => {
		switch (e.action) {

			case 'AGREGAR':
				console.log(e)
				break;
      default:
        break;
		}
	};

  gridElementEmpty = (): IDataGridElement<any> => ({
    error: null,
    loading: false,
    definition: {
        columns: [

            { label: 'id', field: 'idPersona' },
            { label: 'nombre', field: 'nombrePersona' },
            { label: 'apellidos', field: 'apellidoPersona' },
            {
              label: 'Acciones',
              field: 'buttons',
              buttons: [
                  {
                    action: "EDITAR",
                    icon: "edit",
                    color: "primary",
                    tooltip: "Editar",
                },
                {
                  action: "CONSULTAR",
                  icon: "search",
                  color: "primary",
                  tooltip: "Consultar",
              },
              {
                action: "ELIMINAR",
                icon: "delete",
                color: "primary",
                tooltip: "Eliminar",
            }
              ]
          },
        ]
    },
    source: {
        items: [
          {
            idPersona:'1',
            nombrePersona:'Kenneth Dante',
            apellidoPersona:"Loayza Avila"

          },
          {
            idPersona:'1',
            nombrePersona:'Kenneth Dante',
            apellidoPersona:"Loayza Avila"

          },
          {
            idPersona:'1',
            nombrePersona:'Kenneth Dante',
            apellidoPersona:"Loayza Avila"

          },
          {
            idPersona:'1',
            nombrePersona:'Kenneth Dante',
            apellidoPersona:"Loayza Avila"

          },
          {
            idPersona:'1',
            nombrePersona:'Kenneth Dante',
            apellidoPersona:"Loayza Avila"

          },{
            idPersona:'1',
            nombrePersona:'Kenneth Dante',
            apellidoPersona:"Loayza Avila"

          },{
            idPersona:'1',
            nombrePersona:'Kenneth Dante',
            apellidoPersona:"Loayza Avila"

          }
          ,{
            idPersona:'1',
            nombrePersona:'Kenneth Dante',
            apellidoPersona:"Loayza Avila"

          },{
            idPersona:'1',
            nombrePersona:'Kenneth Dante',
            apellidoPersona:"Loayza Avila"

          },{
            idPersona:'1',
            nombrePersona:'Kenneth Dante',
            apellidoPersona:"Loayza Avila"

          },
        ],
        page: 1,
        pageSize: 10,
        total: 14,
        orderBy: undefined,
        orderDir: undefined
    }
});
}
