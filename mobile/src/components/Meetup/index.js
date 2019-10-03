import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { formatDateWithHour } from '~/util/dateUtils';

import Button from '~/components/Button';
import { Container, Banner, Info, Title, InfoRow, InfoText } from './styles';

export default function Meetup({ data, handleSubmit }) {
  const dateParsed = useMemo(() => formatDateWithHour(data.date), [data.date]);

  return (
    <Container>
      <Banner source={{ uri: data.file && data.file.url }} />
      <Info>
        <Title>{data.title}</Title>
        <InfoRow>
          <Icon name="event" size={15} color="#999" />
          <InfoText>Data: {dateParsed}</InfoText>
        </InfoRow>
        <InfoRow>
          <Icon name="location-on" size={15} color="#999" />
          <InfoText>Localização: {data.location}</InfoText>
        </InfoRow>
        <InfoRow last={!data.past}>
          <Icon name="person" size={15} color="#999" />
          <InfoText>Organizado por: {data.User.name}</InfoText>
        </InfoRow>

        <Button onPress={handleSubmit}>Inscreva-se</Button>
      </Info>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    past: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
    file: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    User: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func,
};

Meetup.defaultProps = {
  handleSubmit: null,
};
