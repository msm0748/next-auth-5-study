import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const baseURL = process.env.NEXT_PUBLIC_API_URI;
const isServer = typeof window === 'undefined';

export const axiosInstance = axios.create({
  baseURL,
});

async function getRefreshToken() {
  if (isServer) {
    const { cookies } = await import('next/headers');
    return cookies().get('refreshToken')?.value;
  } else {
    return getCookie('refreshToken');
  }
}
async function getAccessToken() {
  if (isServer) {
    const { cookies } = await import('next/headers');
    return cookies().get('accessToken')?.value;
  } else {
    return getCookie('accessToken');
  }
}
async function updateAccessToken(token: string) {
  if (isServer) {
    const { cookies } = await import('next/headers');
    return cookies().set('accessToken', token);
  } else {
    return setCookie('accessToken', token);
  }
}

async function refreshAccessToken() {
  const refreshToken = await getRefreshToken();
  try {
    const response = await axiosInstance.post('/auth/refresh', {
      refreshToken,
    });
    const newAccessToken = response.data.accessToken;
    updateAccessToken(newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}

axiosInstance.interceptors.request.use(
  async function (config) {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.data.message === '토큰 만료') {
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);
