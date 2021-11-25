import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import * as userApi from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };

    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      loading: true,
    });

    const user = await userApi.getUser();

    this.setState({
      loading: false,
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
    });
  }

  render() {
    const { loading, name, email, description, image } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <img
              data-testid="profile-image"
              src={ image }
              alt={ name }
            />
            <Link to="/profile/edit">Editar perfil</Link>
            <h3>Nome</h3>
            <span>{ name }</span>
            <h3>E-mail</h3>
            <span>{ email }</span>
            <h3>Description</h3>
            <p>{ description }</p>
          </div>
        ) }
      </div>
    );
  }
}

export default Profile;
