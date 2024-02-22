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
  Icon
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
      {
        loading
        &&
        <LoadingSpinner />
      } 
      {
        (!loading && teams.length)
        &&
        <Wrap m='auto' w={[400, null, null, 900, null, 1300]}>
        {teams.map(team => 
          <WrapItem w={400} key={team._id}>
            <TeamCard               
              teamId={team._id}
              players={team.players}
              teamName={team.name}
              league={team.league}
            />
          </WrapItem>
        )}
        </Wrap>
      }
      {
        (!loading && !teams.length)
        &&
        <Center>
          <Text fontSize='lg' my={20}>No teams have been added yet!</Text>
        </Center>
      }
      <TeamModal
        action='create'
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}