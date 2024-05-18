import { createAction, props } from "@ngrx/store";
import { LoginDTO } from "../../../../shared/models/LoginDTO";
import { RegisterDTO } from "../../../../shared/models/RegisterDTO";
import { User } from "../../../../shared/models/User";

export const LOGIN = createAction('[Auth] Log in', props<LoginDTO>());
export const LOGIN_SUCCESS = createAction('[Auth] Log in success', props<User>());
export const LOGIN_FAILURE = createAction('[Auth] Log in failure', props<User>());

export const REGISTER = createAction('[Auth] Register', props<RegisterDTO>());
export const REGISTER_FINISH = createAction('[Auth] Register finish');

export const LOGOUT = createAction('[Auth] Log out');
export const LOGOUT_SUCCESS = createAction('[Auth] Log out success');
export const LOGOUT_FAILURE = createAction('[Auth] Log out failure');

export const SET_STATE_FROM_STORAGE = createAction('[Auth] Set state from storage');
export const SET_STATE_SUCCESS = createAction('[Auth] Set state success', props<User>());
export const SET_STATE_FAILURE = createAction('[Auth] Set state failure');