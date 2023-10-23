import styled from '@emotion/styled';
import { FC, useContext } from 'react';
import { Button, Typography } from '@mui/material';
import { CalendarMonthOutlined, LocationOnOutlined } from '@mui/icons-material';
import { UserEvent } from 'src/domain/event';
import { UserContext } from 'src/context/UserContext';
import { useSessionStorage } from 'usehooks-ts';
import { sortBy } from 'lodash';

interface Props {
  event: UserEvent;
  onUpdateEvent: (event: UserEvent) => void;
}

export const Event: FC<Props> = ({ event, onUpdateEvent }) => {
  const { signedIn } = useContext(UserContext);
  const [events, setEvents] = useSessionStorage<UserEvent[]>('events', []);

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter((e) => e.id !== event.id);

    setEvents(sortBy(updatedEvents, (e) => e.startDate.date));
  };

  return (
    <Wrapper>
      <div style={{ display: 'flex', gap: '10px' }}>
        <DateWrapper>
          <span>{event.startDate.month}</span>
          <span>{event.startDate.day}</span>
        </DateWrapper>
        <InfoWrapper>
          <TitleWrapper>
            <Typography variant="h5" component={'h3'} fontWeight={'bold'} color={'#D7965A'}>
              {event.name}
            </Typography>
            {signedIn && (
              <>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (event) onUpdateEvent(event);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    if (event) handleDeleteEvent();
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </TitleWrapper>
          <ThemeSpan>Theme: {event.theme}</ThemeSpan>
          <Centered>
            <CalendarMonthOutlined fontSize="small" />{' '}
            {`${event.startDate.dateString.toUpperCaseLetters()} - ${event.endDate.dateString.toUpperCaseLetters()}`}
          </Centered>
          <Centered>
            <LocationOnOutlined fontSize="small" />
            {event.location}
          </Centered>
        </InfoWrapper>
      </div>
      <PriceWrapper>Price: {event.price > 0 ? `${event.price} kr` : 'Free'}</PriceWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9fb;
  border: 1px solid #f5f5f5;
  border-radius: 3px;
  padding: 25px;
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Centered = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ThemeSpan = styled.span`
  color: #787c8d;
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 6px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

const PriceWrapper = styled.div`
  justify-self: flex-end;
  color: #d7965a;
  font-weight: bold;
  font-size: 18px;
`;
