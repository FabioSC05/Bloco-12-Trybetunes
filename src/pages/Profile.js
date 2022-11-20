import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../css/Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
    };
  }

  async componentDidMount() {
    this.mounted = true;
    const result = await getUser();
    if (this.mounted) {
      this.setState({
        user: result,
        loading: false,
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { loading, user } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile-container">
          <p>{ user.name }</p>
          <p>{ user.email }</p>
          <p>{ user.description }</p>
          <img
            src={ user.image }
            alt={ user.name }
            className="profile-image"
            data-testid="profile-image"
          />
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </div>
    );
  }
}

export default Profile;
