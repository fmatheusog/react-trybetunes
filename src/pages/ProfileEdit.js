import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import * as userApi from '../services/userAPI';

export default function ProfileEdit() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    const user = await userApi.getUser();
    setName(user.name);
    setEmail(user.email);
    setDescription(user.description);
    setImage(user.image);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    await userApi.updateUser({
      name,
      email,
      description,
      image,
    });
    setLoading(false);
    setRedirect(true);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const isValid = [name, email, description, image].every((input) => input !== '');

    if (isValid === true) setIsDisabled(false);
    else setIsDisabled(true);
  }, [name, email, description, image]);

  return (
    <>
      {redirect && <Redirect to="/profile" />}
      {loading ? <Loading /> : (
        <div data-testid="page-profile-edit">
          <Header />
          <input
            data-testid="edit-input-name"
            type="text"
            id="name"
            onChange={ handleNameChange }
            value={ name }
          />
          <input
            data-testid="edit-input-email"
            type="text"
            id="email"
            onChange={ handleEmailChange }
            value={ email }
          />
          <input
            data-testid="edit-input-description"
            type="text"
            id="description"
            onChange={ handleDescriptionChange }
            value={ description }
          />
          <input
            data-testid="edit-input-image"
            type="text"
            id="image"
            onChange={ handleImageChange }
            value={ image }
          />
          <button
            data-testid="edit-button-save"
            disabled={ isDisabled }
            type="submit"
            onClick={ handleSubmit }
          >
            Salvar
          </button>
        </div>
      )}
    </>
  );
}
