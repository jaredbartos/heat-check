import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });
  const [login, { error }] = useMutation(LOGIN);

  // Handler function for onChange behavior
  const handleInputChange = (e) => {
    // Declare variables for values based on target
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { data } = await login({
      variables: {
        email: formState.email,
        password: formState.password
      }
    });

    Auth.login(data.login.token);
  };


  return (
    <>
      <h2>Login</h2>
      <LoginForm
        email={formState.email}
        password={formState.password}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
      />
      {error &&
        <div>
          <p>Incorrect email or password. Please try again!</p>
        </div>
      }
    </>
  );
}