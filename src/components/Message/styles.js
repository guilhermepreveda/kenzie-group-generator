import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1024px;

  details {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    summary {
      font-weight: 700;
      font-size: 20px;
    }
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  padding: 15px 0;

  button {
    cursor: pointer;
    color: #2d2d2d;
    background-color: #eeeeee;
    text-transform: uppercase;
    font-weight: 600;
    padding: 8px;
    border-radius: 100px;
    max-width: 300px;

    :hover {
      background-color: #f2f2f2;
    }
  }
`;
