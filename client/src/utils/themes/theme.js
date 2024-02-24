import { extendTheme } from '@chakra-ui/react';
import { tableTheme } from './table';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: '#f3e8e2'
      },
      '.navLink': {
        mx: 1,
        my: [2, 0]
      }
    }
  },
  colors: {
    custom: {
      red: '#b3001b',
      blueGreen: '#114b5f',
      blue: '#2f809D',
      lightBg: '#f3e8e2'
    }
  },
  components: {
    Table: tableTheme
  }
});