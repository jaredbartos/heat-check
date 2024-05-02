import { useQuery } from '@apollo/client';
import { GET_ALL_AVG_LEADERBOARDS } from '../utils/queries/leaderboards';
import { useLeagueNames } from '../utils/hooks';
import { useState, useEffect } from 'react';
import LeadersCard from '../components/LeadersCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Box, Center, Heading, Flex } from '@chakra-ui/react';

export default function Leaderboards() {
  const [leaderboards, setLeaderboards] = useState();
  const { loading, data: avgData } = useQuery(GET_ALL_AVG_LEADERBOARDS);

  useEffect(() => {
    if (avgData) {
      setLeaderboards({
        type: 'avg',
        data: avgData.allAvgLeaderboards
      });
    }
  }, [avgData]);

  return (
    <>
      <Center h={150}>
        <Heading
          as='h2'
          color='custom.blue'
          size='xl'
        >
          Leaderboards
        </Heading>
      </Center>
      <Box
        m='auto'
        w={['95%', null, null, null, null, '1600px']}
      >
        {loading && (
          <Box h={600}>
            <LoadingSpinner />
          </Box>
        )}
        {leaderboards && (
          <Box m='auto'>
            <Flex
              flexWrap='wrap'
              justify={['center', null, null, null, 'space-between']}
            >
              {leaderboards.data.map(leaderboard => {
                return (
                  <LeadersCard
                    key={leaderboard._id}
                    category={leaderboard.category}
                    leaders={leaderboard.leaders}
                    type={leaderboards.type}
                  />
                );
              })}
            </Flex>
          </Box>
        )}
      </Box>
    </>
  );
}
