import axios from 'axios';
import * as c from './Constants';
import { authHeader } from './AuthHeader';
import checkError from './HttpClient';

const PARAMS = ({ methodType = 'GET' }) => ({
  method: methodType,
  headers: {
    'Content-Type': 'application/json',
  },
  headers: authHeader(),
});

export default {
  // list: async () => {
  //   const URL = `${c.API_CONSUMER}/api/location/getAll`;
  //   try {
  //     const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
  //     return data;
  //   } catch (error) {
  //     checkError(error);

  //     throw error;
  //   }
  // },

  FinanceOrderReport: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/report/financeOrderReport`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  getOrderReport: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/report/getOrderReport`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  getDeliveryReport: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/report/getDeliveryReport`;
    try {
      const { data } = await axios(URL,Object.assign({}, PARAMS({ methodType: 'POST' }), {
          cancelToken,
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
};
