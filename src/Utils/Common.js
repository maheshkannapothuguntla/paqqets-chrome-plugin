// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}


// return the token from the session storage
export const getToken = () => {
  return localStorage.getItem('IdToken') || null;
}
 
// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('Authorization');
  sessionStorage.removeItem('user');
}
 
// set the token and user from the session storage
export const setUserSession = (token, user) => {
  // sessionStorage.setItem('Authorization', token);
  sessionStorage.setItem('user', JSON.stringify(user));
}

export const getRefreshToken = () => {
  return localStorage.getItem('RefreshToken') || null;
}
export const userLogin = (token) => {
  localStorage.setItem('Authorization', token);
}

export const getuserName = () => {
  return localStorage.getItem('username') || null
}
export const getOrgId = () => {
  return localStorage.getItem("orgId") || "";
}