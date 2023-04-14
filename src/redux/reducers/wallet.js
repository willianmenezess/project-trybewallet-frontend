// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_CURRENCY_SUCESS, FETCH_EXPENSE_SUCESS,
  EXPENSE_DELETE, EXPENSE_EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCY_SUCESS:
    return {
      ...state,
      currencies: [...action.payload.newCurrencies],
    };
  case FETCH_EXPENSE_SUCESS:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload.currentExpense,
        id: state.expenses.length }],
    };
  case EXPENSE_DELETE:
    return {
      ...state,
      expenses: state.expenses
        .filter((expense) => expense.id !== action.payload.expense.id),
    };
  case EXPENSE_EDIT:
    return {
      ...state,
      expenses: [...action.payload.expenses],
    };
  default:
    return state;
  }
};

export default walletReducer;
