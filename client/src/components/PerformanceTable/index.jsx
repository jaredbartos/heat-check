import { formatDate } from '../../utils/dates';
import { DELETE_PERFORMANCE } from '../../utils/mutations';
import {
  GET_AVG_PERFORMANCE_BY_PLAYER,
  GET_PERFORMANCES_BY_PLAYER,
  GET_SINGLE_PLAYER
} from '../../utils/queries';
import PerformanceModal from '../PerformanceModal';
import DeletePerformanceModal from '../DeletePerformanceModal';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  ButtonGroup,
  Button,
  Box,
  useDisclosure,
  Text,
  Icon,
  Link as ChakraLink,
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
import { FaEdit } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { selectRecentChanges } from '../../utils/globalState/slices/recentChangesSlice';

// PerformanceTable component
export default function PerformanceTable({ isRanking, performances }) {
  // Get recentChanges state from Redux
  const recentChanges = useSelector(selectRecentChanges);
  const [selectedPerformance, setSelectedPerformance] = useState();
  // Get viewport width
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  // Disclosure for update performance modal
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose
  } = useDisclosure();

  // Disclosure for delete performance modal used for mobile viewports
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure();

  // Prepare delete performance mutation
  const [deletePerformance] = useMutation(DELETE_PERFORMANCE, {
    refetchQueries: [
      GET_SINGLE_PLAYER,
      GET_PERFORMANCES_BY_PLAYER,
      GET_AVG_PERFORMANCE_BY_PLAYER
    ]
  });

  // Handler for delete button for each performance
  const handleDelete = async (e, id) => {
    e.preventDefault();

    try {
      await deletePerformance({
        variables: {
          _id: id
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Create rows for performances
  const performanceList = performances.map(performance => {
    return (
      <Tr
        key={performance._id}
        _hover={{
          bgColor: 'gray',
          color: 'white'
        }}
        className={
          // Animate and highlight row if performance is new
          recentChanges.includes(performance._id) && 'from-left highlight'
        }
      >
        {
          // If isRanking prop returns true,
          // add names and teams to performances
          // because the table will be used outside player page
          isRanking && (
            <>
              <Td>
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/player/${performance.player._id}`}
                  _hover={{
                    textDecoration: 'underline'
                  }}
                >
                  {performance.player.firstName} {performance.player.lastName}
                </ChakraLink>
              </Td>
              <Td>
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/team/${performance.player.team._id}`}
                  _hover={{
                    textDecoration: 'underline'
                  }}
                >
                  {performance.player.team.name}
                </ChakraLink>
              </Td>
            </>
          )
        }
        <Td>{formatDate(performance.date)}</Td>
        <Td isNumeric>{performance.fgAtt}</Td>
        <Td isNumeric>{performance.fgMade}</Td>
        <Td isNumeric>{performance.threePtAtt}</Td>
        <Td isNumeric>{performance.threePtMade}</Td>
        <Td isNumeric>{performance.ftAtt}</Td>
        <Td isNumeric>{performance.ftMade}</Td>
        <Td isNumeric>{performance.offReb}</Td>
        <Td isNumeric>{performance.rebounds}</Td>
        <Td isNumeric>{performance.assists}</Td>
        <Td isNumeric>{performance.steals}</Td>
        <Td isNumeric>{performance.blocks}</Td>
        <Td isNumeric>{performance.turnovers}</Td>
        <Td isNumeric>{performance.points}</Td>
        {
          // Only allow user to edit or delete if they created the entry and the table is on the player page
          Auth.loggedIn() &&
          Auth.getProfile().data._id === performance.createdBy._id &&
          !isRanking ? (
            <Td>
              <ButtonGroup size="xs">
                <Button
                  boxShadow="xl"
                  colorScheme="blue"
                  type="button"
                  className="editPerformanceBtn"
                  onClick={() => {
                    // Set performance to be passed through and open modal
                    setSelectedPerformance(performance);
                    onUpdateOpen();
                  }}
                >
                  <Icon as={FaEdit} />
                </Button>
                {width < 1100 ? (
                  <Button
                    boxShadow="xl"
                    colorScheme="red"
                    type="button"
                    className="deletePerformanceBtn"
                    onClick={() => {
                      setSelectedPerformance(performance);
                      onDeleteOpen();
                    }}
                  >
                    <Icon as={TiDelete} boxSize={4} />
                  </Button>
                ) : (
                  <Popover>
                    {({ isOpen, onClose }) => (
                      <>
                        <PopoverTrigger>
                          <Button
                            boxShadow="xl"
                            colorScheme="red"
                            type="button"
                            className="deletePerformanceBtn"
                          >
                            <Icon as={TiDelete} boxSize={4} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverHeader color="custom.blue">
                            Confirmation
                          </PopoverHeader>
                          <PopoverArrow />
                          <PopoverBody color="black">
                            Are you sure you want to delete this game?
                            <Text mt={3} color="red">
                              This action cannot be undone.
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
                                onClick={e => handleDelete(e, performance._id)}
                              >
                                Delete
                              </Button>
                            </ButtonGroup>
                          </PopoverFooter>
                        </PopoverContent>
                      </>
                    )}
                  </Popover>
                )}
              </ButtonGroup>
            </Td>
          ) : (
            <Td></Td>
          )
        }
      </Tr>
    );
  });

  return (
    <>
      {performances.length ? (
        <Box w={['95%', null, null, null, null, '1200px']}>
          <TableContainer borderWidth={2} borderRadius={20} boxShadow="md">
            <Table size="sm">
              <Thead bgColor="custom.red">
                <Tr>
                  {isRanking && (
                    <>
                      <Th color="white">Name</Th>
                      <Th color="white">Team</Th>
                    </>
                  )}
                  <Th color="white">DATE</Th>
                  <Th color="white" textAlign="right">
                    FGA
                  </Th>
                  <Th color="white" textAlign="right">
                    FGM
                  </Th>
                  <Th color="white" textAlign="right">
                    3PA
                  </Th>
                  <Th color="white" textAlign="right">
                    3PM
                  </Th>
                  <Th color="white" textAlign="right">
                    FTA
                  </Th>
                  <Th color="white" textAlign="right">
                    FTM
                  </Th>
                  <Th color="white" textAlign="right">
                    OREB
                  </Th>
                  <Th color="white" textAlign="right">
                    TREB
                  </Th>
                  <Th color="white" textAlign="right">
                    AST
                  </Th>
                  <Th color="white" textAlign="right">
                    STL
                  </Th>
                  <Th color="white" textAlign="right">
                    BLK
                  </Th>
                  <Th color="white" textAlign="right">
                    TO
                  </Th>
                  <Th color="white" textAlign="right">
                    PTS
                  </Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>{performanceList}</Tbody>
            </Table>
          </TableContainer>
          <PerformanceModal
            currentPerformance={selectedPerformance}
            action="update"
            isOpen={isUpdateOpen}
            onClose={onUpdateClose}
          />
          <DeletePerformanceModal
            performanceId={selectedPerformance?._id}
            handleDelete={handleDelete}
            isOpen={isDeleteOpen}
            onClose={onDeleteClose}
          />
        </Box>
      ) : (
        <Text>This player has no games played!</Text>
      )}
    </>
  );
}
