export let jwtHeader = (params) => {
  return Object.assign({ headers: { authorization: localStorage.getItem('token') } }, params);
}
