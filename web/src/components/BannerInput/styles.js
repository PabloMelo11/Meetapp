import styled from 'styled-components';

export const Container = styled.div`
  align-self: stretch;
  margin-bottom: 5px;

  label {
    display: block;
    position: relative;
    cursor: pointer;
    width: 100%;
    height: 100%;
    padding-top: 38%;
    background: rgba(0, 0, 0, 0.05);
    transition: background 0.3s;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 10px;

    &:hover {
      background: rgba(0, 0, 0, 0.085);
    }

    img {
      display: block;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }

    input {
      display: none;
    }
  }
`;

export const IconPhoto = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
