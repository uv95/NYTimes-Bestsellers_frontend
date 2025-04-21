import axios from 'axios';
import { IRegister, ILogin, IUpdatedAuth, IUser } from '../../utils/types';
import { BASE_URL } from '../../utils/consts';
import { setCookie } from '../../utils/cookieUtils';

const API_URL = BASE_URL + 'users/';

const register = async (userData: IRegister) => {
  const res = await axios.post(API_URL + 'register', userData);

  if (res.data) {
    setCookie('token', res.data.token, 7);
    setCookie('user', JSON.stringify(res.data.data.user), 7);
  }

  return res.data;
};

const login = async (userData: ILogin) => {
  const res = await axios.post(API_URL + 'login', userData);

  if (res.data) {
    setCookie('token', res.data.token, 7);
    setCookie('user', JSON.stringify(res.data.data.user), 7);
  }

  return res.data;
};

const updatePassword = async (token: string, updatedData: IUpdatedAuth) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.patch(
    API_URL + 'updateMyPassword',
    updatedData,
    config
  );

  return res.data;
};

const getMe = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + 'me', config);

  return res.data;
};

const updateMe = async (token: string, updatedData: Partial<IUser>) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.patch(API_URL + 'updateMe', updatedData, config);

  return res.data;
};

const deleteAccount = async (token: string, userId: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete(API_URL + userId, config);

  return res.data;
};

const forgotPassword = async (email: Partial<ILogin>) => {
  const res = await axios.post(API_URL + 'forgotPassword', email);
  return res.data;
};

const resetPassword = async (
  token: string,
  updatedData: Partial<IUpdatedAuth>
) => {
  const res = await axios.patch(
    API_URL + `resetPassword/${token}`,
    updatedData
  );

  return res.data;
};

const userService = {
  register,
  login,
  updatePassword,
  getMe,
  updateMe,
  deleteAccount,
  forgotPassword,
  resetPassword,
};

export default userService;
