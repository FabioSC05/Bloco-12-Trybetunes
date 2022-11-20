import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import '../css/ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
      name: '',
      email: '',
      image: '',
      description: '',
      redirect: false,
      disable: true,
    };
  }

  async componentDidMount() {
    this.mounted = true;
    const result = await getUser();
    if (this.mounted) {
      this.setState({
        user: result,
        loading: false,
      }, () => {
        const { user } = this.state;
        this.setState({
          name: user.name,
          email: user.email,
          image: user.image,
          description: user.description,
        }, () => {
          this.buttonCheck();
        });
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  buttonCheck = () => {
    const { name, email, image, description } = this.state;
    const varName = name.length === 0;
    const varEmail = email.length === 0;
    const at = email.includes('@');
    const dotCom = email.includes('.com');
    const varImage = image.length === 0;
    const varDescription = description.length === 0;
    if (varName || varEmail || varImage || varDescription || !at || !dotCom) {
      this.setState({
        disable: true,
      });
    } else {
      this.setState({
        disable: false,
      });
    }
  };

  saveName = ({ target }) => {
    const { value } = target;
    this.setState({
      name: value,
    }, () => {
      this.buttonCheck();
    });
  };

  saveEmail = ({ target }) => {
    const { value } = target;
    this.setState({
      email: value,
    }, () => {
      this.buttonCheck();
    });
  };

  saveImage = ({ target }) => {
    const { value } = target;
    this.setState({
      image: value,
    }, () => {
      this.buttonCheck();
    });
  };

  saveDescription = ({ target }) => {
    const { value } = target;
    this.setState({
      description: value,
    }, () => {
      this.buttonCheck();
    });
  };

  saveInfo = () => {
    const { name, email, image, description } = this.state;
    const object = {
      name,
      email,
      image,
      description,
    };
    this.setState({ loading: true }, async () => {
      this.mounted = true;
      await updateUser(object);
      if (this.mounted) {
        this.setState({ loading: false }, () => {
          this.setState({ redirect: true });
        });
      }
    });
  };

  render() {
    const { loading, name, email, image, description, disable, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/profile" />;
    }
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <form className="edit-form">
          <input
            type="text"
            data-testid="edit-input-name"
            value={ name }
            placeholder="Nome"
            onChange={ this.saveName }
          />

          <input
            type="email"
            data-testid="edit-input-email"
            value={ email }
            placeholder="E-mail"
            onChange={ this.saveEmail }
          />

          <textarea
            data-testid="edit-input-description"
            value={ description }
            placeholder="Descrição"
            onChange={ this.saveDescription }
          />

          <input
            type="text"
            data-testid="edit-input-image"
            value={ image }
            placeholder="Imagem"
            onChange={ this.saveImage }
          />

          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ disable }
            onClick={ this.saveInfo }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
