import * as React from 'react';

const EMAIL_INPUT = 'email';
const PASSWORD_INPUT = 'password';

interface FormData {
  email?: string;
  password?: string;
}

export const useForm = (callback: any, initialState = {}) => {
  const [formData, setFormData] = React.useState<FormData>(initialState);

  const isValidEmail = (email: string | undefined): boolean => {
    const regex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const isValidPassword = (password: string | undefined): boolean => {
    const regex: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    return regex.test(password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const { email, password } = formData;
    const target = event.target as HTMLFormElement;
    const { name } = target;
    if (name === EMAIL_INPUT) {
      if (isValidEmail(email)) {
        callback(null);
      } else {
        const msg = 'Enter a valid email';
        callback(msg);
      }
    } else if (name === PASSWORD_INPUT) {
      if (isValidPassword(password)) {
        callback(null);
      } else {
        const msg = 'Enter a valid password';
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
