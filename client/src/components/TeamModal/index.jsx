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
    // Set league as newTeamLeague value unless user chose to add custom name
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
      } catch (err) {
        console.log(err);
      }
    }

    setSubmitting(false);
    onClose();
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
  }

  const leagueOptions = leagues.map((league, index) => 
    <option key={index} value={league}>{league}</option>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={4}>
          <ModalHeader>
            {(action === 'create') ? 'Add Team' : 'Edit Team'}
          </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={getInitialValues()}
            onSubmit={handleFormSubmit}
          >
            {props =>
              <Form>
                <FormControl isInvalid={addTeamError || updateTeamError}>
                  <Field name='teamName'>
                    {({ field, form }) =>
                      <FormControl>
                        <FormLabel>Team Name</FormLabel>
                        <Input
                          type='text'
                          { ...field }
                        />
                      </FormControl>
                    }
                  </Field>
                  <Field name='teamLeague'>
                    {({ field, form }) =>
                      <FormControl>
                        <FormLabel>League</FormLabel>
                        <Select
                          placeholder='Select League'
                          { ...field }
                        >
                          {leagueOptions}
                          <option value='Independent'>Independent</option>
                          <option value='Enter New League Name'>Enter New League Name</option>
                        </Select>
                      </FormControl>
                    }
                  </Field>
                  {
                    (props.values.teamLeague === 'Enter New League Name')
                    &&
                    <Field name='customTeamLeague'>
                      {({ field, form }) =>
                        <FormControl>
                          <Input
                            mt={2}
                            type='text'
                            { ...field }
                          />
                        </FormControl>
                      }
                    </Field>
                  }
                  <FormErrorMessage>Something went wrong. Please try again.</FormErrorMessage>
                  <ModalFooter pr={1}>
                    {
                      (action === 'create')
                      ?
                      <Button
                        type='submit'
                        isLoading={props.isSubmitting}
                      >
                        Add Team
                      </Button>
                      :
                      <Button
                        type='submit'
                        isLoading={props.isSubmitting}
                      >
                        Update Team
                      </Button>
                    }
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
    //   <label htmlFor="newTeamNameInput">
    //     Name: 
    //   </label>
    //   <input
    //     id="newTeamNameInput"
    //     type="text"
    //     name="newTeamName"
    //     onChange={handleInputChange}
    //     value={formState.newTeamName}
    //   />
    //   <label htmlFor="newTeamLeagueOption">
    //     League: 
    //   </label>
    //   <select
    //     onChange={handleInputChange}
    //     value={formState.newTeamLeague}
    //     name="newTeamLeague"
    //   >
    //     <option value="Independent">Independent</option>
    //     {leagueOptions}       
    //     <option value="Enter New League Name">Enter New League Name</option>
    //   </select>
    //   {
    //     (formState.newTeamLeague === 'Enter New League Name')
    //     &&
    //     <input
    //       id="customTeamLeagueInput"
    //       onChange={handleInputChange}
    //       type="text"
    //       name="customTeamLeague"
    //       value={formState.customTeamLeague}
    //     />
    //   }
    //   {
    //     action === 'create'
    //     ?
    //     <button type="submit" id="submitNewTeamBtn">Add Team</button>
    //     :
    //     <button type="submit" id="updateTeamBtn">Update Team</button>
    //   }
      
    // </form>
  );
}