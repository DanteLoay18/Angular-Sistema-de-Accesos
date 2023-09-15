import { createAction, props } from "@ngrx/store";
import { IUsuario } from "../../interfaces/usuario.interface";

export const SessionValidateUser = createAction(
  '[Session] Validate User'
);

export const SessionValidateUserSuccess = createAction(
  '[Session] Validate User Success',
  props<{ usuario:IUsuario, token:string }>()
);

export const SessionValidateUserFail = createAction(
  '[Session] Validate User Fail',
  props<{ error:any }>()
);

export const SessionLogout = createAction(
  '[Session] Logout',
);

