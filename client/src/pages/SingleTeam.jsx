import { useParams } from 'react-router-dom';
import { GET_SINGLE_TEAM } from '../utils/queries';
import { DELETE_TEAM } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import PlayersTable from '../components/PlayersTable';
import Auth from '../utils/auth';
import PlayerModal from '../components/PlayerModal';
import TeamModal from '../components/TeamModal';
import {
  Heading,
  Text,
  Box,
  Center,
  VStack,
  Button,
  ButtonGroup,
  useDisclosure,
  Icon
} from '@chakra-ui/react';
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

export default function SingleTeam() {
  const { id } = useParams();
  const [team, setTeam] = useState();
  const [deleteTeam] = useMutation(DELETE_TEAM);
  const { loading, data } = useQuery(GET_SINGLE_TEAM, {
    variables: { id }
  });
  const {
    isOpen: isTeamOpen,
    onOpen: onTeamOpen,
    onClose: onTeamClose
  } = useDisclosure();
  const {
    isOpen: isPlayerOpen,
    onOpen: onPlayerOpen,
    onClose: onPlayerClose
  } = useDisclosure();

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

      location.replace('/dashboard');
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
              <Heading as='h2' color='custom.blueGreen' mb={2} size='lg'>{team.name}</Heading>
              <Text fontSize='xl' mb={2}>League: {team.league}</Text>
              {
                (Auth.loggedIn() && Auth.getProfile().data._id === team.createdBy._id)
                &&
                <ButtonGroup>
                  <Button
                    boxShadow='xl'
                    colorScheme='blue'
                    type="button"
                    onClick={onTeamOpen}
                  >
                    <Icon
                      as={FaEdit}
                      mr={1}
                    />
                    Edit Team
                  </Button>
                  <Button
                    boxShadow='xl'
                    colorScheme='red'
                    type="button"
                    onClick={handleDelete}
                  >
                    <Icon
                      as={TiDelete}
                      boxSize={6}
                    />
                    Delete Team
                  </Button>
                </ButtonGroup>
              }
            </VStack>
          </Center>
          {
            team.players.length
            ?
            <PlayersTable team={team} />
            :
            <Center>
              <Text fontSize='lg' my={20}>No players have been added yet!</Text>
            </Center>
          }
          {
            (Auth.loggedIn() && Auth.getProfile().data._id === team.createdBy._id)
            &&
            <Center mt={5}>
              <Button
                boxShadow='xl'
                colorScheme='blue'
                type="button"
                onClick={onPlayerOpen}
              >
                <Icon
                  as={IoMdAddCircle}
                  mr={1}
                />
                Add Player
              </Button>
            </Center>
          }
          <TeamModal
            action='update'
            currentTeam={team}
            isOpen={isTeamOpen}
            onClose={onTeamClose}
          />
          <PlayerModal
            action='create'
            currentTeam={team}
            isOpen={isPlayerOpen}
            onClose={onPlayerClose}
          />
        </Box>    
      }     
    </>
  );
}