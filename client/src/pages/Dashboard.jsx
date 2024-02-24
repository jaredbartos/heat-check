import { GET_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import TeamCard from '../components/TeamCard';
import TeamModal from '../components/TeamModal';
import { useState, useEffect } from 'react';
import {
  Heading,
  Center,
  Wrap,
  WrapItem,
  Text,
  Button,
  VStack,
  useDisclosure,
  Icon,
  Flex,
  Box
} from '@chakra-ui/react';
import { IoMdAddCircle } from "react-icons/io";
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard() {
  const { loading, data, error } = useQuery(GET_ME);
  const [teams, setTeams] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (data) {
      setTeams(data.me.teams);
    }
  }, [data, setTeams]);

  if (loading) {
    <h3>Loading...</h3>
  }

  return (
    <>
      <Center h={150} mb={10}>
        <VStack>
          <Heading as='h2' color='custom.blueGreen' size='lg'm={2}>Your Dashboard</Heading>
          <Button
            boxShadow='xl'
            colorScheme='blue'
            mt={2}
            type="button"
            onClick={onOpen}
          >
            <Icon
              as={IoMdAddCircle}
              mr={1}
            />
            Add Team
          </Button>
        </VStack>
      </Center>
      <Box m='auto' w='95%'>
        {
          loading
          &&
          <Box h={600}>
            <LoadingSpinner />
          </Box>
        }
        {
          (!loading && teams.length)
          &&
          <Flex
            flexWrap='wrap'
            justify='center'
          >
          {teams.map(team => 
              <TeamCard
                key={team._id}          
                teamId={team._id}
                players={team.players}
                teamName={team.name}
                league={team.league}
              />
          )}
          </Flex>
        }
        {
          (!loading && !teams.length)
          &&
          <Center>
            <Text fontSize='lg' my={20}>No teams have been added yet!</Text>
          </Center>
        }
      </Box>
      <TeamModal
        action='create'
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}