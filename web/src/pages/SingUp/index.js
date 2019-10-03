import React from 'react';
import Loader from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import { SubmitButton } from '../_layouts/auth/styles';

import { signUpValidation } from '~/util/validators';
import { signUpRequest } from '../../store/modules/auth/actions';

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }
  const loading = useSelector(state => state.auth.loading);

  return (
    <>
      <img src={logo} alt="Meetapp" />

      <Form schema={signUpValidation} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <SubmitButton loading={loading}>
          {loading ? (
            <Loader type="Puff" color="#FFF" height={24} width={24} />
          ) : (
            'Criar conta'
          )}
        </SubmitButton>
        <Link to="/">Já tenho Login</Link>
      </Form>
    </>
  );
}
