import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_SINGLE_PLAYER } from "../utils/queries";
import { DELETE_PLAYER } from "../utils/mutations";
import PerformanceTable from "../components/PerformanceTable";
import PerformanceForm from "../components/PerformanceForm";
import PlayerForm from "../components/PlayerForm";
import { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Link as ChakraLink,
  Heading,
  Text,
  Box,
  Center,
  VStack,
  HStack,
  Button,
  ButtonGroup
} from '@chakra-ui/react';

export default function SinglePlayer() {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_SINGLE_PLAYER, {
    variables: { id }
  });
  const [deletePlayer] = useMutation(DELETE_PLAYER);
  const [player, setPlayer] = useState();
  const [perfFormVisible, setPerfFormVisible] = useState(false);
  const [playerFormVisible, setPlayerFormVisible] = useState(false);

  // Set useEffect to set player value to prepare
  // for future retrieval from indexedDB for PWA
  useEffect(() => {
    if (data) {
      setPlayer(data.player);
    }
  }, [data, setPlayer]);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (confirm(`Are you sure you want to delete ${player.firstName} ${player.lastName}?`)) {
      try {
        await deletePlayer({
          variables: {
            _id: player._id
          }
        });
      } catch (err) {
        console.log(err);
      }
      location.replace(`/team/${player.team._id}`);
    }  
  };

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <>
      {
        player
        &&
        <Box m={12}>
          <Heading as='h2' size='lg' mb={2}>{player.firstName} {player.lastName} #{player.number}</Heading>
          <Text fontSize='xl' mb={2}>
            Team:{' '}
            <ChakraLink as={ReactRouterLink} to={`/team/${player.team._id}`}>
              {player.team.name} ({player.team.league})
            </ChakraLink>
          </Text>
          <Text fontSize='xl' mb={2}>Position: {player.position}</Text>
          <Text fontSize='xl' mb={2}>Height: {player.height}</Text>
          <Text fontSize='xl' mb={2}>Weight: {player.weight}</Text>
          {
            (Auth.loggedIn() && Auth.getProfile().data._id === player.createdBy._id)
            &&
            <ButtonGroup mb={5}>
              <Button
                type="button"
                onClick={() => setPlayerFormVisible(true)}
              >
                Edit Player
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
              >
                Delete Player
              </Button>
            </ButtonGroup>
          }
          {
            playerFormVisible
            &&
            <PlayerForm 
              makeFormInvisible={() => setPlayerFormVisible(false)}
              currentPlayer={player}
              action='update'
            />
          }
          <HStack>
          <Heading as='h3' size='md' mt={3} mb={3}>Game Log</Heading>
          {
            (Auth.loggedIn() && Auth.getProfile().data._id === player.createdBy._id)
            &&
            <Button
              size='xs'
              type='button'
              onClick={() => setPerfFormVisible(true)}
            >
              Add Game
            </Button>
          }
          </HStack>
          {
            perfFormVisible
            &&
            <PerformanceForm
              currentPlayer={player}
              action='create'
              makeFormInvisible={() => setPerfFormVisible(false)}
            />
          }
          <PerformanceTable
            player={player}
          />
        </Box>     
      }      
    </>
  );
}