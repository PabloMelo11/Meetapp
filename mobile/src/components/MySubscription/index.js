import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';

import { formatDateWithHour } from '~/util/dateUtils';

import {
  Container,
  Banner,
  Info,
  InfoRow,
  Title,
  Time,
  Location,
  Organizer,
} from './styles';

export default function MySubscription({ data, handleCancel }) {
  const dateParsed = useMemo(() => formatDateWithHour(data.Meetup.date), [
    data.Meetup.date,
  ]);

  return (
    <Container>
      <Banner
        source={{
          uri: data.Meetup.file
            ? data.Meetup.file.url
            : `https://api.adorable.io/avatars/50/${data.Meetup.User.name}.png`,
        }}
      />

      <Info>
        <Title>{data.Meetup.title}</Title>
        <InfoRow>
          <Icon name="event" size={16} color="#999" />
          <Time>Data: {dateParsed}</Time>
        </InfoRow>
        <InfoRow>
          <Icon name="location-on" size={16} color="#999" />
          <Location>Localização: {data.Meetup.location}</Location>
        </InfoRow>
        <InfoRow last={!data.Meetup.past}>
          <Icon name="person" size={16} color="#999" />
          <Organizer>Organizador: {data.Meetup.User.name}</Organizer>
        </InfoRow>

        <Button onPress={handleCancel}>Cancelar inscrição</Button>
      </Info>
    </Container>
  );
}

MySubscription.propTypes = {
  data: PropTypes.shape({
    Meetup: PropTypes.shape({
      title: PropTypes.string.isRequired,
      past: PropTypes.bool,
      date: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      User: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      file: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
    }),
  }).isRequired,
  handleCancel: PropTypes.func.isRequired,
};
