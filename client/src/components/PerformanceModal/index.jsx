import { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { GET_SINGLE_PLAYER } from '../../utils/queries/player';
import { ADD_PERFORMANCE, UPDATE_PERFORMANCE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { formatEditDate } from '../../utils/dates';
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
  HStack
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useManageChanges } from '../../utils/hooks';

// PerformanceModal component
export default function PerformanceModal({
  action,
  currentPlayer,
  currentPerformance,
  isOpen,
  onClose
}) {
  // Use custom hook for managing recent changes Redux
  const manageChanges = useManageChanges();
  // Prepare addPerformance mutation
  const [addPerformance, { error: addPerformanceError }] = useMutation(
    ADD_PERFORMANCE,
    {
      refetchQueries: [GET_SINGLE_PLAYER]
    }
  );
  // Prepare updatePerformance mutation
  const [updatePerformance, { error: updatePerformanceError }] = useMutation(
    UPDATE_PERFORMANCE,
    {
      refetchQueries: [GET_SINGLE_PLAYER]
    }
  );

  // Submit handler for Formik form
  const handleFormSubmit = async (values, { setSubmitting }) => {
    // Create new date object with input date
    const date = new Date(values.date);

    // Depending on whether passed action prop equals 'create' or 'update',
    // Add or update performance
    if (action === 'create') {
      try {
        const { data } = await addPerformance({
          variables: {
            input: {
              ...values,
              date,
              player: currentPlayer._id
            },
            createdBy: Auth.getProfile().data._id
          }
        });
        // Add new performance to recent changes for highlighting in UI
        manageChanges(data.addPerformance._id);
        setSubmitting(false);
        onClose();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updatePerformance({
          variables: {
            _id: currentPerformance._id,
            input: {
              ...values,
              date
            }
          }
        });
        setSubmitting(false);
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Get initial values for form
  const getInitialValues = () => {
    let initalValues;
    // If a currentPerformance prop was not passed through,
    // Start fresh with zeroes
    if (!currentPerformance) {
      initalValues = {
        date: '',
        fgAtt: 0,
        fgMade: 0,
        threePtAtt: 0,
        threePtMade: 0,
        ftAtt: 0,
        ftMade: 0,
        offReb: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
        turnovers: 0,
        points: ''
      };
    } else {
      // Destructure currentPerformance prop
      const {
        date,
        fgAtt,
        fgMade,
        threePtAtt,
        threePtMade,
        ftAtt,
        ftMade,
        offReb,
        rebounds,
        assists,
        steals,
        blocks,
        turnovers,
        points
      } = currentPerformance;
      // Set initial values for edit
      initalValues = {
        // Use helper to format date to display correctly on edit form
        date: formatEditDate(date),
        fgAtt,
        fgMade,
        threePtAtt,
        threePtMade,
        ftAtt,
        ftMade,
        offReb,
        rebounds,
        assists,
        steals,
        blocks,
        turnovers,
        points
      };
    }

    return initalValues;
  };

  // PerformanceField component to reduce repeating code in form
  const PerformanceField = ({ fieldName, labelName }) => {
    return (
      <Field name={fieldName}>
        {({ field, form }) => (
          <FormControl isRequired>
            <FormLabel>{labelName}</FormLabel>
            <Input
              w={14}
              type='number'
              {...field}
            />
          </FormControl>
        )}
      </Field>
    );
  };

  const validate = values => {
    const errors = {};

    if (!values.date) {
      errors.date = 'Date is required';
    }

    return errors;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalHeader color='custom.blue'>
          {action === 'create' ? 'Add Game' : 'Edit Game'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={getInitialValues()}
            onSubmit={handleFormSubmit}
            validate={validate}
          >
            {props => (
              <Form>
                <FormControl
                  isInvalid={addPerformanceError || updatePerformanceError}
                >
                  <Field name='date'>
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.date && form.touched.date}
                      >
                        <FormLabel>Date</FormLabel>
                        <Input
                          w={40}
                          type='date'
                          {...field}
                        />
                        <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <HStack mt={3}>
                    <PerformanceField
                      fieldName='fgAtt'
                      labelName='FGA'
                    />
                    <PerformanceField
                      fieldName='fgMade'
                      labelName='FGM'
                    />
                    <PerformanceField
                      fieldName='threePtAtt'
                      labelName='3PA'
                    />
                    <PerformanceField
                      fieldName='threePtMade'
                      labelName='3PM'
                    />
                  </HStack>
                  <HStack mt={3}>
                    <PerformanceField
                      fieldName='ftAtt'
                      labelName='FTA'
                    />
                    <PerformanceField
                      fieldName='ftMade'
                      labelName='FTM'
                    />
                    <PerformanceField
                      fieldName='offReb'
                      labelName='OREB'
                    />
                    <PerformanceField
                      fieldName='rebounds'
                      labelName='TREB'
                    />
                  </HStack>
                  <HStack mt={3}>
                    <PerformanceField
                      fieldName='assists'
                      labelName='AST'
                    />
                    <PerformanceField
                      fieldName='steals'
                      labelName='STL'
                    />
                    <PerformanceField
                      fieldName='blocks'
                      labelName='BLK'
                    />
                    <PerformanceField
                      fieldName='turnovers'
                      labelName='TO'
                    />
                  </HStack>
                  <HStack mt={3}>
                    <Field name='points'>
                      {({ field, form }) => (
                        <FormControl isRequired>
                          <FormLabel>PTS</FormLabel>
                          <Input
                            w={14}
                            placeholder={
                              props.values.fgMade * 2 +
                              props.values.threePtMade +
                              props.values.ftMade
                            }
                            type='number'
                            {...field}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </HStack>
                  <FormErrorMessage>
                    Make sure all required fields are filled
                  </FormErrorMessage>
                  <ModalFooter pr={1}>
                    <Button
                      boxShadow='md'
                      type='button'
                      mr={3}
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      colorScheme='blue'
                      boxShadow='xl'
                      type='submit'
                      isLoading={props.isSubmitting}
                    >
                      {action === 'create' ? 'Add Game' : 'Update Game'}
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
