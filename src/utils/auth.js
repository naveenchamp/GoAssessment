import Cookies from 'js-cookie';
import { JWT_COOKIE_NAME } from './constants.js';

export const getAuthToken = () => Cookies.get(JWT_COOKIE_NAME) || '';

export const saveAuthToken = (token) => {
  Cookies.set(JWT_COOKIE_NAME, token);
};

export const clearAuthToken = () => {
  Cookies.remove(JWT_COOKIE_NAME);
};

export const isAuthenticated = () => Boolean(getAuthToken());
