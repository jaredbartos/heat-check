import { HStack, useDisclosure, Icon, Flex } from '@chakra-ui/react';
import Auth from '../../utils/auth';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import HomeLink from '../NavLinks/HomeLink';
import TeamsLink from '../NavLinks/TeamsLink';
import LeaderboardsLink from '../NavLinks/LeaderboardsLink';
import DashboardLink from '../NavLinks/DashboardLink';
import LoginLink from '../NavLinks/LoginLink';
import LogoutLink from '../NavLinks/LogoutLink';
import SignupLink from '../NavLinks/SignupLink';
import NavMobile from '../NavMobile';
import { Divider } from '@chakra-ui/react';

export default function Nav() {
  // Get viewport width
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
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
      {width < 1200 ? (
        <NavMobile
          onLoginOpen={onLoginOpen}
          onSignupOpen={onSignupOpen}
        />
      ) : (
        <Flex
          justify='space-between'
          color='custom.red'
          w={800}
          h={30}
        >
          <HomeLink />
          <TeamsLink />
          <LeaderboardsLink />
          <Divider
            orientation='vertical'
            borderColor='custom.red'
          />
          {
            // If logged in, show dashboard link
            Auth.loggedIn() ? (
              <DashboardLink />
            ) : (
              // If not logged in, show login link for modal
              <LoginLink onLoginOpen={onLoginOpen} />
            )
          }
          {
            // If logged in, show logout link
            Auth.loggedIn() ? (
              <LogoutLink />
            ) : (
              // If not logged in, show signup link for modal
              <SignupLink onSignupOpen={onSignupOpen} />
            )
          }
        </Flex>
      )}

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
