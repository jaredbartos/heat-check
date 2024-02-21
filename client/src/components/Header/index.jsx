import Nav from "../Nav";
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Link as ChakraLink,
  Heading,
  Flex,
  Spacer,
  Icon
} from '@chakra-ui/react';
import { GiBasketballBall } from "react-icons/gi";

export default function Header() {
  return (
    <header>
      <Flex w="95%" ml={2} mb={10} alignItems="flex-end"  h={50}>
        <ChakraLink color='custom.red' as={ReactRouterLink} to="/">        
          <Heading as='h1'>
            <Icon
              position='relative'
              top='5px'
              as={GiBasketballBall}
              color='#e47041'
              boxSize={10}
              mr={2}
            />
            HeatCheck
          </Heading>
        </ChakraLink>
        <Spacer />
        <Nav />
      </Flex>
      
    </header>   
  );
}