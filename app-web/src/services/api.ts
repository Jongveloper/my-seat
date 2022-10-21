import axios from 'axios';

import { loadItem, saveItem } from './stoage';

import { store } from '../store';

import { setAccessToken } from '../redux/authSlice';

const BASE_URL = 'https://api.codesoom-myseat.site';

const api = axios.create({
  baseURL: BASE_URL,
});

export const request = ({ ...options }) => {
  const token = loadItem('accessToken');
  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';
  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    return error;
  };

  return api(options).then(onSuccess).catch(onError);
};

export const getSeats = () => {
  return api.get('/seats');
};

export const getSeatDetail = (seatNumber: number) => {
  return request({ url: `/seat/${seatNumber}`, method: 'get' });
};

export const seatReservation = async ({ seatNumber }: { seatNumber: number }) => {
  try {
    return await request({ url: `/seat-reservation/${seatNumber}`, method: 'post' });
  } catch (err) {
    alert(err.message);
  }
};

export const cancelReservation = async ({ seatNumber }: { seatNumber: number }) => {
  try {
    return await request({ url: `/seat-reservation/${seatNumber}`, method: 'delete' });
  } catch (err) {
    alert(err.message);
  }
};

export const login = async ({ email, password }: { email: string, password: string }) => {
  return api
    .post('/login', {
      email,
      password,
    }).then((res) => {
      const accessToken = res.data.accessToken;
      saveItem('accessToken', accessToken);

      store.dispatch(setAccessToken(accessToken));
    }).catch((error) => {
      window.alert(error.message);
    });
};

export const signUp = async ({
  email,
  password,
  name,
}: { email: string, password: string, name: string }) => {
  return api
    .post('/signup', {
      email,
      password,
      name,
    }).catch((error) => {
      window.alert(error.message);
    });
};
