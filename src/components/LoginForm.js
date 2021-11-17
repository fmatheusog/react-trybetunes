import { React, Component } from 'react';
import PropTypes from 'prop-types';

class LoginForm extends Component {
  render() {
    const {
      username,
      handleUserInputChange,
      handleSubmit,
      loginButtonDisabled,
    } = this.props;

    return (
      <div>
        <input
          type="text"
          name="username"
          id="username"
          data-testid="login-name-input"
          onChange={ handleUserInputChange }
          value={ username }
        />
        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ loginButtonDisabled }
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </div>
    );
  }
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  handleUserInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loginButtonDisabled: PropTypes.bool.isRequired,
};

export default LoginForm;
