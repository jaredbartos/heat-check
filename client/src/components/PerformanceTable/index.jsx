import { formatDate } from '../../utils/dates';
import { DELETE_PERFORMANCE } from '../../utils/mutations';
import { GET_SINGLE_PLAYER } from '../../utils/queries';
import PerformanceForm from '../PerformanceForm';
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
  Box
} from '@chakra-ui/react';

export default function PerformanceTable({ player }) {
  const [formVisible, setFormVisible] = useState(false)
  const [selectedPerformance, setSelectedPerformance] = useState();

  const [deletePerformance] = useMutation(DELETE_PERFORMANCE, {
    refetchQueries: [
      GET_SINGLE_PLAYER
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
  }

  // Create copy of performance array and sort it by date
  const performancesCopy = [...player.performances];
  const sortedPerformances = performancesCopy.sort((a, b) => Number(b.date) - Number(a.date));
  const performanceList = sortedPerformances.map((performance) => {
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
            (Auth.loggedIn() && Auth.getProfile().data._id === player.createdBy._id)
            &&
            <Td>
              <ButtonGroup size='xs'>
                <Button
                  type="button"
                  className="editPerformanceBtn"
                  onClick={() => {
                      setFormVisible(true);
                      setSelectedPerformance(performance);
                    }
                  }
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  className="deletePerformanceBtn"
                  onClick={(e) => handleDelete(e, performance._id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Td>
            }
      </Tr>
    );
  })

  return (
    <>
    {
      player.performances
      ?
      <Box w={1000}>
        <TableContainer>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>DATE</Th>
                <Th>FGA</Th>
                <Th>FGM</Th>
                <Th>3PA</Th>
                <Th>3PM</Th>
                <Th>FTA</Th>
                <Th>FTM</Th>
                <Th>OREB</Th>
                <Th>TREB</Th>
                <Th>AST</Th>
                <Th>STL</Th>
                <Th>BLK</Th>
                <Th>TO</Th>
                <Th>PTS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {performanceList}
            </Tbody>    
          </Table>
        </TableContainer>
        {
          formVisible
          &&
          <PerformanceForm
            makeFormInvisible={() => setFormVisible(false)}
            currentPerformance={selectedPerformance}
            action='update'
          />
        }
      </Box>
      :
      <p>This player has no games played!</p>
    }    
    </>
  );
}