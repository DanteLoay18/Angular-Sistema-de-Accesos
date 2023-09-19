import { IAppGlobalConfig, IAppSession } from "./app.reducer.interface";
import {ActionReducerMap} from '@ngrx/store'
import * as reducers from './reducers'


export interface AppState {
  session: IAppSession;
  globalConfig: IAppGlobalConfig;
}

export const appReducers: ActionReducerMap<AppState>={
  session: reducers.SessionReducer,
  globalConfig:reducers.GlobalConfigReducer,
}

