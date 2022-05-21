import * as React from 'react';
import { useMutation } from '@apollo/client';
import styles from '../styles/form.scss';
import { useForm } from '../hooks/useForm';
import { SIGN_IN_USER } from '../graphql/mutations';

interface Props {
  email: string;
}

export const SignIn = ({ email }: Props) => {
  const [errorMsg, setError] = React.useState<string>('');
  const { onChange, onSubmit, formData } = useForm(onFormSubmit);

  const [signInUser] = useMutation(SIGN_IN_USER, {
    onCompleted: res => {
      const { message } = res.signInUser || '';
      if (message === 'success') {
        window.location.href = '/dashboard';
      } else if (message === 'invalid password') {
        const msg = 'Invalid password, try again.';
        setError(msg);
      } else {
        const msg = 'An error occurred, try again.';
        setError(msg);
      }
    },
    onError: () => {
      const msg = 'An error occurred, try again.';
      setError(msg);
    },
  });

  function onFormSubmit(error: string | null) {
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
      </div>
    </div>
  );
};
