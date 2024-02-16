import Nav from "../Nav";
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Link as ChakraLink,
  Heading,
  VStack
} from '@chakra-ui/react';

export default function Header() {
  return (
    <header>
      <VStack>
        <ChakraLink as={ReactRouterLink} to="/">
          <Heading>HeatCheck</Heading>
        </ChakraLink>
        <Nav />
      </VStack>
      
    </header>   
  );
}