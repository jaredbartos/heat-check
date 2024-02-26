import { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { GET_SINGLE_PLAYER, GET_PERFORMANCES_BY_PLAYER, GET_AVG_PERFORMANCE_BY_PLAYER } from '../../utils/queries';
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

export default function PerformanceModal({ action, currentPlayer, currentPerformance, isOpen, onClose }) {
  const manageChanges = useManageChanges();
  const [addPerformance, { error: addPerformanceError }] = useMutation(ADD_PERFORMANCE, {
    refetchQueries: [
      GET_SINGLE_PLAYER,
      GET_PERFORMANCES_BY_PLAYER,
      GET_AVG_PERFORMANCE_BY_PLAYER
    ]
  });
  const [updatePerformance, { error: updatePerformanceError }] = useMutation(UPDATE_PERFORMANCE, {
    refetchQueries: [
      GET_SINGLE_PLAYER,
      GET_PERFORMANCES_BY_PLAYER,
      GET_AVG_PERFORMANCE_BY_PLAYER
    ]
  });

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const date = new Date(values.date);

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
  }

  const getInitialValues = () => {
    let initalValues;
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
        points: 0
      }
    } else {
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
      initalValues = {
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

  const PerformanceField = ({ fieldName, labelName }) => {
    return (
      <Field name={fieldName}>
        {({ field, form }) =>
          <FormControl isRequired>
            <FormLabel>{labelName}</FormLabel>
            <Input
              w={14}
              type='number'
              { ...field }
            />
          </FormControl>
        }
      </Field>
    );
  };

  const validate = values => {
    const errors = {};

    if (!values.date) {
      errors.date = 'Date is required';
    }

    return errors;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalHeader color='custom.blueGreen'>
          {(action === 'create') ? 'Add Game' : 'Edit Game'}
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
                <FormControl isInvalid={addPerformanceError || updatePerformanceError}>
                  <Field name='date'>
                    {({ field, form }) =>
                      <FormControl isRequired isInvalid={form.errors.date && form.touched.date}>
                        <FormLabel>Date</FormLabel>
                        <Input
                          w={40}
                          type='date'
                          { ...field }
                        />
                        <FormErrorMessage>
                          {form.errors.date}
                        </FormErrorMessage>
                      </FormControl>
                    }
                  </Field>
                  <HStack mt={2}>
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
                  <HStack mt={2}>
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
                  <HStack mt={2}>
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
                  <HStack mt={2}>
                    <PerformanceField
                      fieldName='points'
                      labelName='PTS'
                    />
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
                      {(action === 'create') ? 'Add Game' : 'Update Game'}
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