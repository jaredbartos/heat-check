import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import SignupForm from '../components/SignupForm';

export default function SignupPage () {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [addUser, { error }] = useMutation(ADD_USER);

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
    const { data } = await addUser({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password
      }
    });

    Auth.login(data.addUser.token);
  };


  return (
    <>
      <h2>Sign Up</h2>
      <SignupForm
        username={formState.username}
        email={formState.email}
        password={formState.password}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
      />
      {error &&
        <div>
          <p>Something went wrong with your sign up. Please try again!</p>
        </div>
      }
    </>
  );
}