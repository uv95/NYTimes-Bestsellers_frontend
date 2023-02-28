import { action, computed, makeObservable, observable } from 'mobx';

const userStr = localStorage.getItem('user');

class Config {
  token: string | null = userStr ? JSON.parse(userStr).token : null;

  constructor() {
    makeObservable(this, {
      token: observable,
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
