import { Dispatch } from 'redux';

import AuthAPI from '@mobile/repositories/auth';
import { StorageItems } from '@mobile/enum/storage';
import pushToken from '@mobile/services/device';
import navigationService from '@mobile/services/navigation';
import * as StorageService from '@mobile/services/storage';

import { AUTH_LOGGED, AUTH_LOGIN, LOGOUT } from '../actionsType';
import { startLoading, stopLoading } from '../Loading/action';

export const authenticate =
  (userData: models.LoginRequest) => async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const payload = await AuthAPI.login(userData);
      StorageService.setAuthTokens(payload.token, payload.refreshToken);
      if (payload) {
        StorageService.setAuthTokens(payload.token, payload.refreshToken);
        StorageService.setItem(StorageItems.AUTHENTICATED, 'true');
        dispatch({ type: AUTH_LOGIN, payload });
      }
      pushToken();
      navigationService.reset({
        index: 0,
        routes: [{ name: 'Content' }],
      });
    } catch (err) {
      ///handleError
    } finally {
      dispatch(stopLoading());
    }
  };

export const recovery = (email: string) => async (dispatch: Dispatch) => {
  dispatch(startLoading());
  try {
    await AuthAPI.recovery(email);
  } catch (err) {
    //handleError
  } finally {
    dispatch(stopLoading());
  }
};

export const checkLogin = () => async (dispatch: any) => {
  dispatch(startLoading());
  const authenticated = await StorageService.getItem(
    StorageItems.AUTHENTICATED
  );
  if (authenticated === 'true') {
    dispatch({ type: AUTH_LOGGED, payload: true });
  } else {
    await StorageService.setItem(StorageItems.AUTHENTICATED, 'false');
  }
  dispatch(stopLoading());
};

export const refreshToken = () => async (dispatch: Dispatch) => {
  dispatch(startLoading());
  const payload = await AuthAPI.refresh();
  if (payload) {
    dispatch({ type: AUTH_LOGIN, payload });
  }
  dispatch(stopLoading());
};

export const logout = () => async (dispatch: Dispatch) => {
  navigationService.reset({
    index: 0,
    routes: [{ name: 'Start' }],
  });
  dispatch({ type: LOGOUT });
  await StorageService.removeItem(StorageItems.AUTHENTICATED);
};
