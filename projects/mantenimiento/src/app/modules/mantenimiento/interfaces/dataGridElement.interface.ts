import { IDataGridDefinition, IDataGridSource } from "ngx-sigape";

export interface IDataGridElement<T> {
  loading: boolean;
  definition: IDataGridDefinition;
  source: IDataGridSource<T>;
  error: any;
  esBusqueda:boolean;
  modalOpcion: any;
}
