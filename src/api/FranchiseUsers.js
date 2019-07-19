import axios from 'axios';
import * as c from './Constants';
import { authHeader } from './AuthHeader';

const PARAMS = ({ methodType = 'GET' }) => ({
  method: methodType,
  headers: {
    'Content-Type': 'application/json',
  },
  headers: authHeader(),
});

export default {
  list: async () => {
    const URL = `${c.API_CONSUMER}/api/franchiseuser/list`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      throw error;
    }
  },
  user: async () => {
    const URL = `${c.API_CONSUMER}/api/franchiseuser/user`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      throw error;
    }
  }
};
