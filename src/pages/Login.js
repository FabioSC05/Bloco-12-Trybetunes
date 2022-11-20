import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../css/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: true,
      name: '',
      loading: false,
      redirect: false,
    };
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  clickFunc = () => {
    const { name } = this.state;
    this.setState({ loading: true }, async () => {
      this.mounted = true;
      await createUser({ name });
      if (this.mounted) {
        this.setState({
          redirect: true,
        });
      }
    });
  };

  saveInfo = ({ target }) => {
    const { value } = target;
    const number3 = 3;
    const result = value.length >= number3;
    this.setState({
      disable: !result,
      name: value,
    });
  };

  render() {
    const { disable, loading, redirect } = this.state;
    if (redirect && loading) {
      return <Redirect to="/search" />;
    }
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login" className="login-container">
        <p className="login-title">Trybetunes</p>
        <form className="login-form">
          <input
            type="text"
            className="login-input"
            data-testid="login-name-input"
            placeholder="Digite seu nome"
            onChange={ this.saveInfo }
          />
          <button
            type="button"
            className="login-button"
            disabled={ disable }
            onClick={ this.clickFunc }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
