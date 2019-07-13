import Config from './Config';

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const PLATFORM = process.env.PLATFORM ? process.env.PLATFORM : 'local';
const VERSION = process.env.VERSION ? process.env.VERSION : 'stag';
const KEY = `${ENV}-${PLATFORM}-${VERSION}`;

export const API_URL = 'http://localhost:3000'; // Config[KEY].API_URL;
export const AUTH_URL = 'http://localhost:3000'; // Config[KEY].AUTH_URL;
export const API_CONSUMER = 'http://localhost:3000'; // Config[KEY].API_URL;

// Helpers
export const APP_TOKEN = {
  set: ({ token, refreshToken, roleName, franchiseId, userName, userId }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('role_name', roleName);
    localStorage.setItem('franchise_id', franchiseId);
    localStorage.setItem('user_name', userName);
    localStorage.setItem('user_id', userId);
  },
  remove: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role_name');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    localStorage.removeItem('uid');
  },
  get: () => ({
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refresh_token'),
    roleName: localStorage.getItem('role_name'),
    franchiseId: localStorage.getItem('franchise_id'),
    userName: localStorage.getItem('user_name'),
    userId: localStorage.getItem('user_id'),
  }),
  get notEmpty() {
    const cond1 = this.get().token !== null;
    const cond2 = this.get().token !== '';
    return cond1 && cond2;
  },
};
