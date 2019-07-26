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
  add: async ( newLead) => {
    const URL = `${c.API_CONSUMER}/api/lead/add`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: newLead.formData,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()}
        );
      return data;
    } catch (error) {
      throw error;
    }
  },
  list: async () => {
    const URL = `${c.API_CONSUMER}/api/lead/list`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      throw error;
    }
  },
  last: async () => {
    const URL = `${c.API_CONSUMER}/api/lead/last`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      throw error;
    }
  },
  addComment: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/lead/addComment`;
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
  allComment: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/lead/allComment`;
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
};

