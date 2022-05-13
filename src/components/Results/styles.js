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
  gap: 30px;

  summary {
    font-weight: 700;
    font-size: 20px;
  }
`;

export const GroupCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 15px 0;
`;

export const GroupCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
