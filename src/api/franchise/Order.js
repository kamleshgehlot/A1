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
  uploadDocument: async (data1) => {
    // console.log("data1 ",data1);
    const URL = `${c.API_CONSUMER}/api/franchise/order/uploaddoc`;
    try {
      const { data } = await axios(URL, {
        method: 'POST',
        data: data1.formData,
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
      console.log('dat....', data);
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

  getCurrespondingBudget: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getbudget`;
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

  getExistingBudget: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getoldbudget`;
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

  getCurrespondingFixedOrder: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getfixedorder`;
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

  getCurrespondingFlexOrder: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/getflexorder`;
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

  assignToFinance: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/assigntofinance`;
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

  editPost: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/editorder`;
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

  getFlexOrderDataForPDF: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/get-flex-order-data-for-PDF`;
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

  getFixedOrderDataForPDF: async (req) => {
    const URL = `${c.API_CONSUMER}/api/franchise/order/get-fixed-order-data-for-PDF`;
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
};
