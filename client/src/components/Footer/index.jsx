import {
  Flex,
  Text
} from '@chakra-ui/react';

export default function Footer() {
  return (
    <footer>
      <Flex h={200} justify='center' align='center'>
        <Text>
          &copy; 2024 - Built by Jared Bartos
        </Text>
      </Flex>
    </footer>
  );
}