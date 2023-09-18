

export interface Paginado<T>{
  items:T[];
  pageSize:number;
  page:number;
  total:number;
}
