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
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton
} from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function NavMobile({ onLoginOpen, onSignupOpen }) {
  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<RxHamburgerMenu />}
        bgColor='transparent'
        borderWidth='2px'
        borderRadius='8px'
        borderColor='custom.red'
        color='custom.red'
        _expanded={{ bgColor: 'custom.red', color: 'white' }}
        _hover={{ bgColor: 'custom.red', color: 'white' }}
      />
      <MenuList color='custom.red'>
        <MenuItem _hover={{ bgColor: 'white' }}>
          <HomeLink />
        </MenuItem>
        <MenuItem _hover={{ bgColor: 'white' }}>
          <TeamsLink />
        </MenuItem>
        <MenuItem _hover={{ bgColor: 'white' }}>
          <LeaderboardsLink />
        </MenuItem>
        <MenuDivider borderColor='custom.red'/>
        <MenuItem _hover={{ bgColor: 'white' }}>
          {Auth.loggedIn() ? (
            <DashboardLink />
          ) : (
            <LoginLink onLoginOpen={onLoginOpen} />
          )}
        </MenuItem>
        <MenuItem _hover={{ bgColor: 'white' }}>
          {Auth.loggedIn() ? (
            <LogoutLink />
          ) : (
            <SignupLink onSignupOpen={onSignupOpen} />
          )}
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
