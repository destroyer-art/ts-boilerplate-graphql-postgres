import * as React from 'react';
import { useLazyQuery } from '@apollo/client';
import styles from '../styles/form.scss';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { GET_USER_BY_EMAIL } from '../graphql/queries';

const SignIn = React.lazy(async () => ({
  default: (await import('./SignIn')).SignIn,
}));

const CreateAccount = React.lazy(async () => ({
  default: (await import('./CreateAccount')).CreateAccount,
}));

interface InitialState {
  email: string;
}

export const EnterEmail = (): JSX.Element => {
  const initialState: InitialState = {
    email: '',
  };
  const auth = useAuth();
  const [view, setView] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [errorMsg, setError] = React.useState<string>('');
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (auth.isFetched && auth.isAuthenticated) {
      window.location.href = '/dashboard';
    } else if (auth.isFetched) {
      setIsLoaded(true);
    }
  }, [auth]);

  const { onChange, onSubmit, formData } = useForm(onFormSubmit, initialState);
  const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL, {
    onCompleted: res => {
      const { getUserByEmail: user } = res;
      if (!user) {
        setView('create-account');
      } else {
        setView('sign-in');
      }
    },
    onError: err => {
      console.log('get user by email error', err);
    },
  });

  function onFormSubmit(error: string | null) {
    if (error) {
      setError(error);
    } else {
      setError('');
      const email = (formData as any).email;
      setEmail(email);
      getUserByEmail({ variables: { email } });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputWrap}>
        {view === 'create-account' && <CreateAccount email={email} />}
        {view === 'sign-in' && <SignIn email={email} />}
        {errorMsg && (
          <div className={styles.errorContainer}>
            <p>{errorMsg}</p>
          </div>
        )}
        {!view && !!isLoaded && (
          <>
            {!errorMsg && <h2 className={styles.message}>ENTER EMAIL</h2>}
            <form onSubmit={onSubmit} name='email' noValidate>
              <div>
                <input
                  className={styles.inputField}
                  name='email'
                  type='email'
                  placeholder='Enter Email'
                  onChange={onChange}
                  autoComplete={'email'}
                  required
                />
              </div>
              <button className={styles.btn} type='submit'>
                CONTINUE
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
