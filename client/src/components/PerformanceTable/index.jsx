import { formatDate } from '../../utils/dates';
import { DELETE_PERFORMANCE } from '../../utils/mutations';
import {
  GET_AVG_PERFORMANCE_BY_PLAYER,
  GET_PERFORMANCES_BY_PLAYER,
  GET_SINGLE_PLAYER
} from '../../utils/queries';
import PerformanceModal from '../PerformanceModal';
import React, { useState } from 'react';
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
  PopoverAnchor,
} from '@chakra-ui/react';
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

export default function PerformanceTable({ isRanking, performances }) {
  const [selectedPerformance, setSelectedPerformance] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deletePerformance] = useMutation(DELETE_PERFORMANCE, {
    refetchQueries: [
      GET_SINGLE_PLAYER,
      GET_PERFORMANCES_BY_PLAYER,
      GET_AVG_PERFORMANCE_BY_PLAYER
    ]
  });

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
  const performanceList = performances.map((performance) => {
    return (
      <Tr key={performance._id}>
        {
          isRanking
          &&
          <>
            <Td>
              <ChakraLink
              as={ReactRouterLink}
              to={`/player/${performance.player._id}`}
              >
                {performance.player.firstName} {performance.player.lastName}
              </ChakraLink>
            </Td>
              <Td>
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/team/${performance.player.team._id}`}
                >
                  {performance.player.team.name}
                </ChakraLink>
              </Td>           
          </>
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
            // Only allow user to edit or delete if they created the entry
            (Auth.loggedIn() && Auth.getProfile().data._id === performance.createdBy._id && !isRanking)
            ?
            <Td>
              <ButtonGroup size='xs'>
                <Button
                  boxShadow='xl'
                  colorScheme='blue'
                  type="button"
                  className="editPerformanceBtn"
                  onClick={() => {
                      setSelectedPerformance(performance);
                      onOpen();
                    }
                  }
                >
                  <Icon as={FaEdit} />
                </Button>
                <Popover>
                  {({ isOpen, onClose }) => (
                    <>
                      <PopoverTrigger>
                        <Button
                          boxShadow='xl'
                          colorScheme='red'
                          type="button"
                          className="deletePerformanceBtn"
                        >
                          <Icon as={TiDelete} boxSize={4} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverHeader color='custom.blueGreen'>
                          Confirmation
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverBody>
                          Are you sure you want to delete this game?
                          <Text
                            mt={3}
                            color='red'
                          >
                            This action cannot be undone.
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
                              onClick={(e) => handleDelete(e, performance._id)}
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
            </Td>
            :
            <Td></Td>
            }
      </Tr>
    );
  })

  return (
    <>
    {
      performances.length
      ?
      <Box w={['95%', null, null, null, null, '1200px']}>
        <TableContainer borderWidth={2} borderRadius={20} boxShadow='md'>
          <Table size='sm'>
            <Thead bgColor='custom.red'>
              <Tr>
                {
                  isRanking
                  &&
                  <>
                    <Th color='white'>Name</Th>
                    <Th color='white'>Team</Th>
                  </>
                }
                <Th color='white'>DATE</Th>
                <Th color='white'>FGA</Th>
                <Th color='white'>FGM</Th>
                <Th color='white'>3PA</Th>
                <Th color='white'>3PM</Th>
                <Th color='white'>FTA</Th>
                <Th color='white'>FTM</Th>
                <Th color='white'>OREB</Th>
                <Th color='white'>TREB</Th>
                <Th color='white'>AST</Th>
                <Th color='white'>STL</Th>
                <Th color='white'>BLK</Th>
                <Th color='white'>TO</Th>
                <Th color='white'>PTS</Th>
                <Th></Th>          
              </Tr>
            </Thead>
            <Tbody>
              {performanceList}
            </Tbody>    
          </Table>
        </TableContainer>
        <PerformanceModal
          currentPerformance={selectedPerformance}
          action='update'
          isOpen={isOpen}
          onClose={onClose}
        />
      </Box>
      :
      <Text>This player has no games played!</Text>
    }    
    </>
  );
}