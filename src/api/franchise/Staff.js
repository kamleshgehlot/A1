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
    const URL = `${c.API_CONSUMER}/api/franchise/staff/register`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      // console.log("user api data : ",data);
      return data;
    } catch (error) {
      throw error;
    }
  },


  list: async (franchisedata) => {
 
    const URL = `${c.API_CONSUMER}/api/franchise/staff/list`;
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
