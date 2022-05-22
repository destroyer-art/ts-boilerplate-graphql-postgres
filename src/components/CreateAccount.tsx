import * as React from 'react';
import { useMutation } from '@apollo/client';
import styles from '../styles/form.scss';
import { useForm } from '../hooks/useForm';
import { CREATE_USER } from '../graphql/mutations';

const PASSWORD_REQS_ =
  'Password must contain a minimum of 8 characters, a lowercase letter, an uppercase letter and a number';
const FALLBACK_ERROR = 'An error occurred, try again.';

interface Props {
  email: string;
}

interface InitialState {
  email: string;
  password: string;
}

export const CreateAccount = ({ email }: Props): JSX.Element => {
  const initialState: InitialState = {
    email,
    password: '',
  };
  const [errorMsg, setError] = React.useState<string>('');
  const { onChange, onSubmit, formData } = useForm(onFormSubmit, initialState);

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: (): void => {
      window.location.href = '/dashboard';
    },
    onError: (err): void => {
      setError(err?.message || FALLBACK_ERROR);
    },
  });

  function onFormSubmit(error: string | null): void {
    if (error) {
      setError(error);
    } else {
      const password = (formData as any).password;
      createUser({ variables: { email, password } });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputWrap}>
        {errorMsg && (
          <div className={styles.errorContainer}>
            <p>{errorMsg}</p>
          </div>
        )}
        {!errorMsg && <h2 className={styles.message}>ENTER PASSWORD</h2>}
        <form onSubmit={onSubmit} name='password' noValidate>
          <div>
            <input
              className={styles.inputField}
              name='password'
              type='password'
              placeholder='Enter Password'
              onChange={onChange}
              autoComplete={'new-password'}
              required
            />
          </div>
          <button className={styles.btn} type='submit'>
            CREATE ACCOUNT
          </button>
        </form>
        {errorMsg && (
          <div className={styles.passwordReqs}>
            <p>{PASSWORD_REQS_}</p>
          </div>
        )}
      </div>
    </div>
  );
};
