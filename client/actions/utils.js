export let jwtHeader = () => {
  return { headers: { authorization: localStorage.getItem('token') } }
}
