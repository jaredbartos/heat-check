import { Link as ChakraLink, Icon } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

export default function HomeLink() {
  return (
    <ChakraLink
      className='navLink'
      as={ReactRouterLink}
      to='/'
    >
      <Icon
        as={FaHome}
        position='relative'
        top='2px'
        mr={1}
      />
      Home
    </ChakraLink>
  );
}
