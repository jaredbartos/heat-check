import { Link as ChakraLink, Icon } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { HiUserGroup } from 'react-icons/hi';

export default function TeamsLink() {
  return (
    <ChakraLink
      className='navLink'
      as={ReactRouterLink}
      to='/teams'
    >
      <Icon
        as={HiUserGroup}
        position='relative'
        top='2px'
        mr={1}
      />
      Teams
    </ChakraLink>
  );
}
