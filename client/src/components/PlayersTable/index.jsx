import { Link as ReactRouterLink} from 'react-router-dom';
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

export default function PlayersTable({ team }) {
  const playersCopy = [...team.players];
  const sortedPlayers = playersCopy.sort((a, b) => a.number - b.number);
  const playerList = sortedPlayers.map((player) => {
    return (
      <Tr key={player._id}>
        <Td>{player.number}</Td>
        <Td>
          <ChakraLink
              as={ReactRouterLink}
              to={`/player/${player._id}`}
            >
              {player.firstName} {player.lastName}
            </ChakraLink>
        </Td>
        <Td>{player.position}</Td>
        <Td>{player.height}</Td>
        <Td>{player.weight}</Td>
      </Tr>
    );
  })

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
      <Tbody>
        {playerList}
      </Tbody>
    </Table>
  </TableContainer>
  );
}