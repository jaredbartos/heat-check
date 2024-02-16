import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Link as ChakraLink,
  HStack
} from '@chakra-ui/react';
import Auth from '../../utils/auth';

export default function Nav() {
  return (
    <>
      <nav>
        <ChakraLink as={ReactRouterLink} to="/">Home</ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/teams">Teams</ChakraLink>
        {
          Auth.loggedIn()
          ?
          <div>
            <ChakraLink as={ReactRouterLink} to="/dashboard">Your Dashboard</ChakraLink>
            <ChakraLink href="/" id="logout" onClick={() => Auth.logout()}>Logout</ChakraLink>
          </div>

          :
          <div>
            <ChakraLink as={ReactRouterLink} to="/login">Login</ChakraLink>
            <ChakraLink as={ReactRouterLink} to="/signup">Signup</ChakraLink>
          </div>
        }
      </nav>
    </>
  );
}