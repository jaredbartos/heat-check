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

export default function LeadersCard({ category, leaders }) {
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
          <ChakraLink
            as={ReactRouterLink}
            to={`/player/${leader._id}`}
            _hover={{ textDecoration: 'underline' }}
          >
            {leader.firstName} {leader.lastName}
          </ChakraLink>
        </Td>
        <Td>
          <ChakraLink
            as={ReactRouterLink}
            to={`/team/${leader.team._id}`}
            _hover={{ textDecoration: 'underline' }}
          >
            {leader.team.name} ({leader.league})
          </ChakraLink>
        </Td>
        <Td isNumeric>{leader.value.toFixed(1)}</Td>
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
        w={['100%', 1000]}
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
          Leaderboard: {category}
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
                  {category.includes('Percentage')
                    ? category.replace('Percentage', '%')
                    : category.split('Per')[0].trim()}
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
