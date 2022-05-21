import * as React from 'react';

const EMAIL_INPUT = 'email';
const PASSWORD_INPUT = 'password';
const INVALID_EMAIL_MSG = 'Enter a valid email';
const INVALID_PASSWORD_MSG = 'Enter a valid password';

interface FormData {
  email?: string;
  password?: string;
}

export const useForm = (callback: any, initialState = {}) => {
  const [formData, setFormData] = React.useState<FormData>(initialState);

  const isValidEmail = (email: string | undefined): boolean => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const isValidPassword = (password: string | undefined): boolean => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    return regex.test(password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event?.preventDefault();
    const { email, password } = formData;
    const target = event.target as HTMLFormElement;
    const { name } = target;
    if (name === EMAIL_INPUT) {
      if (isValidEmail(email)) {
        callback(null);
      } else {
        const msg: string = INVALID_EMAIL_MSG;
        callback(msg);
      }
    } else if (name === PASSWORD_INPUT) {
      if (isValidPassword(password)) {
        callback(null);
      } else {
        const msg: string = INVALID_PASSWORD_MSG;
        callback(msg);
      }
    }
  };

  return {
    formData,
    onChange,
    onSubmit,
  };
};
