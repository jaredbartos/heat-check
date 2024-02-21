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
  Center,
  FormHelperText
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function SignupModal({ isOpen, onClose }) {
  const [addUser] = useMutation(ADD_USER);

  const validate = values => {
    const errors = {};

    if (!values.username) {
      errors.username = 'Username is required';
    }

    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z]).{8,}$/.test(values.password)) {
      errors.password = 'Your chosen password does not meet the requirements';
    }

    return errors;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={4}>
        <Center>
          <ModalHeader>Signup</ModalHeader>
        </Center>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
                username: '',
                email: '',
                password: ''
            }}
            validate={validate}
            onSubmit={async ({ username, email, password }, { setSubmitting }) => {
              const { data } = await addUser({
                variables: {
                  username,
                  email,
                  password
                }
              });
              Auth.login(data.addUser.token);
              setSubmitting(false)
            }}
          >
            {props =>
              <Form>
                <FormControl>
                  <Field name='username'>
                    {({ field, form }) =>
                      <FormControl isRequired isInvalid={form.errors.username && form.touched.username}>
                        <FormLabel>Username</FormLabel>
                        <Input
                          type='text'
                          { ...field }
                        />
                        <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                      </FormControl>
                    }
                  </Field>
                  <Field name='email'>
                    {({ field, form }) =>
                      <FormControl isRequired isInvalid={form.errors.email && form.touched.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                          type='email'
                          { ...field }
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    }
                  </Field>
                  <Field name='password'>
                    {({ field, form }) =>
                      <FormControl isRequired isInvalid={form.errors.password && form.touched.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type='password'
                          { ...field }
                        />
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                        <FormHelperText>Password must contain an uppercase letter, a lowercase letter, a number, a special character, and have a length of 8 characters or more.</FormHelperText>
                      </FormControl>
                    }
                  </Field>
                  <ModalFooter pr={1}>
                    <Button
                      type='submit'
                      isLoading={props.isSubmitting}
                    >
                      Sign Up
                    </Button>
                    <Button
                      type='button'
                      ml={3}
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
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