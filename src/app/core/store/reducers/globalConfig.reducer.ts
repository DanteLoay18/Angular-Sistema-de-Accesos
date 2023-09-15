import { IAppGlobalConfig } from "../app.reducer.interface";
import { createReducer, on } from "@ngrx/store";
import * as globalConfigActions from '../actions';

const estadoInicial : IAppGlobalConfig = {
 guidSistema:'aabbc0c9-f77e-45f9-bbe4-0f5d7f060253',
 isLoading:false,
 loaded:false,
 error:false
}


export const GlobalConfigReducer = createReducer(
  estadoInicial,
  on(globalConfigActions.globalConfig, (state)=> ({...state, isLoading:true})),
  on(globalConfigActions.globalConfigSuccess, (state)=> ({...state, isLoading:false, loaded:true})),
  on(globalConfigActions.globalConfigFail, (state)=> ({...state, isLoading:false, error:true})),
)
