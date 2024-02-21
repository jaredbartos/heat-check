import { formatDate } from '../../utils/dates';
import { DELETE_PERFORMANCE } from '../../utils/mutations';
import { GET_PERFORMANCES_BY_PLAYER, GET_SINGLE_PLAYER } from '../../utils/queries';
import PerformanceModal from '../PerformanceModal';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
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
  Icon
} from '@chakra-ui/react';
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

export default function PerformanceTable({ performances }) {
  const [selectedPerformance, setSelectedPerformance] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deletePerformance] = useMutation(DELETE_PERFORMANCE, {
    refetchQueries: [
      GET_SINGLE_PLAYER,
      GET_PERFORMANCES_BY_PLAYER
    ]
  });

  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (confirm('Are you sure you want to delete this game?')) {
      try {
        await deletePerformance({
          variables: {
            _id: id
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Create rows for performances
  const performanceList = performances.map((performance) => {
    return (
      <Tr key={performance._id}>
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
            (Auth.loggedIn() && Auth.getProfile().data._id === performance.createdBy._id)
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
                <Button
                  boxShadow='xl'
                  colorScheme='red'
                  type="button"
                  className="deletePerformanceBtn"
                  onClick={(e) => handleDelete(e, performance._id)}
                >
                  <Icon as={TiDelete} boxSize={4} />
                </Button>
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
      <Box w={1020}>
        <TableContainer borderWidth={2} borderRadius={20} boxShadow='md'>
          <Table size='sm'>
            <Thead bgColor='custom.red'>
              <Tr>
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