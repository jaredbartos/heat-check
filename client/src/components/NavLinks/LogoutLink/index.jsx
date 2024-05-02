import { Link as ChakraLink, Icon } from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';
import Auth from '../../../utils/auth';

export default function LogoutLink() {
  return (
    <ChakraLink
      className='navLink'
      href='/'
      id='logout'
      onClick={() => Auth.logout()}
    >
      <Icon
        as={MdLogout}
        position='relative'
        top='2px'
        mr={1}
      />
      Logout
    </ChakraLink>
  );
}
