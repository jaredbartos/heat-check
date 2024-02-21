import { extendTheme } from '@chakra-ui/react';
import { tableTheme } from './table';

export const theme = extendTheme({
  colors: {
    custom: {
      red: '#b3001b',
      blueGreen: '#114b5f',
      blue: '#2f809D'
    }
  },
  components: {
    Table: tableTheme
  }
});