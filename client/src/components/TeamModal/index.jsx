import { GET_TEAMS, GET_ME } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_SINGLE_TEAM } from '../../utils/queries';
import { ADD_TEAM, UPDATE_TEAM } from '../../utils/mutations';
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
  Select
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

export default function TeamModal({ currentTeam, action, isOpen, onClose }) {
  const [leagues, setLeagues] = useState([]);
  const [addTeam, { error: addTeamError }] = useMutation(ADD_TEAM, {
    refetchQueries: [
      GET_ME,
      GET_TEAMS,
    ]
  });
  const [updateTeam, { error: updateTeamError }] = useMutation(UPDATE_TEAM, {
    refetchQueries: [
      GET_SINGLE_TEAM
    ]
  });
  const { data } = useQuery(GET_TEAMS);

  // Use database data to set league states
  useEffect(() => {
    if (data) {
      // Extract leagues from the team data
      let teamLeagues = [];
      for (let i = 0; i < data.teams.length; i++) {
        const currentTeamLeague = data.teams[i].league;
        if (!teamLeagues.includes(currentTeamLeague) && currentTeamLeague !== 'Independent') {
          teamLeagues.push(currentTeamLeague);
        }
      }
      // Set leagues
      setLeagues(teamLeagues);
    }
    
  }, [data, setLeagues]);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const name = values.teamName;
    // Set league as teamLeague value unless user chose to add custom name
    const league = values.teamLeague !== 'Enter New League Name'
      ?
      values.teamLeague
      :
      values.customTeamLeague;

    if (action === 'create') {
      try {
        await addTeam({
          variables: {
            name,
            league,
            createdBy: Auth.getProfile().data._id
          }
        });
        setSubmitting(false);
        onClose();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await updateTeam({
          variables: {
            _id: currentTeam._id,
            name,
            league
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
    if (!currentTeam) {
      initialValues = {
        teamName: '',
        teamLeague: '',
        customTeamLeague: ''
      };
    } else {
      initialValues = {
        teamName: currentTeam.name,
        teamLeague: currentTeam.league,
        customTeamLeague: ''
      };
    }

    return initialValues;
  };

  const validate = values => {
    const errors = {};

    if (!values.teamName) {
      errors.teamName = 'Name is required';
    }

    if (!values.teamLeague) {
      errors.teamLeague = 'League is required';
    }

    if (
      (values.teamLeague === 'Enter New League Name')
      &&
      !values.customTeamLeague  
    ) {
      errors.customTeamLeague = 'League is required'
    }

    return errors;
  }

  const leagueOptions = leagues.map((league, index) => 
    <option key={index} value={league}>{league}</option>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalHeader>
          {(action === 'create') ? 'Add New Team' : `Edit ${currentTeam.name} (${currentTeam.league})`}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={getInitialValues()}
            validate={validate}
            onSubmit={handleFormSubmit}
          >
            {props =>
              <Form>
                <FormControl isInvalid={addTeamError || updateTeamError}>
                  <Field name='teamName'>
                    {({ field, form }) =>
                      <FormControl isRequired isInvalid={form.errors.teamName && form.touched.teamName}>
                        <FormLabel>Team Name</FormLabel>
                        <Input
                          type='text'
                          { ...field }
                        />
                        <FormErrorMessage>
                          {form.errors.teamName}
                        </FormErrorMessage>
                      </FormControl>
                    }
                  </Field>
                  <Field name='teamLeague'>
                    {({ field, form }) =>
                      <FormControl isRequired isInvalid={form.errors.teamLeague && form.touched.teamLeague}>
                        <FormLabel mt={3}>League</FormLabel>
                        <Select
                          placeholder='Select League'
                          { ...field }
                        >
                          {leagueOptions}
                          <option value='Independent'>Independent</option>
                          <option value='Enter New League Name'>Enter New League Name</option>
                        </Select>
                        <FormErrorMessage>
                          {form.errors.teamLeague}
                        </FormErrorMessage>
                      </FormControl>
                    }
                  </Field>
                  {
                    (props.values.teamLeague === 'Enter New League Name')
                    &&
                    <Field name='customTeamLeague'>
                      {({ field, form }) =>
                        <FormControl isInvalid={form.errors.customTeamLeague && form.touched.customTeamLeague}>
                          <Input
                            mt={2}
                            type='text'
                            { ...field }
                          />
                          <FormErrorMessage>
                            {form.errors.customTeamLeague}
                          </FormErrorMessage>
                        </FormControl>
                      }
                    </Field>
                  }
                  <FormErrorMessage>Something went wrong. Please try again.</FormErrorMessage>
                  <ModalFooter pr={1}>
                    <Button
                      type='submit'
                      isLoading={props.isSubmitting}
                    >
                      {(action === 'create') ? 'Add Team' : 'Update Team'}
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