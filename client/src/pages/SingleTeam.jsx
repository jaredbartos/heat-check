import { useParams } from 'react-router-dom';
import { GET_SINGLE_TEAM } from '../utils/queries';
import { DELETE_TEAM } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import PlayersTable from '../components/PlayersTable';
import Auth from '../utils/auth';
import PlayerForm from '../components/PlayerForm';
import TeamModal from '../components/TeamModal';
import {
  Heading,
  Text,
  Box,
  Center,
  VStack,
  Button,
  ButtonGroup
} from '@chakra-ui/react';

export default function SingleTeam() {
  const { id } = useParams();
  const [team, setTeam] = useState();
  const [playerFormVisible, setPlayerFormVisible] = useState(false)
  const [teamFormVisible, setTeamFormVisible] = useState(false);
  const [deleteTeam] = useMutation(DELETE_TEAM);
  const { loading, data } = useQuery(GET_SINGLE_TEAM, {
    variables: { id }
  });

  // Set useEffect to set team value to prepare
  // for future retrieval from indexedDB for PWA
  useEffect(() => {
    if (data) {
      setTeam(data.team);
    }
  }, [data, setTeam]);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm(`Are you sure you want to delete the ${team.name}?`)) {
      try {
        await deleteTeam({
          variables: {
            _id: team._id
          }
        });
      } catch (err) {
        console.log(err);
      }

      location.replace('/teams');
    }
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <>
      {
        team
        &&
        <Box m={12}>
          <Center>
            <VStack>
              <Heading as='h2' mb={2} size='lg'>{team.name}</Heading>
              <Text fontSize='xl' mb={2}>League: {team.league}</Text>
              {
                (Auth.loggedIn() && Auth.getProfile().data._id === team.createdBy._id)
                &&
                <ButtonGroup>
                  <Button
                    type="button"
                    onClick={() => setTeamFormVisible(true)}
                  >
                    Edit Team
                  </Button>
                  <Button
                    type="button"
                    onClick={handleDelete}
                  >
                    Delete Team
                  </Button>
                </ButtonGroup>
              }
            </VStack>
          </Center>
          {
            teamFormVisible
            &&
            <TeamForm
              makeFormInvisible={() => setTeamFormVisible(false)}
              currentTeam={team}
              action='update'
            />
          }
          {
            playerFormVisible
            &&
            <PlayerForm
              action='create'
              makeFormInvisible={() => setPlayerFormVisible(false)}
              currentTeam={team}
            />
          }
          {
            team.players.length
            ?
            <PlayersTable team={team} />
            :
            <Text fontSize='lg' mt={2}>No players have been added yet!</Text>
          }
          {
            (Auth.loggedIn() && Auth.getProfile().data._id === team.createdBy._id)
            &&
            <Center mt={5}>
              <Button
                type="button"
                onClick={() => setPlayerFormVisible(true)}
              >
                Add Player
              </Button>
            </Center>
          }
        </Box>       
      }     
    </>
  );
}