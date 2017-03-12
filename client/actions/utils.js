export let jwtHeader = (params) => {
  return {
    headers: { authorization: localStorage.getItem('token') },
    params
  };
}
