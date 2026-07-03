import { API_BASE_URL, API_ENDPOINTS } from './constants.js';

export const isUnauthorizedError = (error) => error?.status === 401 || error?.status === 403;

const createApiError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const parseJsonResponse = async (apiResponse, fallbackMessage) => {
  let response = {};

  try {
    response = await apiResponse.json();
  } catch {
    response = {};
  }

  if (!apiResponse.ok) {
    throw createApiError(response.message || fallbackMessage, apiResponse.status);
  }

  return response;
};

const requestWithAuth = async ({ endpoint, fallbackMessage, params = {}, signal, token }) => {
  if (!token) {
    throw createApiError('Your session has expired. Please sign in again.', 401);
  }

  const url = new URL(`${API_BASE_URL}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  try {
    const apiResponse = await fetch(url.toString(), {
      method: 'GET',
      signal,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return parseJsonResponse(apiResponse, fallbackMessage);
  } catch (error) {
    if (error.name === 'AbortError' || error.status) {
      throw error;
    }

    throw createApiError('Network error. Please check your connection and try again.', 0);
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const apiResponse = await fetch(`${API_BASE_URL}${API_ENDPOINTS.signIn}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    return parseJsonResponse(apiResponse, 'Login failed');
  } catch (error) {
    if (error.status) {
      throw error;
    }

    throw createApiError('Network error. Please check your connection and try again.', 0);
  }
};

export const fetchReferrals = async ({ signal, token, search = '', sort = 'desc' }) => {
  return requestWithAuth({
    endpoint: API_ENDPOINTS.referrals,
    fallbackMessage: 'Unable to load referrals',
    params: {
      search,
      sort
    },
    signal,
    token
  });
};

export const fetchReferralById = async ({ id, signal, token }) => {
  return requestWithAuth({
    endpoint: API_ENDPOINTS.referrals,
    fallbackMessage: 'Unable to load referral details',
    params: {
      id
    },
    signal,
    token
  });
};
