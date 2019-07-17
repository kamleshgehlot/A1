import axios from 'axios';
import * as c from '../Constants';
import { authHeader } from '../AuthHeader';

const PARAMS = ({ methodType = 'GET' }) => ({
  method: methodType,
  headers: {
    'Content-Type': 'application/json',
  },
  headers: authHeader(),
});

export default {
  register: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/franchise/customer/register`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      throw error;
    }
  },


 list: async (franchisedata) => {
    const URL = `${c.API_CONSUMER}/api/franchise/customer/list`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {
        data: franchisedata,
      }),
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  
};
