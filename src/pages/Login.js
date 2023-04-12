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
      <section>
        <div>Login</div>
        <form onSubmit={ this.handleSubmit }>
          <input
            data-testid="email-input"
            type="text"
            placeholder="Digite seu email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            className="block bg-neutral-900 rounded p-2 text-white"
          />
          <br />
          <input
            data-testid="password-input"
            type="password"
            placeholder="Digite sua senha"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            className="block bg-neutral-900 rounded p-2 text-white"
          />

          <button
            className="bg-green-400 p-3 mt-4 rounded-lg
            shadow hover:bg-green-600 cursor-pointer text-black"
            type="submit"
            disabled={ onDisabled }
          >
            Entrar
          </button>
        </form>
      </section>
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
