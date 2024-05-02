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
import { Link as ReactRouterLink } from 'react-router-dom';

export default function LeadersCard({ category, leaders, type }) {
  // Set title of card based on category value
  let title;
  switch (category) {
    case 'fgAtt':
      title = 'FG Att';
      break;
    case 'fgMade':
      title = 'FG Made';
      break;
    case 'threePtAtt':
      title = '3P Att';
      break;
    case 'threePtMade':
      title = '3P Made';
      break;
    case 'ftAtt':
      title = 'FT Att';
      break;
    case 'ftMade':
      title = 'FT Made';
      break;
    case 'offReb':
      title = 'Off Reb';
      break;
    case 'rebounds':
      title = 'Rebounds';
      break;
    case 'assists':
      title = 'Assists';
      break;
    case 'steals':
      title = 'Steals';
      break;
    case 'blocks':
      title = 'Blocks';
      break;
    case 'turnovers':
      title = 'Turnovers';
      break;
    case 'points':
      title = 'Points';
      break;
    case 'fgPercentage':
      title = 'Field Goal %';
      break;
    case 'threePtPercentage':
      title = '3 Point %';
      break;
    case 'ftPercentage':
      title = 'Free Throw %';
  }

  let heading;
  if (type === 'avg') {
    heading = `Avg ${title}`;
  } else if (type === 'total') {
    heading = `Total ${title}`;
  }

  const leaderList = leaders.map(leader => {
    return (
      <Tr
        key={leader._id}
        _hover={{
          bgColor: 'gray',
          color: 'white'
        }}
      >
        <Td>
          {leader.player.firstName} {leader.player.lastName}
        </Td>
        <Td>
          {leader.player.team.name} ({leader.player.team.league.name})
        </Td>
        <Td isNumeric>{leader['player']['averages'][category].toFixed(1)}</Td>
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
        w={['100%', 600]}
        boxShadow='xl'
        bgColor='white'
      >
        <Heading
          as='h3'
          borderTopRadius={20}
          bgColor='custom.red'
          size='md'
          pb={3}
          pt={2}
          textAlign='center'
          color='white'
        >
          {heading}
        </Heading>
        <TableContainer
          boxShadow='md'
          borderBottomRadius={20}
        >
          <Table variant='simple'>
            <Thead bgColor='custom.red'>
              <Tr>
                <Th color='white'>Player</Th>
                <Th color='white'>Team</Th>
                <Th
                  color='white'
                  isNumeric
                >
                  {title}
                </Th>
              </Tr>
            </Thead>
            <Tbody>{leaderList}</Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
