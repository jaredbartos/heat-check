import { extendTheme, keyframes } from '@chakra-ui/react';
import { tableTheme } from './table';
import { linkTheme } from './link';

const revealFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: '#f3e8e2'
      },
      '.navLink': {
        mx: 1,
        my: [2, 0],
        px: 2,
        borderRadius: 5,
        fontSize: 'lg',
        _hover: {
          bgColor: 'custom.red',
          color: 'white'
        }
      },
      '.player-row': {
        _hover: {
          cursor: 'pointer',
          bgColor: 'gray',
          color: 'white'
        }
      },
      '.from-left': {
        opacity: 0,
        animation: `${revealFromLeft} 500ms ease-in-out 0.3s forwards`
      },
      '.highlight': {
        bgColor: '#f8ffb4'
      }
    }
  },
  colors: {
    custom: {
      red: '#b3001b',
      blueGreen: '#114b5f',
      blue: '#153243',
      lightBg: '#f3e8e2'
    }
  },
  components: {
    Table: tableTheme,
    Link: linkTheme,
  }
});