import Nav from "../Nav";
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Link as ChakraLink,
  Heading,
  Flex,
  Spacer
} from '@chakra-ui/react';

export default function Header() {
  return (
    <header>
      <Flex w="95%" ml={2} mb={10} alignItems="flex-end"  h={50}>
        <ChakraLink as={ReactRouterLink} to="/">
          <Heading as='h1'>HeatCheck</Heading>
        </ChakraLink>
        <Spacer />
        <Nav />
      </Flex>
      
    </header>   
  );
}