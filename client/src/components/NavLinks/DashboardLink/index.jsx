import { Link as ChakraLink, Icon } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { AiFillDashboard } from 'react-icons/ai';

export default function DashboardLink() {
  return (
    <ChakraLink
      className='navLink'
      as={ReactRouterLink}
      to='/dashboard'
    >
      <Icon
        as={AiFillDashboard}
        position='relative'
        top='2px'
        mr={1}
      />
      Your Dashboard
    </ChakraLink>
  );
}
