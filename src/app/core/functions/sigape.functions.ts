const DEFAULT_MSG_PERIMSSION =
    'No tiene permisos para realizar acciones en esta opción';

export function buildUrlLogin(){
  return "http://localhost:4200/auth/login";
}

export function buildUrlChangePassword(token:string){
  return `http://localhost:4200/change-password?token=${token}`
}
