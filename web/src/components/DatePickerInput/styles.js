import styled from 'styled-components';
import DataPicker from 'react-datepicker';

export const DatapickerStyle = styled(DataPicker)`
  border: none;
  background: rgba(0, 0, 0, 0.2);
  width: 800px;
  height: 44px;
  border-radius: 4px;
  font-family: 'Roboto';
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  padding: 0 25px;

  &::placeholder {
    font-family: 'Roboto';
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }
`;
