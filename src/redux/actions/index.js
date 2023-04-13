import { fetchApiCurrency } from '../../services/fetchApi';

// ACTIONS TYPES
export const USER_LOGIN = 'USER_LOGIN';
export const FETCH_CURRENCY_SUCESS = 'FETCH_CURRENCY_SUCESS';
export const FETCH_EXPENSE_SUCESS = 'FETCH_EXPENSE_SUCESS';
export const EXPENSE_DELETE = 'EXPENSE_DELETE';

// ACTIONS CREATORS
export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: {
    email,
  },
});

const fetchCurrencySucess = (newCurrencies, data, expense) => ({
  type: FETCH_CURRENCY_SUCESS,
  payload: {
    newCurrencies,
    data,
    expense,
  },
});

const fetchExpenseSucess = (currentExpense) => ({
  type: FETCH_EXPENSE_SUCESS,
  payload: {
    currentExpense,
  },
});

export const expenseDelete = (expense) => ({
  type: EXPENSE_DELETE,
  payload: {
    expense,
  },
});

// ACTIONS THUNK
// action thunk que vai atualizar o estado "currencies"(moedas) e "expenses", do estado global
export const fetchCurrencyThunk = () => async (dispatch) => {
  try {
    const data = await fetchApiCurrency();
    // delete data.USDT (poderia deletar assim)
    const currencies = Object.keys(data);
    const newCurrencies = currencies.filter((currency) => currency !== 'USDT');
    dispatch(fetchCurrencySucess(newCurrencies));
  } catch (error) {
    console.log(error);
  }
};

// action thunk que vai atualizar o estado "expenses", do estado global
export const fetchExpenseThunk = (addExpense) => async (dispatch) => {
  try {
    const data = await fetchApiCurrency();
    dispatch(fetchExpenseSucess({ ...addExpense, exchangeRates: data }));
  } catch (error) {
    console.log(error);
  }
};
