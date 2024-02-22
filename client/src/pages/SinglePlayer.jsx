import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_SINGLE_PLAYER, GET_PERFORMANCES_BY_PLAYER } from "../utils/queries";
import { DELETE_PLAYER } from "../utils/mutations";
import PerformanceTable from "../components/PerformanceTable";
import PerformanceModal from "../components/PerformanceModal";
import PlayerModal from "../components/PlayerModal";
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
  ButtonGroup,
  useDisclosure,
  Icon
} from '@chakra-ui/react';
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

export default function SinglePlayer() {
  const { id } = useParams();
  const {
    loading: loadingPlayer,
    data: playerData,
  } = useQuery(GET_SINGLE_PLAYER, { variables: { id } });

  const {
    loading: loadingPerformances,
    data: performancesData,
  } = useQuery(GET_PERFORMANCES_BY_PLAYER, { variables: { id } });

  const [deletePlayer] = useMutation(DELETE_PLAYER);
  const [player, setPlayer] = useState();
  const [performances, setPerformances] = useState([]);
  const {
    isOpen: isPlayerOpen,
    onOpen: onPlayerOpen,
    onClose: onPlayerClose
  } = useDisclosure();
  const {
    isOpen: isPerformanceOpen,
    onOpen: onPerformanceOpen,
    onClose: onPerformanceClose
  } = useDisclosure();

  // Set useEffect to set player value to prepare
  // for future retrieval from indexedDB for PWA
  useEffect(() => {
    if (playerData) {
      setPlayer(playerData.player);
    }
    if (performancesData) {
      setPerformances(performancesData.performancesByPlayer)
    }
  }, [playerData, performancesData, setPlayer, setPerformances]);

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

  if (loadingPlayer || loadingPerformances) {
    return <h3>Loading...</h3>
  }

  return (
    <>
      {
        player
        &&
        <Box w={[1000]} m={12}>
          <Heading color='custom.blueGreen' as='h2' size='lg' mt={85} mb={2}>{player.firstName} {player.lastName} #{player.number}</Heading>
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
                boxShadow='xl'
                colorScheme='blue'
                type="button"
                onClick={onPlayerOpen}
              >
                <Icon
                  as={FaEdit}
                  mr={1}
                />
                Edit Player
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
                Delete Player
              </Button>
            </ButtonGroup>
          }
          <HStack>
          <Heading as='h3' size='md' color='custom.blueGreen' mt={3} mb={3}>Game Log</Heading>
          {
            (Auth.loggedIn() && Auth.getProfile().data._id === player.createdBy._id)
            &&
            <Button
              boxShadow='xl'
              colorScheme='blue'
              size='xs'
              type='button'
              onClick={onPerformanceOpen}
            >
              <Icon
                as={IoMdAddCircle}
                mr={1}
              />
              Add Game
            </Button>
          }
          </HStack>
          <PerformanceTable
            performances={performances}
          />
          <PlayerModal
            currentPlayer={player}
            action='update'
            isOpen={isPlayerOpen}
            onClose={onPlayerClose}
          />
          <PerformanceModal
            currentPlayer={player}
            action='create'
            isOpen={isPerformanceOpen}
            onClose={onPerformanceClose}
          />
        </Box>     
      }      
    </>
  );
}