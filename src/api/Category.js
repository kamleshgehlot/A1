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
    const URL = `${c.API_CONSUMER}/api/category/add`;
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
  addcategory: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/addCategory`;
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
  addsubcategory: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/addSubCategory`;
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
  addproduct: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/addProduct`;
    try {
      console.log('api----',data);
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
  productlist: async () => {
    const URL = `${c.API_CONSUMER}/api/category/productList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      throw error;
    }
  },
  edit: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/category/edit`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'POST' }), {
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
    const URL = `${c.API_CONSUMER}/api/category/list`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      throw error;
    }
  },
};
