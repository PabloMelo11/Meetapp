import React from 'react';
import PropTypes from 'prop-types';

import Background from '~/components/Background';

import { Container, Text } from './styles';

export default function EmptyList({ children }) {
  return (
    <Background>
      <Container>
        <Text>{children}</Text>
      </Container>
    </Background>
  );
}

EmptyList.propTypes = {
  children: PropTypes.string.isRequired,
};
