import React from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';

import { signInValidation } from '~/util/validators';
import { signInRequest } from '../../store/modules/auth/actions';

import { SubmitButton } from '../_layouts/auth/styles';
import logo from '../../assets/images/logo.svg';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Meetapp" />

      <Form schema={signInValidation} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <SubmitButton loading={loading}>
          {loading ? (
            <Loader type="Puff" color="#FFF" height={24} width={24} />
          ) : (
            'Entrar'
          )}
        </SubmitButton>
        <Link to="/register">Criar conta grátis</Link>
      </Form>
    </>
  );
}
