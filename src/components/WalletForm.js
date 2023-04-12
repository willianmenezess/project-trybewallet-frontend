import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <form className="flex gap-3 p-4">
        <label htmlFor="value-input">
          Valor:
          <input
            className="block bg-neutral-900 rounded p-2 text-white"
            id="value-input"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            className="block bg-neutral-900 rounded p-2 text-white"
            id="description-input"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          <select
            id="currency-input"
            data-testid="currency-input"
            className="block"
          >
            { currencies.map((currency) => (
              <option
                value={ currency }
                key={ currency }
              >
                {currency}

              </option>

            ))}

          </select>
        </label>

        <label htmlFor="method-input">
          Método de Pagamento:
          <select
            id="method-input"
            data-testid="method-input"
            className="block"
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao de credito">Cartão de crédito</option>
            <option selected value="cartao de debito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Tag:
          <select
            id="tag-input"
            data-testid="tag-input"
            className="block"
          >
            <option selected value="dinheiro">Alimentação</option>
            <option value="cartao de credito">Lazer</option>
            <option value="cartao de debito">Trabalho</option>
            <option value="cartao de debito">Transporte</option>
            <option value="cartao de debito">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
