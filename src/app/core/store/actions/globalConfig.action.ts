import { createAction, props } from "@ngrx/store";

export const globalConfig = createAction(
  '[GlobalConfig] Cargar estado global'
)

export const globalConfigSuccess = createAction(
  '[GlobalConfig] Cargar estado global Success'
)

export const globalConfigFail = createAction(
  '[GlobalConfig] Cargar estado global Fail',
  props<{ error:any }>()
)

export const globalConfigCargarMenu = createAction(
  '[GlobalConfig] Cargar Menu Actual',
  props<{ menu:string }>()
)
