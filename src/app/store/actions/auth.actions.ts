import { createAction, props } from "@ngrx/store";
import { LoginDTO } from "../../shared/models/LoginDTO";
import { RegisterDTO } from "../../shared/models/RegisterDTO";
import { LoginReturnDTO } from "../../shared/models/LoginReturnDTO";

export const LOGIN = createAction('[Auth] Log in', props<LoginDTO>());
export const LOGIN_SUCCESS = createAction('[Auth] Log in success', props<LoginReturnDTO>());
export const LOGIN_FAILURE = createAction('[Auth] Log in failure', props<LoginReturnDTO>());

export const REGISTER = createAction('[Auth] Register', props<RegisterDTO>());
export const REGISTER_FINISH = createAction('[Auth] Register finish');

export const LOGOUT = createAction('[Auth] Log out');
export const LOGOUT_SUCCESS = createAction('[Auth] Log out success');
export const LOGOUT_FAILURE = createAction('[Auth] Log out failure');