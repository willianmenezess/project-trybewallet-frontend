import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    // fazendo somatório das despesas (cada uma em sua respectiva moeda) e convertido para o REAL Brasileiro
    const sum = expenses
      .reduce((acc, expense) => acc + (Number(expense.value)
       * Number(expense.exchangeRates[expense.currency].ask)), 0);
    return (
      <div className="flex gap-3 p-2">
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{sum.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
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
};

export default connect(mapStateToProps)(Header);
