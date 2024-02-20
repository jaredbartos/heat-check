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
  useDisclosure
} from '@chakra-ui/react';

export default function Dashboard() {
  const { loading, data, error } = useQuery(GET_ME);
  const [teams, setTeams] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (data) {
      setTeams(data.me.teams);
    }
  }, [data, setTeams]);

  return (
    <>
      <Center h={100} mb={10}>
        <VStack>
          <Heading as='h2' size='lg'm={2}>Your Dashboard</Heading>
          <Button
              mt={2}
              type="button"
              onClick={onOpen}
            >
              Add Team
          </Button>
        </VStack>
      </Center>
      
        {
          teams.length
          ?
          <Wrap m='auto' w='90%'>
          {teams.map(team => 
            <WrapItem key={team._id}>
              <TeamCard               
                teamId={team._id}
                players={team.players}
                teamName={team.name}
                league={team.league}
              />
            </WrapItem>
          )}
          </Wrap>
          :
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