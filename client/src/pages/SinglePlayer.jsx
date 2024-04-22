import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_SINGLE_PLAYER } from '../utils/queries/player';
import { DELETE_PLAYER } from '../utils/mutations';
import PerformanceTable from '../components/PerformanceTable';
import PerformanceModal from '../components/PerformanceModal';
import PlayerModal from '../components/PlayerModal';
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
  Icon,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor
} from '@chakra-ui/react';
import { IoMdAddCircle } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from '../components/NotFound';

export default function SinglePlayer() {
  // Destructure id param
  const { id } = useParams();

  // Query player using id param
  const { loading: loadingPlayer, data: playerData } = useQuery(
    GET_SINGLE_PLAYER,
    { variables: { id } }
  );

  const [deletePlayer] = useMutation(DELETE_PLAYER);
  const [player, setPlayer] = useState();
  const [performances, setPerformances] = useState([]);
  const [averages, setAverages] = useState();
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
      setPerformances(playerData.player.performances);
      setAverages(playerData.player.averages);
    }
  }, [playerData]);

  // Handler for delete player button
  const handleDelete = async e => {
    e.preventDefault();
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
  };

  // AveragesTable component
  const AveragesTable = ({ averages }) => {
    return (
      <TableContainer
        borderWidth={2}
        borderRadius={20}
        boxShadow="md"
        mt={5}
        mb={10}
      >
        <Table>
          <Thead bgColor="custom.red">
            <Tr>
              <Th color="white">PPG</Th>
              <Th color="white">RPG</Th>
              <Th color="white">APG</Th>
              <Th color="white">SPG</Th>
              <Th color="white">BPG</Th>
              <Th color="white">TPG</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{averages.avgPoints.toFixed(1)}</Td>
              <Td>{averages.avgRebounds.toFixed(1)}</Td>
              <Td>{averages.avgAssists.toFixed(1)}</Td>
              <Td>{averages.avgSteals.toFixed(1)}</Td>
              <Td>{averages.avgBlocks.toFixed(1)}</Td>
              <Td>{averages.avgTurnovers.toFixed(1)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  const PercentagesTable = ({ percentages }) => {
    return (
      <Box w={['100%', 350]}>
        <TableContainer
          borderWidth={2}
          borderRadius={20}
          boxShadow="md"
          mt={5}
          mb={10}
        >
          <Table>
            <Thead bgColor="custom.red">
              <Tr>
                <Th color="white">FG%</Th>
                <Th color="white">3P%</Th>
                <Th color="white">FT%</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{percentages.fgPercentage.toFixed(1)}</Td>
                <Td>{percentages.threePtPercentage.toFixed(1)}</Td>
                <Td>{percentages.ftPercentage.toFixed(1)}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <>
      {loadingPlayer && (
        <Box h={500}>
          <LoadingSpinner />
        </Box>
      )}
      {player && (
        <Flex justify="center">
          <Box w={['95%', null, null, null, 1200]} m={12}>
            <Heading color="custom.blue" as="h2" size="lg" mb={2}>
              {player.firstName} {player.lastName} #{player.number}
            </Heading>
            <Text fontSize="xl" mb={2}>
              Team:{' '}
              <ChakraLink
                as={ReactRouterLink}
                to={`/team/${player.team._id}`}
                _hover={{
                  textDecoration: 'underline'
                }}
              >
                {player.team.name} ({player.team.league.name})
              </ChakraLink>
            </Text>
            <Text fontSize="xl" mb={2}>
              Position: {player.position}
            </Text>
            <Text fontSize="xl" mb={2}>
              Height: {player.height || 'N/A'}
            </Text>
            <Text fontSize="xl" mb={2}>
              Weight: {player.weight || 'N/A'}
            </Text>
            {Auth.loggedIn() &&
              Auth.getProfile().data._id === player.createdBy._id && (
                <ButtonGroup mb={5}>
                  <Button
                    boxShadow="xl"
                    colorScheme="blue"
                    type="button"
                    onClick={onPlayerOpen}
                  >
                    <Icon as={FaEdit} mr={1} />
                    Edit Player
                  </Button>
                  <Popover>
                    {({ isOpen, onClose }) => (
                      <>
                        <PopoverTrigger>
                          <Button
                            boxShadow="xl"
                            colorScheme="red"
                            type="button"
                          >
                            <Icon as={TiDelete} boxSize={6} />
                            Delete Player
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverHeader color="custom.blue">
                            Confirmation
                          </PopoverHeader>
                          <PopoverArrow />
                          <PopoverBody>
                            Are you sure you want to delete {player.firstName}{' '}
                            {player.lastName}?
                            <Text mt={1} color="red">
                              This action will also delete all of this
                              individual's games and cannot be undone.
                            </Text>
                          </PopoverBody>
                          <PopoverFooter
                            border="0"
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            <ButtonGroup>
                              <Button
                                size="sm"
                                boxShadow="md"
                                mr={2}
                                onClick={onClose}
                              >
                                Cancel
                              </Button>
                              <Button
                                colorScheme="red"
                                size="sm"
                                boxShadow="xl"
                                mr={1}
                                onClick={handleDelete}
                              >
                                Delete
                              </Button>
                            </ButtonGroup>
                          </PopoverFooter>
                        </PopoverContent>
                      </>
                    )}
                  </Popover>
                </ButtonGroup>
              )}
            {loadingPlayer && <LoadingSpinner />}
            {averages && (
              <>
                <AveragesTable averages={averages} />
                <PercentagesTable percentages={player.percentages} />
              </>
            )}
            <HStack>
              <Heading as="h3" size="md" color="custom.blue" mt={3} mb={3}>
                Game Log
              </Heading>
              {Auth.loggedIn() &&
                Auth.getProfile().data._id === player.createdBy._id && (
                  <Button
                    boxShadow="xl"
                    colorScheme="blue"
                    size="xs"
                    type="button"
                    onClick={onPerformanceOpen}
                  >
                    <Icon as={IoMdAddCircle} mr={1} />
                    Add Game
                  </Button>
                )}
            </HStack>
            {loadingPlayer ? (
              <LoadingSpinner />
            ) : (
              <PerformanceTable
                performances={performances}
                createdBy={player.createdBy._id}
              />
            )}

            <PlayerModal
              currentPlayer={player}
              action="update"
              isOpen={isPlayerOpen}
              onClose={onPlayerClose}
            />
            <PerformanceModal
              currentPlayer={player}
              action="create"
              isOpen={isPerformanceOpen}
              onClose={onPerformanceClose}
            />
          </Box>
        </Flex>
      )}
      {!loadingPlayer && !player && <NotFound variation="Player" />}
    </>
  );
}
