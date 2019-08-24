import axios from 'axios';
import * as c from '../Constants';
import { authHeader } from '../AuthHeader';
import checkError from '../HttpClient';

const PARAMS = ({ methodType = 'GET' }) => ({
  method: methodType,
  headers: {
    'Content-Type': 'application/json',
  },
  headers: authHeader(), 
});

export default {
  register: async (newCustomer) => {
    console.log('customer -- ',newCustomer);
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
      checkError();
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
      checkError();
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
      checkError();
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
      checkError();
      throw error;
    }
  }, 

  getSingleCustomer: async (customerId) => {
    const URL = `${c.API_CONSUMER}/api/franchise/customer/getsinglecustomer`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: customerId,
        headers: {
          'Content-Type': 'application/json',
        },
        headers: authHeader()}
      );
      return data;
    } catch (error) {
      checkError();
      throw error;
    }
  },

};
