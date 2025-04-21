import { action, computed, makeObservable, observable } from 'mobx';
import { getCookie } from '../utils/cookieUtils';
import { IUser } from '../utils/types';

class Config {
  token: string | null = getCookie('token');
  user: IUser | null = getCookie('user')
    ? JSON.parse(getCookie('user') as string)
    : null;

  constructor() {
    makeObservable(this, {
      token: observable,
      user: observable,
      config: computed,
      setToken: action,
    });
  }

  get config() {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  setToken(token: string | null) {
    this.token = token;
  }
}

export default Config;
