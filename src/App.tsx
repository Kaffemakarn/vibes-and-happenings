import './App.css';
import { Home } from 'src/components/views/Home/Home';
import { CustomThemeProvider } from './Theme';
import { FC } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import 'src/extensions/string.extensions';
import { UserContextProvider } from './context/UserContext';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <UserContextProvider>
        <CustomThemeProvider>
          <Home />
        </CustomThemeProvider>
      </UserContextProvider>
    </ApolloProvider>
  );
};

export default App;
