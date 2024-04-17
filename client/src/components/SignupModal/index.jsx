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
  FormHelperText,
  Flex,
  HStack,
  Text,
  VStack
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

// SignupModal component
export default function SignupModal({ isOpen, onClose }) {
  // Prepare addUser mutation
  const [addUser] = useMutation(ADD_USER);

  const validate = values => {
    const errors = {};

    if (!values.username) {
      errors.username = 'Username is required';
    }

    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z]).{8,}$/.test(
        values.password
      )
    ) {
      errors.password = 'Your chosen password does not meet the requirements';
    }

    return errors;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalHeader color="custom.blue">Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: ''
            }}
            validate={validate}
            onSubmit={async (
              { username, email, password },
              { setSubmitting }
            ) => {
              const { data } = await addUser({
                variables: {
                  username,
                  email,
                  password
                }
              });
              Auth.login(data.addUser.token);
              setSubmitting(false);
            }}
          >
            {props => (
              <Form>
                <FormControl>
                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                      >
                        <FormLabel>Username</FormLabel>
                        <Input
                          placeholder="Enter username"
                          type="text"
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel mt={3}>Email</FormLabel>
                        <Input
                          placeholder="Enter email address"
                          type="email"
                          {...field}
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel mt={3}>Password</FormLabel>
                        <Input
                          placeholder="Enter password"
                          type="password"
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                        <FormHelperText mt={3}>
                          <Flex justify="space-around" align="flex-start">
                            <Text>Password must contain:</Text>
                            <VStack align="left">
                              <Text>at least 8 characters</Text>
                              <Text>at least one uppercase letter</Text>
                              <Text>at least one lowercase letter</Text>
                              <Text>at least one number</Text>
                              <Text>at least one special character</Text>
                            </VStack>
                          </Flex>
                        </FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                  <ModalFooter pr={1}>
                    <Button
                      boxShadow="md"
                      type="button"
                      mr={3}
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      colorScheme="blue"
                      boxShadow="xl"
                      type="submit"
                      isLoading={props.isSubmitting}
                    >
                      Sign Up
                    </Button>
                  </ModalFooter>
                </FormControl>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
