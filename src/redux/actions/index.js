import { fetchApiCurrency } from '../../services/fetchApi';

// ACTIONS TYPES
export const USER_LOGIN = 'USER_LOGIN';
export const FETCH_CURRENCY_SUCESS = 'FETCH_CURRENCY_SUCESS';

// ACTIONS CREATORS
export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: {
    email,
  },
});

const fetchCurrencySucess = (newCurrencies) => ({
  type: FETCH_CURRENCY_SUCESS,
  payload: {
    newCurrencies,
  },
});

export const fetchCurrencyThunk = () => async (dispatch) => {
  try {
    const data = await fetchApiCurrency();
    const currencies = Object.keys(data);
    const newCurrencies = currencies.filter((currency) => currency !== 'USDT');
    dispatch(fetchCurrencySucess(newCurrencies));
  } catch (error) {
    console.log(error);
  }
};
