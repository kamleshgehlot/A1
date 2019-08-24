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
      checkError(error);
      throw error;
    }
  },
  list: async () => {
    const URL = `${c.API_CONSUMER}/api/task/list`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  last: async () => {
    const URL = `${c.API_CONSUMER}/api/task/last`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  taskStatus: async () => {
    const URL = `${c.API_CONSUMER}/api/task/taskStatus`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  completedlist: async () => {
    const URL = `${c.API_CONSUMER}/api/task/completedList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  delete: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/task/deleteTask`;
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
      checkError(error);
      throw error;
    }
  },
  stafftasks: async () => {
    const URL = `${c.API_CONSUMER}/api/task/staffTasks`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'GET' }), {}));
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  staffUpdate: async (staffData) => {
    const URL = `${c.API_CONSUMER}/api/task/staffUpdate`;
    try {
      const { data } = await axios(
        URL,
        {
          method: 'POST',
          data: staffData.formData,
          headers: {
            'Content-Type': 'application/json',
          },
          headers: authHeader()}
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  reschedule: async ({ cancelToken, ...payload }) => {
    const URL = `${c.API_CONSUMER}/api/task/reschedule`;
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
      checkError(error);
      throw error;
    }
  },
};

