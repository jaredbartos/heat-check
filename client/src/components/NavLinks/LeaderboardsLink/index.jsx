import { Link as ChakraLink, Icon } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { MdLeaderboard } from 'react-icons/md';

export default function LeaderboardsLink() {
  return (
    <ChakraLink
      className='navLink'
      as={ReactRouterLink}
      to='/leaderboards'
    >
      <Icon
        as={MdLeaderboard}
        position='relative'
        top='2px'
        mr={1}
      />
      Leaderboards
    </ChakraLink>
  );
}
