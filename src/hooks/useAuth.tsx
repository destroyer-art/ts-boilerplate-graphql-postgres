import * as React from 'react';
import { useQuery } from '@apollo/client';
import { IS_AUTHENTICATED } from '../graphql/queries';

type Props = {
  children: React.ReactNode;
};

interface User {
  isFetched: boolean;
  isAuthenticated: boolean;
}

interface AuthContext {
  isFetched: boolean;
  isAuthenticated: boolean;
}

const defaultState = {
  isFetched: false,
  isAuthenticated: false,
};

const authContext = React.createContext<AuthContext>(defaultState);

export function ProvideAuth({ children }: Props) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return React.useContext(authContext);
};

function useProvideAuth(): User {
  const [user, setUser] = React.useState<User>(defaultState);
  const { error, data } = useQuery(IS_AUTHENTICATED);

  React.useEffect(() => {
    if (data?.isAuthenticated?.status === 200) {
      setUser({
        isFetched: true,
        isAuthenticated: true,
      });
    } else if (data?.isAuthenticated.status === 401) {
      setUser({
        isFetched: true,
        isAuthenticated: false,
      });
    }
  }, [error, data]);

  return {
    ...user,
  };
}
