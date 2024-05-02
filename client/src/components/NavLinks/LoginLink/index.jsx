import { Link as ChakraLink, Icon } from '@chakra-ui/react';
import { MdLogin } from 'react-icons/md';

export default function LoginLink({ onLoginOpen }) {
  return (
    <ChakraLink
      className='navLink'
      onClick={onLoginOpen}
    >
      <Icon
        as={MdLogin}
        position='relative'
        top='2px'
        mr={1}
      />
      Login
    </ChakraLink>
  );
}
