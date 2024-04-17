import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Link as ChakraLink,
  HStack,
  useDisclosure,
  Icon,
  Flex
} from '@chakra-ui/react';
import Auth from '../../utils/auth';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import { HiUserGroup } from 'react-icons/hi';
import { FaHome } from 'react-icons/fa';
import { AiFillDashboard } from 'react-icons/ai';
import { MdLogout, MdLogin } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa6';

export default function Nav() {
  // Declare modal variables for login
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose
  } = useDisclosure();

  // Declare modal variables for signup
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose
  } = useDisclosure();

  return (
    <>
      <Flex
        justify="space-between"
        flexWrap="wrap"
        color="custom.red"
        w={[250, 500]}
      >
        <ChakraLink className="navLink" as={ReactRouterLink} to="/">
          <Icon as={FaHome} position="relative" top="2px" mr={1} />
          Home
        </ChakraLink>
        <ChakraLink className="navLink" as={ReactRouterLink} to="/teams">
          <Icon as={HiUserGroup} position="relative" top="2px" mr={1} />
          Teams
        </ChakraLink>
        {
          // If logged in, show dashboard link
          Auth.loggedIn() ? (
            <ChakraLink
              className="navLink"
              as={ReactRouterLink}
              to="/dashboard"
            >
              <Icon as={AiFillDashboard} position="relative" top="2px" mr={1} />
              Your Dashboard
            </ChakraLink>
          ) : (
            // If not logged in, show login link for modal
            <ChakraLink className="navLink" onClick={onLoginOpen}>
              <Icon as={MdLogin} position="relative" top="2px" mr={1} />
              Login
            </ChakraLink>
          )
        }
        {
          // If logged in, show logout link
          Auth.loggedIn() ? (
            <ChakraLink
              className="navLink"
              href="/"
              id="logout"
              onClick={() => Auth.logout()}
            >
              <Icon as={MdLogout} position="relative" top="2px" mr={1} />
              Logout
            </ChakraLink>
          ) : (
            // If not logged in, show signup link for modal
            <ChakraLink className="navLink" onClick={onSignupOpen}>
              <Icon as={FaUserPlus} position="relative" top="2px" mr={1} />
              Sign Up
            </ChakraLink>
          )
        }
      </Flex>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </>
  );
}
