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
      <Flex w="95%" ml={5} mb={[40, 10]} flexWrap='wrap' alignItems="flex-end"  h={50}>
        <ChakraLink
          color='custom.red'
          as={ReactRouterLink}
          to="/"
        >        
          <Heading as='h1' size='2xl' mb={[4, null, null, 0]}>
            <Icon
              position='relative'
              top='5px'
              as={GiBasketballBall}
              color='#e47041'
              boxSize={12}
              mr={2}
            />
            HeatCheck
          </Heading>
        </ChakraLink>
        <Spacer />
        <Nav />
      </Flex>
  );
}