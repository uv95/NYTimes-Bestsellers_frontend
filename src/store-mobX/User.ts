import axios, { AxiosError } from 'axios';
import {
  IRegister,
  ILogin,
  IUpdatedAuth,
  IUser,
  StateType,
} from '../utils/types';
import { BASE_URL } from '../utils/consts';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { extractErrorMessage } from '../utils/errorMessage';
import Config from './Config';
import markedBooks from './MarkedBooks';

const API_URL = BASE_URL + 'users/';

const userStr = localStorage.getItem('user');
let user: IUser | null = null;
if (userStr) user = JSON.parse(userStr).data.user;

export class User extends Config {
  user = user || null;
  state: StateType = StateType.IDLE;

  constructor() {
    super();
    makeObservable(this, {
      user: observable,
      state: observable,
      register: action,
      resetPassword: action,
      login: action,
      logout: action,
      updatePassword: action,
      getMe: action,
      forgotPassword: action,
      updateMe: action,
      deleteAccount: action,
      setError: action,
    });
  }

  setError(error: AxiosError) {
    this.state = StateType.ERROR;
    toast.error(extractErrorMessage(error));
  }

  async register(userData: IRegister) {
    this.state = StateType.PENDING;
    this.user = null;

    try {
      const res = await axios.post(API_URL + 'register', userData);
      if (res.data) localStorage.setItem('user', JSON.stringify(res.data));

      runInAction(() => {
        this.state = StateType.SUCCESS;
        this.user = res.data.data.user;
        this.setToken(res.data.token);
      });
    } catch (error: any) {
      this.state = StateType.ERROR;
      if (Object.values(userData).filter((val) => val.length !== 0).length < 4)
        return toast.error('Please fill all the fields');
      toast.error(error.split(':')[error.split(':').length - 1]);
    }
  }

  async login(userData: ILogin) {
    this.state = StateType.PENDING;
    this.user = null;
    
    try {
      const res = await axios.post(API_URL + 'login', userData);
      if (res.data) localStorage.setItem('user', JSON.stringify(res.data));

      runInAction(() => {
        this.state = StateType.SUCCESS;
        this.user = res.data.data.user;
        this.setToken(res.data.token);
      });
    } catch (error: any) {
      this.setError(error);
    }
  }

  async updatePassword(updatedData: IUpdatedAuth) {
    this.state = StateType.PENDING;

    try {
      const res = await axios.patch(
        API_URL + 'updateMyPassword',
        updatedData,
        this.config
      );

      runInAction(() => {
        this.state = StateType.SUCCESS;
        this.user = { ...this.user, ...res.data.data.user };
      });
    } catch (error: any) {
      this.setError(error);
    }
  }

  async getMe() {
    this.state = StateType.PENDING;
    this.user = null;

    try {
      const res = await axios.get(API_URL + 'me', this.config);
      runInAction(() => {
        this.state = StateType.SUCCESS;
        this.user = res.data.data.data;
      });
    } catch (error: any) {
      this.setError(error);
    }
  }

  async updateMe(updatedData: Partial<IUser>) {
    this.state = StateType.PENDING;
    try {
      const res = await axios.patch(
        API_URL + 'updateMe',
        updatedData,
        this.config
      );
      if (res.data)
        localStorage.setItem(
          'user',
          JSON.stringify({ token: this.token, ...res.data })
        );
      runInAction(() => {
        this.user = res.data.data.user;
        this.state = StateType.SUCCESS;
      });
    } catch (error: any) {
      this.setError(error);
    }
  }

  async deleteAccount(userId: string) {
    this.state = StateType.PENDING;

    try {
      await axios.delete(API_URL + userId, this.config);
      runInAction(() => {
        localStorage.removeItem('user');
        this.state = StateType.SUCCESS;
        this.user = null;
        markedBooks.setMarkedBooks([]);
        markedBooks.setIsNewBookMarked(true);
      });
    } catch (error: any) {
      this.setError(error);
    }
  }

  async forgotPassword(email: Partial<ILogin>) {
    try {
      await axios.post(API_URL + 'forgotPassword', email);
      runInAction(() => {
        this.state = StateType.SUCCESS;
      });
    } catch (error: any) {
      this.setError(error);
    }
  }

  async resetPassword(updatedData: Partial<IUpdatedAuth>, token: string) {
    try {
      await axios.patch(API_URL + `resetPassword/${token}`, updatedData);
      runInAction(() => {
        this.state = StateType.SUCCESS;
      });
    } catch (error: any) {
      this.setError(error);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.user = null;
    this.setToken(null);
    markedBooks.setMarkedBooks([]);
    markedBooks.setIsNewBookMarked(true);
  }
}

export default new User();
