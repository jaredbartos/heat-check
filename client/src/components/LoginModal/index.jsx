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
  Input,
  Button,
  Center
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function LoginModal({ isOpen, onClose }) {
  const [login, { error: loginError }] = useMutation(LOGIN);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={4}>
        <Center>
          <ModalHeader>Login</ModalHeader>
        </Center>
        <ModalCloseButton />
        <ModalBody> 
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
                  <ModalFooter pr={1}>
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
          </ModalBody>
      </ModalContent>
    </Modal>    
  );
}