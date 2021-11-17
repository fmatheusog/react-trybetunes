import { React, Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loginButtonDisabled: true,
      isLogged: false,
      loading: false,
    };

    this.handleUserInputChange = this.handleUserInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInputChange = (ev) => {
    this.setState({
      name: ev.target.value,
    }, () => this.validateUserInput());
  }

  async handleSubmit() {
    const { name } = this.state;

    this.setState({
      loading: true,
    });

    const result = await createUser({ name });

    if (result === 'OK') {
      this.setState({
        isLogged: true,
      });
    }
  }

  validateUserInput = () => {
    const { name } = this.state;
    const inputMinLen = 3;

    if (name.length >= inputMinLen) {
      this.setState({
        loginButtonDisabled: false,
      });
    } else {
      this.setState({
        loginButtonDisabled: true,
      });
    }
  }

  render() {
    const { name, loginButtonDisabled, loading, isLogged } = this.state;

    return (
      <div data-testid="page-login" id="page-login">
        {loading ? <Loading /> : (
          <form>
            <input
              type="text"
              name="name"
              id="name"
              data-testid="login-name-input"
              onChange={ this.handleUserInputChange }
              value={ name }
            />
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ loginButtonDisabled }
              onClick={ this.handleSubmit }
            >
              Entrar
            </button>
          </form>
        )}
        { isLogged && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
