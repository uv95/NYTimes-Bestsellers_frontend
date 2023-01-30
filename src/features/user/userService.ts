import axios from 'axios';
import { IRegister, ILogin, IUpdatedAuth, IUser } from '../../utils/types';
import { BASE_URL } from '../../utils/consts';

const API_URL = BASE_URL + 'users/';

const register = async (userData: IRegister) => {
  const res = await axios.post(API_URL + 'register', userData);

  if (res.data) localStorage.setItem('user', JSON.stringify(res.data));

  return res.data;
};

const login = async (userData: ILogin) => {
  const res = await axios.post(API_URL + 'login', userData);

  if (res.data) localStorage.setItem('user', JSON.stringify(res.data));

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

const userService = {
  register,
  login,
  updatePassword,
  getMe,
  updateMe,
  deleteAccount,
};

export default userService;
