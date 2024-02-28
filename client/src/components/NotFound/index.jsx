import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Link as ChakraLink,
  Flex,
  Text,
  Heading,
  VStack
} from '@chakra-ui/react';

// NotFound component for when a player or team cannot be found by id param
export default function NotFound({ variation }) {
  return (
    <Flex
      justify='center'
      h={500}
      align='flex-start'
      mt={20}
    >
      <VStack>
        <Heading as='h2' color='custom.blue' size='lg'>
          {variation} Not Found!
        </Heading>
        <Text>
          The entry you're looking for cannot be found in the database.
          Please go back or return to the{' '}
          <ChakraLink
            as={ReactRouterLink}
            to='/'
            color='blue'
          >
            homepage
          </ChakraLink>
          .
        </Text>
      </VStack>
    </Flex>
  );
}