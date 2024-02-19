import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Center
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function LoginModal({ isOpen, onOpen, onClose }) {
  // const [formState, setFormState] = useState({
  //   email: '',
  //   password: ''
  // });
  const [login, { error: loginError }] = useMutation(LOGIN);

  // // Handler function for onChange behavior
  // const handleInputChange = (e) => {
  //   // Declare variables for values based on target
  //   const { name, value } = e.target;
  //   setFormState({
  //     ...formState,
  //     [name]: value
  //   });
  // };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   const { data } = await login({
  //     variables: {
  //       email: formState.email,
  //       password: formState.password
  //     }
  //   });

  //   Auth.login(data.login.token);
  // };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={5}>
        <Center>
          <ModalHeader>Login</ModalHeader>
        </Center>        
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async ({ email, password }, { setSubmitting }) => {
            const { data } = await login({
              variables: {
                email,
                password
              }
            });
            Auth.login(data.login.token);
            setSubmitting(false);
          }}
        >
          {props =>
            <Form>
              <FormControl isInvalid={loginError}>
                <Field name='email'>
                  {({ field }) =>
                    <FormControl>
                      <FormLabel>
                        Email
                      </FormLabel>
                      <Input
                        type='email'
                        { ...field }
                      />
                    </FormControl>
                  }
                </Field>
                <Field name='password'>
                  {({ field }) =>
                    <FormControl>
                      <FormLabel>
                        Password
                      </FormLabel>
                      <Input
                        type='password'
                        { ...field }
                      />
                    </FormControl>
                  }
                </Field>
                <FormErrorMessage>Incorrect email or password</FormErrorMessage>
                <ModalFooter>
                  <Button
                    type='submit'
                    isLoading={props.isSubmitting}
                  >
                    Log in
                  </Button>
                  <Button type="button" ml={3} onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </FormControl>
            </Form>
          }
        </Formik>
      </ModalContent>
    </Modal>    
  );
}