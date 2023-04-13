import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expenseDelete } from '../redux/actions/index';

class Table extends Component {
  deleteExpense = (objectExpense) => {
    const { dispatch } = this.props;
    // console.log('cliquei em deletar despesa');
    // console.log(objectExpense);
    dispatch(expenseDelete(objectExpense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <section>
        <table>
          {/* <colgroup span={ expenses.length } className="columns" /> */}
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>
                  {expense.exchangeRates[expense.currency].name}

                </td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(expense.value)
                  * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button className="bg-blue-400 rounded-lg p-1">Editar</button>
                  <button
                    className="bg-red-400 rounded-lg p-1"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteExpense(expense) }
                  >
                    Excluir

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    }),
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
