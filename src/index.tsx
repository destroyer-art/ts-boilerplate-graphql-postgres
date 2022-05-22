import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import App from './App';

const generateUri = (): string => {
  return process.env.NODE_ENV === 'production'
    ? 'https://ts-auth-graphql-postgres.herokuapp.com/graphql'
    : 'http://localhost:3000/graphql';
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: generateUri(),
  credentials: 'include',
});

const ApolloApp = (AppComponent: React.FC) => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <AppComponent />
    </ApolloProvider>
  </BrowserRouter>
);

render(ApolloApp(App), document.getElementById('root') as HTMLElement);
