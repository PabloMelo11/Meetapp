import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';

import { formatDateWithHour, isDone } from '~/util/dateUtils';
import api from '~/services/api';

import {
  Container,
  NewMeetupButton,
  MeetupList,
  MeetupItem,
  Wrapper,
  NotMeetup,
  Actions,
} from './styles';

const per_page = 7;

export default function Meetup() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalMeetups, setTotalMeetups] = useState(0);

  const totalPages = useMemo(() => totalMeetups / per_page, [totalMeetups]);

  useEffect(() => {
    async function loadMeetups() {
      try {
        const response = await api.get('organizing', {
          params: {
            per_page,
            page,
          },
        });

        const data = response.data.map(meetup => {
          return {
            ...meetup,
            formattedDate: formatDateWithHour(meetup.date),
            past: isDone(meetup.date),
          };
        });

        setTotalMeetups(data.count);
        setMeetups(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error('Não foi possivel carregar os Meetups');
      }
    }

    loadMeetups();
  }, [page, totalPages]);

  function handlePage(action) {
    const newPage = action === 'back' ? page - 1 : page + 1;
    setPage(newPage);
  }

  return (
    <Container>
      {loading && (
        <Wrapper>
          <Loader type="Puff" color="#FFF" height={100} />
        </Wrapper>
      )}

      {!loading && (
        <header>
          <NewMeetupButton to="/meetup">Novo meetup</NewMeetupButton>
        </header>
      )}

      {!loading ? (
        <MeetupList>
          {meetups.map(meetup => (
            <MeetupItem key={meetup.id} done={meetup.done}>
              <Link to={`/meetup/${meetup.id}`}>{meetup.title}</Link>
              <time>{meetup.formattedDate}</time>
            </MeetupItem>
          ))}
        </MeetupList>
      ) : (
        <NotMeetup>Você ainda não tem meetups cadastrados</NotMeetup>
      )}

      {totalPages !== 0 && (
        <Actions>
          <button
            type="button"
            onClick={() => handlePage('next')}
            disabled={meetups.length === 0}
          >
            Próximo
          </button>
          <button
            type="button"
            onClick={() => handlePage('back')}
            disabled={page < 2}
          >
            Anterior
          </button>
        </Actions>
      )}
    </Container>
  );
}
