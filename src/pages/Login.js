import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getToken } from '../services/fetchToken';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateBtnLogin);
  };

  validateBtnLogin = () => {
    const { name, email } = this.state;
    const validName = /^.{3,}$/;
    const validEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (validEmail.test(email) && validName.test(name)) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  startGame = async () => {
    const { history } = this.props;
    await getToken();
    history.push('/game');
  };

  render() {
    const { name, email, isDisabled } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="name">
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              id="name"
              value={ name }
              placeholder="Digite seu nome"
              onChange={ this.onInputChange }
            />
          </label>

          <label htmlFor="email">
            <input
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              value={ email }
              placeholder="Digite seu e-mail"
              onChange={ this.onInputChange }
            />
          </label>

          <button
            data-testid="btn-play"
            type="button"
            disabled={ isDisabled }
            onClick={ this.startGame }
          >
            Play
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
