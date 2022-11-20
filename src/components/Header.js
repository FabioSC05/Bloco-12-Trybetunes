import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import '../css/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
  }

  componentDidMount() {
    this.callUser();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  callUser = async () => {
    this.mounted = true;
    const user = await getUser();
    if (this.mounted) {
      this.setState({ loading: false, name: user.name });
    }
  };

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component" className="login-header">
        <section className="login-links">
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </section>
        {
          loading
            ? <Loading />
            : <p data-testid="header-user-name" className="login-name">{ name }</p>
        }
      </header>
    );
  }
}

export default Header;
