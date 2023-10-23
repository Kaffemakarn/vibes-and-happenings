import { Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import styled from '@emotion/styled';
import { FC, useContext } from 'react';
import { FilterContext } from 'src/context/FilterContext';
import { DatePicker } from '@mui/x-date-pickers';

export const Searchbar: FC = () => {
  const { name, date, setDate, setName } = useContext(FilterContext);
  return (
    <Wrapper>
      <Search id="outlined-basic" variant="outlined" placeholder="Looking for..." />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledDatePicker />
      </LocalizationProvider>
      <StyledButton variant="contained">Search</StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  padding: 15px 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: fit-content;
  border-radius: 10px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 170px;
  input,
  div {
    height: 36px;
    align-items: center;
  }
`;

const Search = styled(TextField)`
  width: 250px;
  input,
  div {
    height: 36px;
  }
`;

const StyledButton = styled(Button)`
  height: 36px;
`;
