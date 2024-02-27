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
import Auth from '../utils/auth';

export default function Dashboard() {
  // Query the currently signed in user
  const { loading, data, error } = useQuery(GET_ME);
  const [teams, setTeams] = useState([]);
  // Set modal disclosure variables
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Set current user teams data
  useEffect(() => {
    if (data) {
      setTeams(data.me.teams);
    }
  }, [data, setTeams]);

  return (
    <>
      {
        !Auth.loggedIn()
        ?
        <Center h={200} mb={10}>
          <VStack>
          <Heading as='h2' color='custom.blue' size='xl'm={2}>Your Dashboard</Heading>
          <Text fontSize='lg' my={25}>
            You must be logged in to see your teams or add new teams!
          </Text>
          </VStack>
        </Center>        
        :
        <>
        <Center h={150} mb={10}>       
          <VStack>
            <Heading as='h2' color='custom.blue' size='xl'm={2}>Your Dashboard</Heading>
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
            (!loading && teams.length !== 0)
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
            (!loading && teams.length === 0)
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
      }
      
    </>
  );
}