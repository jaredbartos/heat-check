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
          Recently Updated Teams
        </Heading>
      </Center>
      {
        loadingTeams
        &&
        <LoadingSpinner />
      }
      {
        (!loadingTeams && teams.length)
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
        (!loadingTeams && !teams.length)
        &&
        <Center>
          <Text fontSize='lg' my={20}>No teams have been added yet!</Text>
        </Center>
      }
      <Center h={100}>
        <Heading as='h2' color='custom.blueGreen' size='lg'>
          Highest Scoring Games By Players
        </Heading>
      </Center>
      {
        loadingPerformances
        &&
        <LoadingSpinner />
      }
      {
        (!loadingPerformances && performances.length)
        &&
        <Flex justifyContent={['left', null, null, 'center']}>
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
  )
}