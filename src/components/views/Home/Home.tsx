import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { FC } from 'react';
import { Banner } from 'src/components/Banner/Banner';
import { Topbar } from 'src/components/Topbar/Topbar';
import { EventList } from 'src/components/EventList/EventList';

export const Home: FC = () => {
  return (
    <StyledContainer>
      <Topbar />
      <Banner />
      <EventList />
    </StyledContainer>
  );
};

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  padding: 50px 100px !important;
  gap: 20px;
`;
