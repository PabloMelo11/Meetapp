import styled, { css, keyframes } from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-180deg, #22202c, #402845);
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #f94d6a;
      font-weight: bold;
      border: 0;
      color: #fff;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#f94d6a')};
      }
    }

    a {
      color: #fff;
      font-size: 16px;
      margin-top: 15px;
      opacity: 0.8;
    }
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  margin: 5px 0 0;
  height: 44px;
  background: #f94d6a;
  font-weight: bold;
  border: 0;
  color: #fff;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;
  &:hover {
    background: ${darken(0.03, '#f94d6a')};
  }
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
