import { Link as ReactRouterLink, useNavigate} from 'react-router-dom';
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
  Text,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export default function TeamCard({ teamId, players, teamName, league }) {
  const navigate = useNavigate();
  const playersCopy = [...players];
  const sortedPlayers = playersCopy.sort((a, b) => a.number - b.number);
  const playerLinks = sortedPlayers.map((player) => {
    return (
      <Tr
        key={player._id}
        onClick={() => navigate(`/player/${player._id}`)}
        className='player-row'
      >
        <Td>{player.number}</Td>
        <Td>
          {player.firstName} {player.lastName}
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
        borderRadius={20}
        boxShadow='xl'
        w={['100%', 400]}
        bgColor='white'
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
          <TableContainer borderBottomRadius={20}>
            <Table variant='simple'>
              <Thead
                bgColor='custom.red'
                onClick={() => navigate(`/team/${teamId}`)}
                _hover={{ cursor: 'pointer' }}
              >
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
          <Text
            bgColor='white'
            borderBottomRadius={20}
            my={30}
            p={3}
            textAlign='center'
          >
            No players have been added to this team yet!
          </Text>
        }
      </Box>
    </>
  );
}