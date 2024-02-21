import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Link as ChakraLink,
  HStack,
  useDisclosure
} from '@chakra-ui/react';
import Auth from '../../utils/auth';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';

export default function Nav() {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose
  } = useDisclosure();

  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose
  } = useDisclosure();

  return (
    <>
      <nav>
        <HStack color='custom.blueGreen' spacing={12}>
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
            <ChakraLink onClick={onSignupOpen}>Signup</ChakraLink>
          }
        </HStack>       
      </nav>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={onLoginClose}
      />
      <SignupModal
        isOpen={isSignupOpen}
        onClose={onSignupClose}
      />
    </>
  );
}




