import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 800px;
  margin: 30px auto;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      color: #fff;
      font-size: 32px;
      font-weight: bold;

      span {
        font-size: 14px;
        font-weight: normal;
        color: #c8bd5b;
      }
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        margin-right: 8px;
        background: none;
        border: 1px solid #fff;
        border-radius: 4px;
        padding: 5px;
        color: #fff;
        font-size: 12px;

        &:hover {
          background: ${darken(0.03, '#f94d6a')};
        }
      }
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: 30px auto;
`;

export const MeetupList = styled.ul`
  margin: 40px 0 20px;
`;

export const MeetupItem = styled.li`
  width: 100%;
  margin: 10px;
  padding: 15px 50px 15px 15px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    opacity: ${props => (props.past ? 0.3 : 1)};
  }

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(0);
  }

  time {
    opacity: ${props => (props.past ? 0.3 : 1)};
  }
`;

export const NewMeetupButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 37px;
  width: 140px;
  background: #f94d6a;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.08, '#f94d6a')};
  }
`;

export const Actions = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    margin: 10px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background: #f94d6a;
    color: #fff;
    font-size: 16px;
    font-weight: bold;

    &:hover {
      background: ${darken(0.08, '#f94d6a')};
    }

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.4;
    }
  }
`;

export const NotMeetup = styled.div`
  height: 60px;
  margin: 50px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 36px;
    color: #fff;
  }
`;
