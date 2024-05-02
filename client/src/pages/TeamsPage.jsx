import { GET_TEAMS } from '../utils/queries/team';
import { useQuery } from '@apollo/client';
import { useState, useEffect, useMemo } from 'react';
import TeamCard from '../components/TeamCard';
import {
  Heading,
  Center,
  Wrap,
  WrapItem,
  Text,
  Spinner,
  Flex,
  Box,
  HStack,
  VStack,
  Select,
  Stack,
  Checkbox
} from '@chakra-ui/react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLeagueNames } from '../utils/hooks';

export default function TeamsPage() {
  // Query all teams from database
  const { loading, data, error } = useQuery(GET_TEAMS);
  const leagueNames = useLeagueNames();
  // Declare state variables for holding the teams and league values
  const [teams, setTeams] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('All Leagues');
  // Set visible teams dependent on filtering
  const visibleTeams = useMemo(() => {
    if (selectedLeague === 'All Leagues') {
      return teams;
    } else {
      return teams.filter(team => team.league.name === selectedLeague);
    }
  }, [teams, selectedLeague]);

  // Use database data to set teams
  useEffect(() => {
    if (data) {
      setTeams(data.teams);
    }
  }, [data]);

  const handleChange = e => {
    const { value } = e.target;
    setSelectedLeague(value);
  };

  return (
    <>
      <Center h={150}>
        <VStack>
          <Heading
            as='h2'
            color='custom.blue'
            size='xl'
          >
            Teams
          </Heading>
          <HStack mt={3}>
            <Text w={200}>Filter By League:</Text>
            <Select
              borderColor='custom.blue'
              onChange={handleChange}
            >
              <option value='All Leagues'>All Leagues</option>
              {leagueNames?.map(league => (
                <option
                  key={league}
                  value={league}
                >
                  {league}
                </option>
              ))}
            </Select>
          </HStack>
        </VStack>
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
        {!loading && visibleTeams.length != 0 ? (
          <Flex
            flexWrap='wrap'
            justify={[
              'center',
              null,
              null,
              visibleTeams.length === 2 ? 'space-around' : 'space-between'
            ]}
          >
            {visibleTeams.map(team => (
              <TeamCard
                key={team._id}
                teamId={team._id}
                players={team.players}
                teamName={team.name}
                league={team.league.name}
              />
            ))}
          </Flex>
        ) : (
          <Center>
            <Text
              fontSize='lg'
              my={20}
            >
              No teams available!
            </Text>
          </Center>
        )}
      </Box>
    </>
  );
}
