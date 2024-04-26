export interface AuthState {
  user: any | null;
  token: string | null;
}

export const authState: AuthState = { user: null, token: null };
