import { React, Component } from 'react';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      loginButtonDisabled: true,
    };
  }

  validateUserInput = () => {
    const { username } = this.state;
    const inputMinLen = 3;

    if (username.length > inputMinLen) {
      this.setState({
        loginButtonDisabled: false,
      });
    } else {
      this.setState({
        loginButtonDisabled: true,
      });
    }
  }

  handleUserInputChange = (ev) => {
    this.setState({
      username: ev.target.value,
    }, () => this.validateUserInput());
  }

  render() {
    const { username, loginButtonDisabled } = this.state;

    return (
      <div data-testid="page-login">
        Username:
        <input
          type="text"
          name="username"
          id="username"
          data-testid="login-name-input"
          onChange={ this.handleUserInputChange }
          value={ username }
        />
        <button type="submit" disabled={ loginButtonDisabled }>Entrar</button>
      </div>
    );
  }
}

export default Login;
