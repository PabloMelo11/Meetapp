import styled from 'styled-components/native';

import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${colors.textDefault};
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
`;
