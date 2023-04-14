import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExpenseThunk, editExpenseAction } from '../redux/actions';
import Table from './Table';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
    edit: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const { dispatch } = this.props;
    const addExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    // disparar action para adicionar no estado global
    dispatch(fetchExpenseThunk(addExpense));
    this.setState({
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  };

  editExpense = ({ id, value, description, currency, method, tag }) => {
    this.setState({
      value,
      description,
      currency,
      method,
      tag,
      edit: true,
      id,
    });
  };

  editedExpense = (event) => {
    event.preventDefault();
    const { expenses, dispatch } = this.props;
    const { value, description, currency, method, tag, id: idEdited } = this.state;
    expenses[idEdited].value = value;
    expenses[idEdited].description = description;
    expenses[idEdited].currency = currency;
    expenses[idEdited].method = method;
    expenses[idEdited].tag = tag;
    console.log(expenses);
    dispatch(editExpenseAction(expenses));
    this.setState({
      edit: false,
      id: 0,
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag, edit } = this.state;
    return (
      <section>
        <form className="flex gap-3 p-4">
          <label htmlFor="value-input">
            Valor:
            <input
              className="block bg-neutral-900 rounded p-2 text-white"
              id="value-input"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              type="number"
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              className="block bg-neutral-900 rounded p-2 text-white"
              id="description-input"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              type="text"
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              id="currency-input"
              data-testid="currency-input"
              className="block bg-neutral-900 rounded p-2 text-white"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((currencyApi) => (
                <option
                  value={ currencyApi }
                  key={ currencyApi }
                >
                  {currencyApi}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de Pagamento:
            <select
              id="method-input"
              data-testid="method-input"
              className="block bg-neutral-900 rounded p-2 text-white"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tag:
            <select
              id="tag-input"
              data-testid="tag-input"
              className="block bg-neutral-900 rounded p-2 text-white"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          {
            edit ? (
              <button
                type="submit"
                className="bg-green-400 p-3 mt-4 rounded-lg
            shadow hover:bg-green-600 cursor-pointer text-black"
                onClick={ this.editedExpense }
              >
                Editar despesa
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-400 p-3 mt-4 rounded-lg
            shadow hover:bg-green-600 cursor-pointer text-black"
                onClick={ this.handleSubmit }
              >
                Adicionar despesa
              </button>
            )
          }

        </form>
        <Table editExpense={ this.editExpense } />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
