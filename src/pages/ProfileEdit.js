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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div data-testid="page-profile-edit">
      {redirect && <Redirect to="/profile" />}
      {loading ? <Loading /> : (
        <>
          <Header />
          <form data-testid="profile-edit">
            <input
              data-testid="edit-input-name"
              type="text"
              id="name"
              onChange={ (e) => setName(e.target.value) }
              value={ name }
            />
            <input
              data-testid="edit-input-email"
              type="text"
              id="email"
              onChange={ (e) => setEmail(e.target.value) }
              value={ email }
            />
            <input
              data-testid="edit-input-description"
              type="text"
              id="description"
              onChange={ (e) => setDescription(e.target.value) }
              value={ description }
            />
            <input
              data-testid="edit-input-image"
              type="text"
              id="image"
              onChange={ (e) => setImage(e.target.value) }
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
          </form>
        </>
      )}
    </div>
  );
}
