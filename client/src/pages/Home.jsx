import { useQuery } from '@apollo/client';
import { GET_RECENTLY_UPDATED_TEAMS } from '../utils/queries';
import {
  Heading,
  Center,
  Wrap,
  WrapItem,
  Text
} from '@chakra-ui/react';
import TeamCard from '../components/TeamCard';
import { useState, useEffect } from 'react';

export default function Home() {
  const {
    loading: loadingTeams,
    data: teamData,
    error: teamError
  } = useQuery(GET_RECENTLY_UPDATED_TEAMS);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (teamData) {
      setTeams(teamData.recentlyUpdatedTeams);
    }
  }, [teamData, setTeams]);


  return (
    <>
      <Center h={100}>
        <Heading as='h2' color='custom.blueGreen' size='lg'>
          Recently Updated Teams
        </Heading>
      </Center>
      {
        teams.length
        ?
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
        :
        <Center>
          <Text fontSize='lg' my={20}>No teams have been added yet!</Text>
        </Center>
      }
    </>
  )
}