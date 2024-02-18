import { GET_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import TeamCard from '../components/TeamCard';
import TeamForm from '../components/TeamForm';
import { useState, useEffect } from 'react';
import {
  Heading,
  Center,
  Wrap,
  WrapItem,
  Text,
  Button,
  VStack
} from '@chakra-ui/react';

export default function Dashboard() {
  const { loading, data, error } = useQuery(GET_ME);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if (data) {
      setTeams(data.me.teams);
      setPlayers(data.me.players);
    }
  }, [data, setTeams, setPlayers]);

  return (
    <>
      <Center h={100} mb={10}>
        <VStack>
          <Heading as='h2' size='lg'm={2}>Your Dashboard</Heading>
          <Button
              mt={2}
              type="button"
              onClick={() => setFormVisible(true)}
            >
              Add Team
          </Button>
        </VStack>
      </Center>
      {
        formVisible
        &&
        <TeamForm
          makeFormInvisible={() => setFormVisible(false)}
          action='create'  
        />
      }
      <Wrap m='auto' w='90%'>
        {
          teams.length
          ?
          teams.map(team => 
            <WrapItem key={team._id}>
              <TeamCard               
                teamId={team._id}
                players={team.players}
                teamName={team.name}
                league={team.league}
              />
            </WrapItem>           
          )
          :
          <Text>No teams have been added yet!</Text>
        }
      </Wrap>
    </>
  );
}