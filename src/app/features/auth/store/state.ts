import { User } from '../../../shared/models/User';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const authState: AuthState = {
  user: null,
  isAuthenticated: false,
};
