import { createReducer, on } from "@ngrx/store";
import {SessionActions} from '../actions'
import { IAppSession } from "../app.reducer.interface";


export const estadoInicial: IAppSession= {
  isLoading: false,
  isLoggedIn: false,
  user: null,
  token: '',
  loginError: false,
  fromStorage: false,
  sessionExpired: false,
};

export const SessionReducer = createReducer(
  estadoInicial,
  on(SessionActions.SessionValidateUser, (state) => ({...state, isLoading:true})),
  on(SessionActions.SessionValidateUserSuccess, (state, { usuario, token }) => ({ ...state, isLoading:false, isLoggedIn:true, user:usuario, token })),
  on(SessionActions.SessionValidateUserFail, (state) => ({ ...state, isLoading:false, loginError:true })),
  on(SessionActions.SessionLogout, (state) => ({...estadoInicial})),
);


