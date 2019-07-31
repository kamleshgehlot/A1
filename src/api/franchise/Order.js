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
  register: async (newCustomer) => {
    const URL = `${c.API_CONSUMER}/api/franchise/customer/register`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: newCustomer.formData,
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
  
  idtypelist: async (franchisedata) => {
    const URL = `${c.API_CONSUMER}/api/franchise/customer/idtype/list`;
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

  search: async (searchData) => {
    const URL = `${c.API_CONSUMER}/api/franchise/customer/search`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: searchData,
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
