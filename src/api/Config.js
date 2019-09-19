export default {
  'config-development': {
    API_URL: 'http://localhost:3000',
    AUTH_URL: 'http://localhost:3000',
  },
  'config-dev': {
    API_URL: 'http://rentronicsdev.saimrc.com',
    AUTH_URL: 'http://rentronicsdev.saimrc.com',
  },
  'config-uat': {
    API_URL: 'http://rentronicsuat.saimrc.com',
    AUTH_URL: 'http://rentronicsuat.saimrc.com',
  },
  get 'development-local-stag'() {
    return this['config-development'];
  },
  get 'production-production-dev'() {
    return this['config-dev'];
  },
  get 'production-production-uat'() {
    return this['config-uat'];
  },
};
