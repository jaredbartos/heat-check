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

export default function TeamCard({ teamId, players, teamName, league }) {
  const playerLinks = players.map((player) => {
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
      </Tr>
      
      
    );
  });

  return (
    <>
      <Box m={5} p={5} borderWidth={2} w={432} borderRadius={20}>
        <ChakraLink
          as={ReactRouterLink}
          to={`/team/${teamId}`}
          >
            <Heading as='h3' size='md' mb={3} textAlign='center'>
              {teamName} ({league})
            </Heading>
        </ChakraLink>
        {
          players.length
          ?
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Number</Th>
                  <Th>Name</Th>
                  <Th>Position</Th>
                </Tr>
              </Thead>
              <Tbody>
                {playerLinks}
              </Tbody>
            </Table>
          </TableContainer>
          :
          <p>No players have been added to this team yet!</p>
        }
      </Box>
    </>
  );
}