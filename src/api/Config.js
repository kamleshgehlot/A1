export default {
  'development-local-stag': {
    API_URL: 'http://localhost:3000',
    AUTH_URL: 'http://localhost:3000',
  },
  'production-local-stag': {
    API_URL: 'http://rentronics.saimrc.com0',
    AUTH_URL: 'http://rentronics.saimrc.com',
  },
  // get 'production-local-stag'() {
  //   return this['development-local-stag'];
  // },
  get 'test-local-stag'() {
    return this['development-local-stag'];
  },
};
