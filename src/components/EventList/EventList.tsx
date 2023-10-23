import { useLazyQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { Button, CircularProgress, Typography } from '@mui/material';
import { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { GET_INFO } from 'src/apollo/queries/getInfo.gql';
import { Event as ComingEvent } from 'src/components/Event/Event';
import { UserEvent } from 'src/domain/event';
import { Status } from 'src/domain/status';
import { mapEvents } from 'src/mapping/events.mapping';
import { EventDialogue } from '../EventDialogue/EventDialogue';
import { UserContext } from 'src/context/UserContext';
import { useSessionStorage } from 'usehooks-ts';
import { isEqual } from 'lodash';

export interface EpisodeResult {
  episodes: {
    results: {
      id: number;
      name: string;
    }[];
  };
  locations: {
    results: {
      id: number;
      name: string;
    }[];
  };
  characters: {
    results: {
      id: number;
      status: Status;
    }[];
  };
}

export const EventList: FC = () => {
  const [events, setEvents] = useSessionStorage<UserEvent[]>('events', []);
  const { signedIn } = useContext(UserContext);
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [getCharacters, { data, loading, error }] = useLazyQuery<EpisodeResult>(GET_INFO);
  const [event, setEvent] = useState<UserEvent | undefined>();

  const sanitizedData = useMemo(() => mapEvents(data), [data]);

  const handleUpdateEvent = (eventToUpdate: UserEvent) => {
    setEvent(eventToUpdate);
    setDialogueOpen(true);
  };

  const handleCreateNewEvent = () => {
    setDialogueOpen(true);
    setEvent(undefined);
  };

  useEffect(() => {
    if (!data) {
      getCharacters();
    }
  }, [data, getCharacters]);

  useEffect(() => {
    setEvents(sanitizedData);
  }, [sanitizedData, setEvents]);

  if (!sanitizedData && !events.length) {
    return <span>No events found.</span>;
  }

  return (
    <>
      <EventDialogue show={dialogueOpen} event={event} onCloseDialogue={() => setDialogueOpen(false)} />
      <TitleWrapper>
        <Typography variant="h4" component="h2" color={'#D7965A'} fontWeight={'bold'}>
          Upcoming Events
        </Typography>
        {signedIn && (
          <Button variant="contained" onClick={handleCreateNewEvent}>
            Create New Event
          </Button>
        )}
      </TitleWrapper>
      {loading ? (
        <Wrapper>
          <CircularProgress />
        </Wrapper>
      ) : (
        <>
          {events.map((ep) => (
            <ComingEvent key={ep.id} event={ep} onUpdateEvent={handleUpdateEvent} />
          ))}
        </>
      )}
    </>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
