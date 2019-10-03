import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { parseISO } from 'date-fns';
import Loader from 'react-loader-spinner';

import api from '../../../services/api';
import history from '../../../services/history';
import { meetupValidation } from '~/util/validators';

import { Container, Wrapper, SubmitButton } from './styles';
import BannerInput from '../../../components/BannerInput';
import DatePicker from '../../../components/DatePickerInput';

export default function Update({ match }) {
  const [loading, setLoading] = useState(true);
  const [meetup, setMeetup] = useState([]);
  const { id } = match.params;

  useEffect(() => {
    async function loadMeetup() {
      try {
        const response = await api.get(`organizing/${id}`);

        const data = {
          ...response.data.meetup,
          date: parseISO(response.data.meetup.date),
        };

        setMeetup(data);
        setLoading(false);
      } catch (err) {
        toast.error(
          'Ocorreu um erro ao tentar carregar os dados, tente novamente'
        );

        history.push('/dashboard');
      }
    }

    loadMeetup();
  }, [id]);

  async function handleSubmit(data) {
    setLoading(true);

    try {
      await api.put(`/meetups/${id}`, data);

      setLoading(false);
      toast.success('Meetup atualizado com sucesso');
      history.push('/dashboard');
    } catch (err) {
      setLoading(false);
      const message = String(err.response.data.message);

      toast.error(message);
    }
  }

  return (
    <Container>
      {loading ? (
        <Wrapper>
          <Loader type="Puff" color="#FFF" height={100} />
        </Wrapper>
      ) : (
        <Form
          onSubmit={handleSubmit}
          schema={meetupValidation}
          initialData={meetup}
        >
          <BannerInput name="file_id" />

          <Input name="title" placeholder="Titulo do Meetup" />
          <Input
            name="description"
            placeholder="Descrição do Meetup"
            multiline
          />

          <DatePicker name="date" placeholder="Data do Meetup" />
          <Input name="location" placeholder="Localização do Meetup" />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? <Loader height={20} /> : 'Salvar'}
          </SubmitButton>
        </Form>
      )}
    </Container>
  );
}

Update.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
