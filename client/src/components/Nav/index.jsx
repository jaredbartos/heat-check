import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Link as ChakraLink,
  HStack,
  useDisclosure,
  Icon
} from '@chakra-ui/react';
import Auth from '../../utils/auth';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import { HiUserGroup } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { MdLogout, MdLogin } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";


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
          <ChakraLink as={ReactRouterLink} to="/">
            <Icon
              as={FaHome}
              position='relative'
              top='2px'
              mr={1}
              color='custom.red'
            />
            Home
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to="/teams">
            <Icon
              as={HiUserGroup}
              position='relative'
              top='2px'
              mr={1}
              color='custom.red'
            />
            Teams
          </ChakraLink>
          {
            Auth.loggedIn()
            ?
            <ChakraLink as={ReactRouterLink} to="/dashboard">
              <Icon
                as={AiFillDashboard}
                position='relative'
                top='2px'
                mr={1}
                color='custom.red'
              />
              Your Dashboard
            </ChakraLink>
            :
            <ChakraLink onClick={onLoginOpen}>
              <Icon
                as={MdLogin}
                position='relative'
                top='2px'
                mr={1}
                color='custom.red'
              />
              Login
            </ChakraLink>
          }
          {
            Auth.loggedIn()
            ?
            <ChakraLink href="/" id="logout" onClick={() => Auth.logout()}>
              <Icon
                as={MdLogout}
                position='relative'
                top='2px'
                mr={1}
                color='custom.red'
              />
              Logout
            </ChakraLink>
            :
            <ChakraLink onClick={onSignupOpen}>
              <Icon
                as={FaUserPlus}
                position='relative'
                top='2px'
                mr={1}
                color='custom.red'
              />
              Sign Up
            </ChakraLink>
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




