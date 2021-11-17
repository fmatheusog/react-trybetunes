import { React, Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { createUser } from '../services/userAPI';

import LoginForm from '../components/LoginForm';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      loginButtonDisabled: true,
      isLogged: false,
    };

    this.handleUserInputChange = this.handleUserInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit = async () => {
    this.setState({
      isLogged: true,
    });
  }

  render() {
    const { username, loginButtonDisabled, isLogged } = this.state;
    const props = {
      username,
      handleSubmit: this.handleSubmit,
      handleUserInputChange: this.handleUserInputChange,
      loginButtonDisabled,
    };

    return (
      <div data-testid="page-login" id="page-login">
        {
          isLogged
            ? <Redirect to="/search" />
            : <LoginForm { ...props } />
        }
      </div>
    );
  }
}

export default Login;
