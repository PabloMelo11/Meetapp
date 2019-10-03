import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { meetupValidation } from '~/util/validators';
import { SubmitButton } from '../../_layouts/auth/styles';
import BannerInput from '../../../components/BannerInput';
import DatePickerInput from '../../../components/DatePickerInput';

import { Container } from './styles';

export default function Create() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);

    try {
      await api.post('meetups', data);

      setLoading(false);

      toast.success('Meetup criado com sucesso');

      history.push('/dashboard');
    } catch (err) {
      setLoading(false);
      toast.error('Ocorreu um erro ao tentar criar o meetup, tente novamente');
    }
  }

  return (
    <Container>
      <Form schema={meetupValidation} onSubmit={handleSubmit}>
        <BannerInput name="file_id" />
        <Input name="title" placeholder="Título do Meetup" />
        <Input name="description" placeholder="Descrição do Meetup" multiline />
        <DatePickerInput name="date" placeholder="Data do Meetup" />
        <Input name="location" placeholder="Localização" />

        <SubmitButton loading={loading}>
          {loading ? (
            <Loader type="Puff" color="#FFF" height={24} width={24} />
          ) : (
            'Criar'
          )}
        </SubmitButton>
      </Form>
    </Container>
  );
}
