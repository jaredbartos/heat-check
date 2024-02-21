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
  Box,
  Text
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
      <Box
        m={5}
        p={0}
        borderWidth={2}
        w={432}
        borderRadius={20}
        boxShadow='xl'
      >
        <ChakraLink
          color='white'
          as={ReactRouterLink}
          to={`/team/${teamId}`}
          >
            <Heading as='h3' borderTopRadius={20} bgColor='custom.red' size='md' pb={3} pt={2} textAlign='center'>
              {teamName} ({league})
            </Heading>
        </ChakraLink>
        {
          players.length
          ?
          <TableContainer>
            <Table variant='simple'>
              <Thead bgColor='custom.red'>
                <Tr>
                  <Th color='white'>Number</Th>
                  <Th color='white'>Name</Th>
                  <Th color='white'>Position</Th>
                </Tr>
              </Thead>
              <Tbody>
                {playerLinks}
              </Tbody>
            </Table>
          </TableContainer>
          :
          <Text>No players have been added to this team yet!</Text>
        }
      </Box>
    </>
  );
}