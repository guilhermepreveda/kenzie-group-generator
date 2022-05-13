import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;

  background-color: #051e32;
  color: #fff;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1024px;
  gap: 30px;

  h2 {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  button {
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 255, 0.5));

    animation: glowAnimation 2000ms infinite alternate-reverse;
  }

  @keyframes glowAnimation {
    from {
      filter: drop-shadow(0px 0px 10px rgba(0, 0, 255, 0));
    }

    to {
      filter: drop-shadow(0px 0px 10px rgba(0, 0, 255, 1));
    }
  }
`;

export const Label = styled.label`
  display: flex;
  gap: 10px;

  ${({ textarea }) => !!textarea && "flex-direction: column;"}
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

  input {
    padding: 5px;
  }

  input[type="number"] {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    display: flex;
    align-items: center;
  }

  > span {
    color: red;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const InformationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  ol {
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style-position: inside;
  }

  mark {
    font-weight: 500;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  background-color: gray;
  border-radius: 5px;
  color: #2d2d2d;
  font-weight: 500;
  min-height: 40px;
  padding: 5px;

  p {
    display: flex;
  }

  svg {
    margin-right: 5px;
  }
`;
