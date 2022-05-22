import * as React from 'react';
import { useMutation } from '@apollo/client';
import styles from '../styles/form.scss';
import { useForm } from '../hooks/useForm';
import { SIGN_IN_USER } from '../graphql/mutations';

const FALLBACK_ERROR = 'An error occurred, try again.';
const INVALID_PASSWORD = 'Invalid credentials, try again.';
const PASSWORD_REQS_ =
  'Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter and one number.';

interface Props {
  email: string;
}

export const SignIn = ({ email }: Props) => {
  const [errorMsg, setError] = React.useState<string>('');
  const { onChange, onSubmit, formData } = useForm(onFormSubmit);

  const [signInUser] = useMutation(SIGN_IN_USER, {
    onCompleted: (res): void => {
      const { message } = res.signInUser || '';
      if (message === 'success') {
        window.location.href = '/dashboard';
      } else if (message === 'invalid password') {
        const msg: string = INVALID_PASSWORD;
        setError(msg);
      } else {
        const msg: string = FALLBACK_ERROR;
        setError(msg);
      }
    },
    onError: (): void => {
      const msg: string = FALLBACK_ERROR;
      setError(msg);
    },
  });

  function onFormSubmit(error: string | null): void {
    console.log(formData);
    if (error) {
      setError(error);
    } else {
      const password = (formData as any).password;
      signInUser({ variables: { email, password } });
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
              autoComplete={'current-password'}
              required
            />
          </div>
          <button className={styles.btn} type='submit'>
            SIGN IN
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
