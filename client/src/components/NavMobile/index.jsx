import Auth from '../../utils/auth';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton
} from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import { MdLeaderboard } from 'react-icons/md';
import { AiFillDashboard } from 'react-icons/ai';
import { MdLogin } from 'react-icons/md';
import { MdLogout } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa6';

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
      <MenuList
        fontSize='lg'
        color='custom.red'
      >
        <MenuItem
          as={Link}
          to='/'
          icon={<FaHome />}
          _hover={{ bgColor: 'custom.red', color: 'white' }}
        >
          Home
        </MenuItem>
        <MenuItem
          as={Link}
          to='/teams'
          icon={<HiUserGroup />}
          _hover={{ bgColor: 'custom.red', color: 'white' }}
        >
          Teams
        </MenuItem>
        <MenuItem
          as={Link}
          to='/leaderboards'
          icon={<MdLeaderboard />}
          _hover={{ bgColor: 'custom.red', color: 'white' }}
        >
          Leaderboards
        </MenuItem>
        <MenuDivider borderColor='custom.red' />
        {Auth.loggedIn() ? (
          <MenuItem
            as={Link}
            to='/dashboard'
            icon={<AiFillDashboard />}
            _hover={{ bgColor: 'custom.red', color: 'white' }}
          >
            Dashboard
          </MenuItem>
        ) : (
          <MenuItem
            onClick={onLoginOpen}
            icon={<MdLogin />}
            _hover={{ bgColor: 'custom.red', color: 'white' }}
          >
            Login
          </MenuItem>
        )}
        {Auth.loggedIn() ? (
          <MenuItem
            as='a'
            href='/'
            onClick={() => Auth.logout()}
            icon={<MdLogout />}
            _hover={{ bgColor: 'custom.red', color: 'white' }}
          >
            Logout
          </MenuItem>
        ) : (
          <MenuItem
            onClick={onSignupOpen}
            icon={<FaUserPlus />}
            _hover={{ bgColor: 'custom.red', color: 'white' }}
          >
            Sign Up
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
