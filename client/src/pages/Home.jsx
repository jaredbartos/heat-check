import { useQuery } from '@apollo/client';
import { GET_RECENTLY_UPDATED_TEAMS, GET_RANKED_PERFORMANCES } from '../utils/queries';
import {
  Heading,
  Center,
  Wrap,
  WrapItem,
  Text,
  Flex,
  Box
} from '@chakra-ui/react';
import TeamCard from '../components/TeamCard';
import PerformanceTable from '../components/PerformanceTable';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const {
    loading: loadingTeams,
    data: teamData,
    error: teamError
  } = useQuery(GET_RECENTLY_UPDATED_TEAMS);
  const [teams, setTeams] = useState([]);
  const [performances, setPerformances] = useState([]);

  const {
    loading: loadingPerformances,
    data: performancesData
  } = useQuery(GET_RANKED_PERFORMANCES, { variables: { field: 'points' } })

  useEffect(() => {
    if (teamData) {
      setTeams(teamData.recentlyUpdatedTeams);
    }
    if (performancesData) {
      setPerformances(performancesData.rankPerformanceByField);
    }
  }, [teamData, performancesData, setTeams, setPerformances]);


  return (
    <Box>
      <Center h={100}>
        <Heading as='h2' color='custom.blueGreen' size='lg'>
          Highest Scorers
        </Heading>
      </Center>
      <Box h={390}>
        {
          loadingPerformances
          &&
          <LoadingSpinner />
        }
        {
          (!loadingPerformances && performances.length)
          &&
          <Flex
            justify='center'
          >
            <PerformanceTable
              performances={performances}
              isRanking={true}
            />
          </Flex>
        }
        {
          (!loadingPerformances && !performances.length)
          &&
          <Center>
            <Text fontSize='lg' my={20}>No games have been added yet!</Text>
          </Center>
        }
      </Box>
      <Center h={100}>
        <Heading as='h2' color='custom.blueGreen' size='lg'>
          Recently Updated Teams
        </Heading>
      </Center>
      <Box w={['95%']}>
      {
        loadingTeams
        &&
        <LoadingSpinner />
      }
      {
        (!loadingTeams && teams.length)
        &&
        <Flex flexWrap='wrap' justify='center'  >
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
        (!loadingTeams && !teams.length)
        &&
        <Center>
          <Text fontSize='lg' my={20}>No teams have been added yet!</Text>
        </Center>
      }
      </Box>
      
    </Box>
  )
}