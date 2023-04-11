// Coloque aqui suas actions

// ACTIONS TYPES
export const USER_LOGIN = 'USER_LOGIN';

// ACTIONS CREATORS
export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: {
    email,
  },
});
