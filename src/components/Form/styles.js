import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  background-color: #051e32;
  color: white;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1024px;
  gap: 30px;
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

  p {
    display: flex;
    align-items: center;
  }

  > span {
    color: red;
    font-size: 13px;
  }
`;

export const InformationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  ol {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  mark {
    font-weight: 500;
  }
`;
