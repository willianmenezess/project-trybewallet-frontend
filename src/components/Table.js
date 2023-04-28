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
    const { expenses, editExpense } = this.props;
    return (
      <section>
        <h3 className="text-center font-bold text-lg">Despesas</h3>
        <table className="flex justify-center">
          {/* <colgroup span={ expenses.length } className="columns" /> */}
          {/* <thead>
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
          </thead> */}
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id } className="flex flex-col space-y-1">
                <td className="flex gap-2 bg-slate-200 rounded-md">
                  <span className="font-bold">Descrição: </span>
                  {expense.description}
                </td>
                <td className="flex gap-2">
                  <span className="font-bold">Tag: </span>
                  {expense.tag}
                </td>
                <td className="flex gap-2">
                  <span className="font-bold">Método de Pagamento: </span>
                  {expense.method}
                </td>
                <td className="flex gap-2">
                  <span className="font-bold">Valor: </span>
                  {Number(expense.value).toFixed(2)}
                </td>
                <td className="flex gap-2">
                  <span className="font-bold">Moeda: </span>
                  {expense.exchangeRates[expense.currency].name}

                </td>
                <td className="flex gap-2">
                  <span className="font-bold">Câmbio utilizado: </span>
                  {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td className="flex gap-2">
                  <span className="font-bold">Valor convertido: </span>
                  {(Number(expense.value)
                  * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
                </td>
                <td className="flex gap-2">
                  <span className="font-bold">Moeda de conversão: </span>
                  Real
                </td>
                <td className="pb-8">
                  <button
                    className="bg-green-500 rounded-lg p-1 text-white font-semibold"
                    data-testid="edit-btn"
                    onClick={ () => editExpense(expense) }
                  >
                    Editar

                  </button>
                  <button
                    className="bg-red-600 rounded-lg p-1 text-white font-semibold"
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
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
