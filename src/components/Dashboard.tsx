import * as React from 'react';
import { useMutation } from '@apollo/client';
import { useAuth } from '../hooks/useAuth';
import { SIGN_OUT_USER } from '../graphql/mutations';
import styles from '../styles/dashboard.scss';

export const Dashboard = (): JSX.Element => {
  const auth = useAuth();
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (auth?.isFetched && auth?.isAuthenticated) {
      setIsLoaded(true);
    } else if (auth?.isFetched && !auth?.isAuthenticated) {
      window.location.href = '/';
    }
  }, [auth]);

  const [signOutUser] = useMutation(SIGN_OUT_USER, {
    onCompleted: () => {
      window.location.href = '/';
    },
  });

  return (
    <div className={styles.container}>
      {!isLoaded && null}
      {isLoaded && (
        <>
          <h2 className={styles.authenticated}>AUTHENTICATED</h2>
          <button onClick={() => signOutUser()} className={styles.btn} type='submit'>
            SIGN OUT
          </button>
        </>
      )}
    </div>
  );
};
