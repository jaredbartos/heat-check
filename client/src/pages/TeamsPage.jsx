import { GET_TEAMS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import TeamCard from '../components/TeamCard';
import {
  Heading,
  Center,
  Wrap,
  WrapItem,
  Text,
  Spinner,
  Flex,
  Box
} from '@chakra-ui/react';
import LoadingSpinner from '../components/LoadingSpinner';
import { getLeagues } from '../utils/leagues';


export default function TeamsPage() {
  // Query all teams from database
  const { loading, data, error } = useQuery(GET_TEAMS);

  // Declare state variables for holding the teams and league values
  const [teams, setTeams] = useState([]);
  const [leagues, setLeagues] = useState([]);

  // Use database data to set teams and set leagues
  useEffect(() => {
    if (data) {
      setTeams(data.teams);
      const teamLeagues = getLeagues(data.teams);
      setLeagues(teamLeagues);
    }
  }, [data, setTeams, setLeagues]);

  return (
    <>
      <Center h={100}>
        <Heading
          as='h2'
          color='custom.blue'
          size='xl'
        >
          Teams
        </Heading>
      </Center>
      <Box
        m='auto'
        w={['95%', null, null, null, null, '1600px']}
      >
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
    </>
  );
}