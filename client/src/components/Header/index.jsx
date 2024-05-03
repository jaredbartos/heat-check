import Nav from '../Nav';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Link as ChakraLink,
  Heading,
  Flex,
  Spacer,
  Icon
} from '@chakra-ui/react';
import { GiBasketballBall } from 'react-icons/gi';

export default function Header() {
  return (
    <Flex
      w='95%'
      ml={3}
      mb={20}
      alignItems='flex-end'
    >
      <ChakraLink
        color='custom.red'
        as={ReactRouterLink}
        to='/'
      >
        <Heading
          as='h1'
          size='2xl'
          className='title-font'
        >
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
