import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Link as ChakraLink,
  HStack,
  useDisclosure
} from '@chakra-ui/react';
import Auth from '../../utils/auth';
import LoginModal from '../LoginModal';

export default function Nav() {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose
  } = useDisclosure();

  return (
    <>
      <nav>
        <HStack spacing={12}>
        <ChakraLink as={ReactRouterLink} to="/">Home</ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/teams">Teams</ChakraLink>
        {
          Auth.loggedIn()
          ?
          <ChakraLink as={ReactRouterLink} to="/dashboard">Your Dashboard</ChakraLink>
          :
          <ChakraLink onClick={onLoginOpen}>Login</ChakraLink>
        }
        {
          Auth.loggedIn()
          ?
          <ChakraLink href="/" id="logout" onClick={() => Auth.logout()}>Logout</ChakraLink>
          :
          <ChakraLink as={ReactRouterLink} to="/signup">Signup</ChakraLink>
        }
        </HStack>       
      </nav>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={onLoginClose}
      />
    </>
  );
}




