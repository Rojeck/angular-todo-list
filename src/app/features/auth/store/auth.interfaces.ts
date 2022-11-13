import { CurrentUser } from 'src/app/shared/interfaces/current-user.interface';

export interface BackEndErrorInterface {
  message: string;
}

export interface AuthStateInterface {
  isLoggedIn: boolean | null;
  currentUser: CurrentUser | null;
  isSubmitting: boolean;
  backEndErrors: BackEndErrorInterface | null;
}
