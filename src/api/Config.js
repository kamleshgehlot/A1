export default {
  'development-local-stag': {
    API_URL: 'http://localhost:3000',
    AUTH_URL: '',
  },
  'production-local-stag': {
    API_URL: 'http://localhost:3000',
    AUTH_URL: '',
  },
  // get 'production-local-stag'() {
  //   return this['development-local-stag'];
  // },
  get 'test-local-stag'() {
    return this['development-local-stag'];
  },
};
