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
  
  getnewid: async () => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getnewid`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getall`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      throw error;
    }
  },

  convertedList: async () => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/convertedList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      throw error;
    }
  },

   convert: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/convert`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: req,
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

  postOrder: async (data1) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/postorder`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: data1,
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
};
