import { IPerfiles } from "./perfiles.interface";


export interface IUsuario {
  token?:             string;
  _id:               string;
  email:             string;
  nombres:           string;
  apellidos:         string;
  esEliminado:       boolean;
  isDefaultPassword: boolean;
  avatarText:        string;
  message:           string;
  error:             number;
  perfiles?:          IPerfiles[];
}
