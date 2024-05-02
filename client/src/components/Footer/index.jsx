import { Flex, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <footer>
      <Flex
        mt={40}
        mb={10}
        justify='center'
        align='center'
      >
        <Text>&copy; 2024 - Jared Bartos</Text>
      </Flex>
    </footer>
  );
}
