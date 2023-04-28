import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CgProfile } from 'react-icons/cg';
import { BsCashCoin } from 'react-icons/bs';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    // fazendo somatório das despesas (cada uma em sua respectiva moeda) e convertido para o REAL Brasileiro
    const sum = expenses
      .reduce((acc, expense) => acc + (Number(expense.value)
       * Number(expense.exchangeRates[expense.currency].ask)), 0);
    return (
      <header>
        <div className="pt-8 pb-3 text-center">
          <span className="text-3xl">💸</span>
          <span className="text-blue-800 text-2xl font-light"> Trybe</span>
          <span className="text-green-400 font-extrabold text-2xl">Wallet</span>
        </div>
        <div className="flex flex-col items-center text-green-500 font-semibold">
          <div className="flex justify-center items-center gap-1">
            <CgProfile />
            <p data-testid="email-field">{email}</p>
          </div>
          <div className="flex gap-1 justify-center items-center text-blue-700">
            <BsCashCoin />
            <p data-testid="total-field">{`Total de despesas: ${sum.toFixed(2)}`}</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>
      </header>
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
