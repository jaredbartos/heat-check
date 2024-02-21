import { useState, useEffect } from 'react';
import { ADD_PLAYER, UPDATE_PLAYER } from '../../utils/mutations';
import { GET_SINGLE_TEAM, GET_SINGLE_PLAYER } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
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
  Select,
  InputRightAddon,
  InputGroup,
  HStack
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

export default function PlayerModal({ action, currentPlayer, currentTeam, isOpen, onClose }) {
  const [addPlayer] = useMutation(ADD_PLAYER, {
    refetchQueries: [
      GET_SINGLE_TEAM
    ]
  });
  const [updatePlayer] = useMutation(UPDATE_PLAYER, {
    refetchQueries: [
      GET_SINGLE_PLAYER
    ]
  });

  // Submit handler function for form
  const handleFormSubmit = async (values, { setSubmitting }) => {
    // Format height to string for database entry
    const height = `${values.feet}'${values.inches}"`;

    if (action === 'create') {
      const input = {
        firstName: values.firstName,
        lastName: values.lastName,
        position: values.position,
        number: Number(values.number),
        weight: Number(values.weight),
        height,
        team: currentTeam._id
      };
      try {
        await addPlayer({
          variables: {
              input,
              createdBy: Auth.getProfile().data._id
            }
        });
        setSubmitting(false);
        onClose();
      } catch (error) {
        console.log(error);
      }
    } else {
      const input = {
        firstName: values.firstName,
        lastName: values.lastName,
        position: values.position,
        number: Number(values.number),
        weight: Number(values.weight),
        height
      };
      try {
        await updatePlayer({
          variables: {
            _id: currentPlayer._id,
            input
          }
        });
        setSubmitting(false);
        onClose();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getInitialValues = () => {
    let initialValues;
    if (!currentPlayer) {
      initialValues = {
        firstName: '',
        lastName: '',
        number: '',
        position: '',
        feet: '',
        inches: '',
        weight: ''
      };
    } else {
      const heightArr = currentPlayer.height.split("'");
      const feet = heightArr[0];
      const inches = heightArr[1].split('"')[0];
      initialValues = {
        firstName: currentPlayer.firstName,
        lastName: currentPlayer.lastName,
        number: currentPlayer.number,
        position: currentPlayer.position,
        feet,
        inches,
        weight: currentPlayer.weight
      };
    }

    return initialValues;
  };

  const validate = values => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = 'First name is required'
    }
    if (!values.position) {
      errors.position = 'Position is required'
    }

    return errors;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalHeader color='custom.blueGreen'>
          {(action === 'create') ? 'Add New Player' : `Edit ${currentPlayer.firstName} ${currentPlayer.lastName}`}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={getInitialValues()}
            onSubmit={handleFormSubmit}
            validate={validate}
          >
            {props =>
              <Form>
                <FormControl>
                  <Field name='firstName'>
                    {({ field, form }) =>
                      <FormControl isRequired isInvalid={form.errors.firstName && form.touched.firstName}>
                        <FormLabel>First Name</FormLabel>
                        <Input
                          type='text'
                          { ...field }
                        />
                        <FormErrorMessage>
                          {form.errors.firstName}
                        </FormErrorMessage>
                      </FormControl>
                    }
                  </Field>
                  <Field name='lastName'>
                    {({ field, form }) =>
                      <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          type='text'
                          { ...field }
                        />
                      </FormControl>
                    }
                  </Field>
                  <Field name='number'>
                    {({ field, form }) =>
                      <FormControl>
                        <FormLabel>Number</FormLabel>
                        <Input
                          type='number'
                          { ...field }
                        />
                      </FormControl>
                    }
                  </Field>
                  <Field name='position'>
                    {({ field, form }) =>
                      <FormControl isRequired isInvalid={form.errors.position && form.touched.position}>
                        <FormLabel>Position</FormLabel>
                        <Select
                          placeholder='Select Position'
                          { ...field }
                        >
                          <option value='Guard'>Guard</option>
                          <option value='Forward'>Forward</option>
                          <option value='Center'>Center</option>
                        </Select>
                        <FormErrorMessage>
                          {form.errors.position}
                        </FormErrorMessage>
                      </FormControl>
                    }
                  </Field>
                  <FormLabel>Height</FormLabel>
                  <HStack>
                  <Field name='feet'>
                    {({ field, form }) =>
                      <FormControl>
                        <InputGroup>
                          <Input
                            w={12}
                            type='number'
                            { ...field }
                          />
                          <InputRightAddon>
                            feet
                          </InputRightAddon>
                        </InputGroup>
                      </FormControl>
                    }
                  </Field>
                  <Field name='inches'>
                    {({ field, form }) =>
                      <FormControl>
                        <InputGroup>
                          <Input
                            w={14}
                            type='number'
                            { ...field }
                          />
                          <InputRightAddon>
                            inches
                          </InputRightAddon>
                        </InputGroup>
                      </FormControl>
                    }
                  </Field>
                  </HStack>
                  <Field name='weight'>
                    {({ field, form }) =>
                      <FormControl>
                        <FormLabel>Weight</FormLabel>
                        <Input
                          type='number'
                          { ...field }
                        />
                      </FormControl>
                    }
                  </Field>
                  <ModalFooter pr={1}>
                    <Button
                      colorScheme='blue'
                      boxShadow='xl'
                      type='submit'
                      isLoading={props.isSubmitting}
                    >
                      {(action === 'create') ? 'Add Player' : 'Update Player'}
                    </Button>
                    <Button
                      boxShadow='md'
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