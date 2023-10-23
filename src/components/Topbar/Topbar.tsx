import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { FC, useContext } from 'react';
import logo from 'src/assets/img/V&H.svg';
import { UserContext } from 'src/context/UserContext';

export const Topbar: FC = () => {
  const { setSignedIn, signedIn } = useContext(UserContext);
  const handleSignIn = () => {
    setSignedIn(true);
  };
  const handleSignOut = () => {
    setSignedIn(false);
  };
  return (
    <Wrapper>
      <Logo src={logo} />
      {!signedIn ? (
        <Button variant="contained" onClick={handleSignIn}>
          Sign in
        </Button>
      ) : (
        <UserActions>
          <span>Hello, [username].</span>
          <Button variant="contained" onClick={handleSignOut}>
            Sign out
          </Button>
        </UserActions>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  cursor: pointer;
`;

const UserActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  justify-content: center;
  align-items: center;
`;
