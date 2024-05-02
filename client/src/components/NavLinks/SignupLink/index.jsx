import { Link as ChakraLink, Icon } from '@chakra-ui/react';
import { FaUserPlus } from 'react-icons/fa6';

export default function SignupLink({ onSignupOpen }) {
  return (
    <ChakraLink
      className='navLink'
      onClick={onSignupOpen}
    >
      <Icon
        as={FaUserPlus}
        position='relative'
        top='2px'
        mr={1}
      />
      Sign Up
    </ChakraLink>
  );
}
