import { useRouteError, Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Link as ChakraLink
} from '@chakra-ui/react';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box w='100%' h='500px'>
      <Flex justify='center' w='100%' h='100%' align='center'>
        <VStack>
          <Heading as='h2' size='lg'>
            Oops!
          </Heading>
          <Text>
            Sorry, an unexpected error has occurred.
            Please return to the{' '}
            <ChakraLink
              as={ReactRouterLink}
              to='/'
              color='blue'
            >
              homepage!
            </ChakraLink>
          </Text>
          <Text as='i'>
            {error.status && `${error.status}: `}{error.statusText || error.message}
          </Text>
        </VStack>
      </Flex>
    </Box>
  )
}