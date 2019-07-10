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
  add: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/task/add`;
    try {
      const { data } = await axios(
        URL,
        Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  list: async () => {
    const URL = `${c.API_CONSUMER}/api/task/list`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      throw error;
    }
  },
};
