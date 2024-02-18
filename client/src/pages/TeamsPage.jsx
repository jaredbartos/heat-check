import { GET_TEAMS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import TeamCard from '../components/TeamCard';
import {
  Heading,
  Center,
  Wrap,
  WrapItem
} from '@chakra-ui/react';


export default function TeamsPage() {
  // Query all teams from database
  const { loading, data, error } = useQuery(GET_TEAMS);

  // Declare state variables for holding the teams and form values
  const [teams, setTeams] = useState([]);

  // Use database data to set teams and league states
  useEffect(() => {
    if (data) {
      setTeams(data.teams);
    }   
  }, [data, setTeams]);

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <>
      <Center h={100}>
        <Heading as='h2' size='lg'>Teams</Heading>
      </Center>
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
          <p>No teams have been added yet!</p>
        }
      </Wrap>
      
    </>
  );
}