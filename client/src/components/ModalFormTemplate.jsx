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

<Modal>
  <ModalOverlay />
  <ModalContent p={4}>
    <Center>
      <ModalHeader></ModalHeader>
    </Center>
    <ModalCloseButton />
    <ModalBody>
      <Formik>
        {props =>
          <Form>
            <FormControl>
              <Field>
                {({ field, form }) =>
                  <FormControl>
                    <FormLabel></FormLabel>
                    <Input />
                  </FormControl>
                }
              </Field>
              <ModalFooter pr={1}>
                <Button
                  type='submit'
                  isLoading={props.isSubmitting}
                ></Button>
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