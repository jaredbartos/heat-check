import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import {
  Link as ChakraLink,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectRecentChanges } from '../../utils/globalState/slices/recentChangesSlice';

// PlayersTable component
export default function PlayersTable({ team }) {
  // Get recentChanges state from Redux
  const recentChanges = useSelector(selectRecentChanges);
  // Use navigate for redirecting links
  const navigate = useNavigate();

  // Create player rows
  const playerList = team.players.map(player => {
    return (
      <Tr
        key={player._id}
        className={
          // If player is in recentChanges,
          // animate and highlight row
          recentChanges.includes(player._id)
            ? 'player-row from-left highlight'
            : 'player-row'
        }
        // Set entire row to navigate to the player page
        onClick={() => navigate(`/player/${player._id}`)}
      >
        <Td>{player.number}</Td>
        <Td>
          {player.firstName} {player.lastName}
        </Td>
        <Td>{player.position}</Td>
        <Td>{player.height || 'N/A'}</Td>
        <Td>{player.weight || 'N/A'}</Td>
      </Tr>
    );
  });

  return (
    <TableContainer
      boxShadow='md'
      borderWidth={2}
      borderRadius={20}
      mt={5}
    >
      <Table variant='simple'>
        <Thead bgColor='custom.red'>
          <Tr>
            <Th color='white'>Number</Th>
            <Th color='white'>Name</Th>
            <Th color='white'>Position</Th>
            <Th color='white'>Height</Th>
            <Th color='white'>Weight</Th>
          </Tr>
        </Thead>
        <Tbody>{playerList}</Tbody>
      </Table>
    </TableContainer>
  );
}
