import styled from '@emotion/styled';
import { LocationOnOutlined } from '@mui/icons-material';
import {
  Button,
  Collapse,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FC, useEffect, useMemo, useState } from 'react';
import { UserEvent } from 'src/domain/event';
import { isNumber, sortBy } from 'lodash';
import { Theme } from 'src/domain/theme';
import dayjs from 'dayjs';
import { useSessionStorage } from 'usehooks-ts';
import { faker } from '@faker-js/faker';
import { formatDate } from 'src/utils/formatDate';

interface Props {
  show: boolean;
  event: UserEvent | undefined;
  onCloseDialogue: () => void;
}
export const EventDialogue: FC<Props> = ({ show, event, onCloseDialogue }) => {
  const [events, setEvents] = useSessionStorage<UserEvent[]>('events', []);

  const today = useMemo(() => new Date(), []);
  const tomorrow = useMemo(() => new Date(today.getTime() + 24 * 60 * 60 * 1000), [today]);

  const [dialogueOpen, setDialogueOpen] = useState<boolean>(show ?? false);
  const [name, setName] = useState(event?.name ?? '');
  const [location, setLocation] = useState(event?.location ?? '');
  const [price, setPrice] = useState(event?.price);
  const [theme, setTheme] = useState(event?.theme ?? Theme.SOCIAL);
  const [startDate, setStartDate] = useState<Date | undefined>(event?.startDate.date ? event?.startDate.date : today);
  const [endDate, setEndDate] = useState<Date | undefined>(event?.endDate.date ? event?.endDate.date : tomorrow);

  const [nameMissing, setNameMissing] = useState(false);
  const [locationMissing, setLocationMissing] = useState(false);
  const [priceMissing, setPriceMissing] = useState(false);

  const canSave = name && location && theme && startDate && endDate && price;

  const resetEvent = () => {
    setName('');
    setLocation('');
    setPrice(undefined);
    setTheme(Theme.SOCIAL);
    setStartDate(undefined);
    setEndDate(undefined);
    setPriceMissing(false);
    setLocationMissing(false);
    setNameMissing(false);
  };

  const closeDialogue = () => {
    setDialogueOpen(false);
    resetEvent();
    onCloseDialogue();
  };

  const handleCancel = () => {
    closeDialogue();
  };

  const handleSaveEvent = () => {
    const updatedEvent = {
      id: event?.id ?? faker.number.int(),
      name,
      price: price ?? 0,
      endDate: formatDate(endDate ?? tomorrow),
      location,
      startDate: formatDate(startDate ?? today),
      theme,
    };
    const updatedEvents = [...events];

    if (event && event.id) {
      const index = updatedEvents.findIndex((e) => e.id === event.id);
      updatedEvents[index] = updatedEvent;
    } else {
      updatedEvents.push(updatedEvent);
    }

    setEvents(sortBy(updatedEvents, (e) => e.startDate.date));
    closeDialogue();
  };

  useEffect(() => {
    if (show) setDialogueOpen(show);

    setName(event?.name ?? '');
    setLocation(event?.location ?? '');
    setPrice(event?.price);
    setTheme(event?.theme ?? Theme.SOCIAL);
    setStartDate(event?.startDate.date);
    setEndDate(event?.endDate.date);
  }, [event, show]);

  return (
    <Collapse in={dialogueOpen}>
      <Wrapper>
        <Typography variant="h5" component={'h3'} fontWeight={'bold'} color={'#D7965A'}>
          {event ? 'Update event' : 'Create new event'}
        </Typography>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'flex-end' }}>
          <TextField
            variant="outlined"
            value={name}
            style={{ width: '50%' }}
            error={nameMissing}
            onBlur={() => {
              if (!name) setNameMissing(true);
              else setNameMissing(false);
            }}
            label={nameMissing ? 'Missing' : ''}
            InputProps={{
              startAdornment: <InputAdornment position="start">Name</InputAdornment>,
            }}
            onChange={(e) => {
              const value = e.target.value;
              setName(value);
            }}
          />
          <TextField
            variant="outlined"
            value={price}
            sx={{ width: '150px' }}
            error={priceMissing}
            label={priceMissing ? 'Missing' : ''}
            onBlur={() => {
              if (!price) setPriceMissing(true);
              else setPriceMissing(false);
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$ Price</InputAdornment>,
            }}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (isNumber(value)) setPrice(value);
            }}
          />
        </FormControl>
        <Typography variant="h6" component={'h4'} fontWeight={'bold'} color={'#787C8D'}>
          Event date
        </Typography>
        <DateWrapper>
          <DateLabel>Starts:</DateLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={dayjs(startDate ?? today)} onChange={(e) => setStartDate(e?.toDate())} />
            <TimePicker
              label="Start time"
              value={dayjs(startDate ?? today)}
              format="hh:mm"
              onChange={(e) => setStartDate(e?.toDate())}
            />
          </LocalizationProvider>
        </DateWrapper>
        <DateWrapper>
          <DateLabel>Ends:</DateLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={dayjs(endDate ?? tomorrow)} onChange={(e) => setStartDate(e?.toDate())} />
            <TimePicker
              label="End time"
              value={dayjs(endDate ?? tomorrow)}
              format="hh:mm"
              onChange={(e) => setEndDate(e?.toDate())}
            />
          </LocalizationProvider>
        </DateWrapper>
        <Typography variant="h6" component={'h4'} fontWeight={'bold'} color={'#787C8D'}>
          Location & theme
        </Typography>
        <LocationWrapper>
          <LocationOnOutlined fontSize="large" sx={{ width: '50px', color: '#333' }} />
          <TextField
            variant="outlined"
            placeholder="Event location"
            label={locationMissing ? 'Missing' : ''}
            value={location}
            error={locationMissing}
            onBlur={() => {
              if (!location) setLocationMissing(true);
              else setLocationMissing(false);
            }}
            style={{ width: '200px' }}
            onChange={(e) => {
              const value = e.target.value;
              if (value) setLocation(value);
            }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="theme-select">Theme</InputLabel>
            <Select
              labelId="theme-select"
              value={theme}
              autoWidth
              label="Theme"
              onChange={(e) => {
                const value = e.target.value as Theme;
                if (value) setTheme(value);
              }}
            >
              <MenuItem value={Theme.EDUCATIONAL}>Educational</MenuItem>
              <MenuItem value={Theme.SOCIAL}>Social</MenuItem>
            </Select>
          </FormControl>
        </LocationWrapper>
        <ButtonWrapper>
          <StyledButton variant="outlined" onClick={handleCancel}>
            Cancel
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={() => {
              if (!name) setNameMissing(true);
              if (!price) setPriceMissing(true);
              if (!location) setLocationMissing(true);

              if (canSave) handleSaveEvent();
            }}
          >
            Save event
          </StyledButton>
        </ButtonWrapper>
      </Wrapper>
    </Collapse>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f9f9fb;
  border: 1px solid #f5f5f5;
  border-radius: 3px;
  padding: 25px;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 15px;
`;

const DateLabel = styled.span`
  width: 50px;
`;

const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  height: 36px;
  width: fit-content;
`;
