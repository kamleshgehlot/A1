export function authHeader() {
  // return authorization header with basic auth credentials
  // let user = JSON.parse(localStorage.token);

  // if (user && user.token) {
  return { Authorization: `Basic ${localStorage.token}` };
  // } else {
  //     return {};
  // }
}
