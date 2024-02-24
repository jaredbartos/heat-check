import { useParams } from 'react-router-dom';
import {
  GET_SINGLE_TEAM,
  GET_AVG_PLAYER_PERFORMANCE_BY_TEAM
} from '../utils/queries';
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
  Icon,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  HStack,
  Wrap,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import LoadingSpinner from '../components/LoadingSpinner';

export default function SingleTeam() {
  const { id } = useParams();
  const [team, setTeam] = useState();
  const [averages, setAverages] = useState([]);
  const [deleteTeam] = useMutation(DELETE_TEAM);
  const {
    loading: loadingTeam,
    data: teamData
  } = useQuery(GET_SINGLE_TEAM, { variables: { id } });
  const {
    loading: loadingAverages,
    data: averagesData
  } = useQuery(GET_AVG_PLAYER_PERFORMANCE_BY_TEAM, { variables: { id } })
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
    if (teamData) {
      setTeam(teamData.team);
    }
    if (averagesData) {
      setAverages(averagesData.avgPlayerPerformanceByTeam);
    }
  }, [teamData, averagesData, setAverages, setTeam]);

  const handleDelete = async (e) => {
    e.preventDefault();
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
  };

  const AveragesTable = ({ children }) => {
    return (
      <TableContainer
        borderWidth={2}
        borderRadius={20}
        boxShadow='md'
        mt={5}
      >
        <Table variant='simple'>
          <Thead bgColor='custom.red'>
            <Tr>
              <Th color='white'>Name</Th>
              <Th
                color='white'
                textAlign='right'
              >
                PPG
              </Th>
              <Th
                color='white'
                textAlign='right'
              >
                RPG
              </Th>
              <Th
                color='white'
                textAlign='right'
              >
                APG
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {children}           
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  const AveragesTableContent = ({ averages }) => {
    const averagesCopy = [...averages];
    const sortedAverages = averagesCopy.sort((a, b) => b.avgPoints - a.avgPoints);
    return sortedAverages.map((average) => {
      return (
        <Tr key={average._id}>
          <Td>
            <ChakraLink
              as={ReactRouterLink}
              to={`/player/${average._id}`}
            >
              {average.firstName} {average.lastName}
            </ChakraLink>
          </Td>
          <Td isNumeric>{average.avgPoints.toFixed(1)}</Td>
          <Td isNumeric>{average.avgRebounds.toFixed(1)}</Td>
          <Td isNumeric>{average.avgAssists.toFixed(1)}</Td>
        </Tr>
      );
    });
  };
  

  return (
    <>
      {
        loadingTeam
        &&
        <Box h={600}>
          <LoadingSpinner />
        </Box>       
      }
      {
        team
        &&
        <Flex justify='center'>
          <Box w={['95%', null, 1050]} m={8}>
            <Center>
              <VStack>
                <Heading as='h2' color='custom.blue' mb={2} size='xl'>{team.name}</Heading>
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
                    <Popover>
                      {({ isOpen, onClose }) => (
                        <>
                          <PopoverTrigger>
                            <Button
                              boxShadow='xl'
                              colorScheme='red'
                              type="button"
                            >
                              <Icon
                                as={TiDelete}
                                boxSize={6}
                              />
                              Delete Team
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverHeader color='custom.blueGreen'>
                              Confirmation
                            </PopoverHeader>
                            <PopoverArrow />
                            <PopoverBody>
                              Are you sure you want to delete the {team.name} ({team.league})?
                              <Text
                                mt={1}
                                color='red'
                              >
                                This will also delete all of this team's players
                                and their individual games. This action cannot be undone.
                              </Text> 
                            </PopoverBody>
                            <PopoverFooter
                              border='0'
                              display='flex'
                              alignItems='center'
                              justifyContent='flex-end'
                            >
                              <ButtonGroup>
                                <Button
                                  size='sm'
                                  boxShadow='md'
                                  mr={2}
                                  onClick={onClose}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  colorScheme='red'
                                  size='sm'
                                  boxShadow='xl'
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
              </VStack>
            </Center>
            <Flex justify={['center', null, null, 'space-between']} flexWrap='wrap'>
              {
                team.players.length
                ?
                <PlayersTable team={team} />
                :
                <Box w='100%'>
                  <Center>
                    <Text fontSize='lg' my={20}>No players have been added yet!</Text>
                  </Center>
                </Box>
              }
              {
                loadingAverages && averages.length === 0
                &&
                <Box w={400} h={450}>
                  <LoadingSpinner />
                </Box>
              }
              {
                averages.length !== 0
                &&
                <AveragesTable>
                  <AveragesTableContent averages={averages} />
                </AveragesTable>
              }
            </Flex>
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
        </Flex>  
      }     
    </>
  );
}