import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disabledButton: true,
      loading: false,
      createUserState: false,
    };
    this.insertUser = this.insertUser.bind(this);
    this.ableBtn = this.ableBtn.bind(this);
  }

  ableBtn({ target }) {
    const enabled = (target.value.length > 2);
    this.setState({
      name: target.value,
      disabledButton: !enabled,
    });
  }

  async insertUser() {
    this.setState({
      loading: true,
    });
    const { name } = this.state;
    await createUser({ name });
    this.setState({
      createUserState: true,
    });
  }

  render() {
    const { disabledButton, loading, createUserState } = this.state;
    return (
      <div data-testid="page-login">
        Login
        {createUserState && <Redirect to="/search" />}
        {loading && <Loading />}
        <form onSubmit={ this.insertUser }>
          <label htmlFor="name">
            <input
              type="text"
              data-testid="login-name-input"
              id="name"
              onChange={ this.ableBtn }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ disabledButton }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
