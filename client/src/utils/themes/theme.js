import { extendTheme } from '@chakra-ui/react';
import { tableTheme } from './table';
import { linkTheme } from './link';

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