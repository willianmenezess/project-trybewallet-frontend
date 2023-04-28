import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    onDisabled: true,
  };

  handleChange = ({ target }) => {
    const { password, email } = this.state;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    const MIN_CHARACTER = 5;
    const regex = /^[\w-]+@([\w-]+\.)+[\w-]{3,4}$/i;
    if (password.length >= MIN_CHARACTER && email.match(regex)) {
      this.setState({
        onDisabled: false,
      });
    } else {
      this.setState({
        onDisabled: true,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    // disparar action para adicionar no estado global;
    dispatch(userLogin(email));

    history.push('/carteira');
  };

  render() {
    const { email, password, onDisabled } = this.state;
    return (
      <body
        className="min-h-screen flex justify-center items-center bg-bg-login bg-top"
      >
        <main className="p-4 flex flex-col bg-white rounded-lg">
          <div className="pt-8 pb-8 text-center">
            <span className="text-2xl">💸</span>
            <span className="text-blue-800 text-2xl font-light"> Trybe</span>
            <span className="text-green-400 font-extrabold text-2xl">Wallet</span>
          </div>
          <form
            className="space-y-3 w-60"
            onSubmit={ this.handleSubmit }
          >
            <input
              data-testid="email-input"
              type="text"
              placeholder="Email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              className="block rounded p-2 text-blue-700 border-2 border-blue-700
              w-full"
            />
            <input
              data-testid="password-input"
              type="password"
              placeholder="Senha (mín. 6 caracteres)"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              className="block rounded p-2  text-blue-700 border-2
               border-blue-700 w-full"
            />
            <button
              className="bg-blue-700 p-2 rounded-lg
              shadow hover:bg-blue-900 cursor-pointer text-white w-full font-bold"
              type="submit"
              disabled={ onDisabled }
            >
              Entrar
            </button>
          </form>
        </main>
      </body>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
