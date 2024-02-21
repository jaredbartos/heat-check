import { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { GET_SINGLE_PLAYER } from '../../utils/queries';
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

export default function PerformanceModal({ action, currentPlayer, currentPerformance, isOpen, onClose }) {
  const [addPerformance, { error: addPerformanceError }] = useMutation(ADD_PERFORMANCE, {
    refetchQueries: [
      GET_SINGLE_PLAYER
    ]
  });
  const [updatePerformance, { error: updatePerformanceError }] = useMutation(UPDATE_PERFORMANCE, {
    refetchQueries: [
      GET_SINGLE_PLAYER
    ]
  });

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const date = new Date(values.date);

    if (action === 'create') {
      try {
        await addPerformance({
          variables: {
            input: {
              ...values,
              date,
              player: currentPlayer._id
            },
            createdBy: Auth.getProfile().data._id
          }
        });
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
        <ModalHeader>
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
                      type='submit'
                      isLoading={props.isSubmitting}
                    >
                      {(action === 'create') ? 'Add Game' : 'Update Game'}
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




    // <form onSubmit={handleFormSubmit}>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>
    //           <label htmlFor="dateInput">
    //             DATE
    //           </label>
    //         </th>
    //         <th>
    //           <label htmlFor="fgaInput">
    //             FGA
    //           </label>
    //         </th>
    //         <th>
    //           <label htmlFor="fgmInput">
    //             FGM
    //           </label>
    //         </th>
    //         <th>
    //           <label htmlFor="3PAInput">
    //             3PA
    //           </label>
    //         </th>
    //         <th>
    //           <label htmlFor="3PMInput">
    //             3PM
    //           </label>
    //         </th>
    //         <th>
    //           <label htmlFor="ftaInput">
    //             FTA
    //           </label>
    //         </th>
    //         <th>
    //           <label htmlFor="ftmInput">
    //             FTM
    //           </label>
    //         </th>
    //         <th>
    //           <label htmlFor="offRebInput">
    //             OREB
    //           </label>
    //         </th>
    //         <th>
    //           <label htmlFor="totRebsInput">
    //             TREB
    //           </label>
    //         </th>
    //         <th>
    //           <label htmlFor="astInput">
    //             AST
    //           </label>
    //         </th>
    //         <th>
    //           <label htmlFor="stlInput">
    //             STL
    //           </label>
    //         </th>
    //         <th>
    //           <label htmlFor="blkInput">
    //             BLK
    //           </label>
    //         </th>
    //         <th>
    //           <label htmlFor="turnoversInput">
    //             TO
    //           </label>
    //         </th>
    //         <th>
    //           <label htmlFor="pointsInput">
    //             PTS
    //           </label>
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>
    //           <input
    //             id="dateInput"
    //             type="date"
    //             name="date"
    //             onChange={handleInputChange}
    //             value={formState.date}
    //           />
    //         </td>
    //         <td>
    //           <input
    //             id="fgaInput"
    //             type="number"
    //             name="fgAtt"
    //             min="0"
    //             onChange={handleInputChange}
    //             value={formState.fgAtt}
    //           />
    //         </td>
    //         <td>
    //           <input
    //             id="fgmInput"
    //             type="number"
    //             name="fgMade"
    //             min="0"
    //             onChange={handleInputChange}
    //             value={formState.fgMade}
    //           />
    //         </td>
    //         <td>
    //           <input
    //             id="3PAInput"
    //             type="number"
    //             name="threePtAtt"
    //             min="0"
    //             onChange={handleInputChange}
    //             value={formState.threePtAtt}
    //           />
    //         </td>
    //         <td>
    //           <input
    //             id="3PMInput"
    //             type="number"
    //             name="threePtMade"
    //             min="0"
    //             onChange={handleInputChange}
    //             value={formState.threePtMade}
    //           />
    //         </td>
    //         <td>
    //           <input
    //             id="ftaInput"
    //             type="number"
    //             name="ftAtt"
    //             min="0"
    //             onChange={handleInputChange}
    //             value={formState.ftAtt}
    //           />
    //         </td>
    //         <td>
    //           <input
    //             id="ftmInput"
    //             type="number"
    //             name="ftMade"
    //             min="0"
    //             onChange={handleInputChange}
    //             value={formState.ftMade}
    //           />
    //         </td>
    //         <td>
    //           <input
    //             id="offRebInput"
    //             type="number"
    //             name="offReb"
    //             min="0"
    //             onChange={handleInputChange}
    //             value={formState.offReb}
    //           />
    //         </td>
    //         <td>
    //           <input
    //             id="totRebsInput"
    //             type="number"
    //             name="rebounds"
    //             min="0"
    //             onChange={handleInputChange}
    //             value={formState.rebounds}
    //           />
    //         </td>
    //         <td>
    //           <input
    //             id="astInput"
    //             type="number"
    //             name="assists"
    //             min="0"
    //             onChange={handleInputChange}
    //             value={formState.assists}
    //           />
    //         </td>
    //         <td>
    //           <input
    //             id="stlInput"
    //             type="number"
    //             name="steals"
    //             min="0"
    //             onChange={handleInputChange}
    //             value={formState.steals}
    //           />
    //         </td>
    //         <td>
    //           <input
    //             id="blkInput"
    //             type="number"
    //             name="blocks"
    //             min="0"
    //             onChange={handleInputChange}
    //             value={formState.blocks}
    //           />
    //         </td>
    //         <td>
    //           <input
    //             id="turnoversInput"
    //             type="number"
    //             name="turnovers"
    //             min="0"
    //             onChange={handleInputChange}
    //             value={formState.turnovers}
    //           />
    //         </td>
    //         <td>
    //           <input
    //             id="pointsInput"
    //             type="number"
    //             name="points"
    //             min="0"
    //             onChange={handleInputChange}
    //             value={formState.points}
    //           />
    //         </td>
    //       </tr>
    //     </tbody>
    //   </table>
    //   {
    //     action === 'create'
    //     ?
    //     <button type="submit" id="submitNewPerformanceBtn">Add Game</button>
    //     :
    //     <button type="submit" id="updatePerformanceBtn">Update Game</button>
    //   }      
    // </form>
  );
}