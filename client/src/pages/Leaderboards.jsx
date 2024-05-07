import { useQuery } from '@apollo/client';
import { GET_PLAYERS } from '../utils/queries/player';
import { useLeagueNames } from '../utils/hooks';
import { useState, useMemo } from 'react';
import LeadersCard from '../components/LeadersCard';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  Box,
  Center,
  Heading,
  Flex,
  Select,
  VStack,
  HStack,
  Text
} from '@chakra-ui/react';

export default function Leaderboards() {
  const [selectedLeague, setSelectedLeague] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  const { loading, data } = useQuery(GET_PLAYERS);
  const players = useMemo(() => (data ? data.players : []), [data]);

  const leagueNames = useLeagueNames();

  const categories = [
    'FG Att Per Game',
    'FG Made Per Game',
    '3P Att Per Game',
    '3P Made Per Game',
    'FT Att Per Game',
    'FT Made Per Game',
    'Off Reb Per Game',
    'Rebounds Per Game',
    'Assists Per Game',
    'Steals Per Game',
    'Blocks Per Game',
    'Turnovers Per Game',
    'Points Per Game',
    'Field Goal Percentage',
    'Three Point Percentage',
    'Free Throw Percentage'
  ];

  let categoryKey;
  switch (selectedCategory) {
    case 'FG Att Per Game':
      categoryKey = 'fgAtt';
      break;
    case 'FG Made Per Game':
      categoryKey = 'fgMade';
      break;
    case '3P Att Per Game':
      categoryKey = 'threePtAtt';
      break;
    case '3P Made Per Game':
      categoryKey = 'threePtMade';
      break;
    case 'FT Att Per Game':
      categoryKey = 'ftAtt';
      break;
    case 'FT Made Per Game':
      categoryKey = 'ftMade';
      break;
    case 'Off Reb Per Game':
      categoryKey = 'offReb';
      break;
    case 'Rebounds Per Game':
      categoryKey = 'rebounds';
      break;
    case 'Assists Per Game':
      categoryKey = 'assists';
      break;
    case 'Steals Per Game':
      categoryKey = 'steals';
      break;
    case 'Blocks Per Game':
      categoryKey = 'blocks';
      break;
    case 'Turnovers Per Game':
      categoryKey = 'turnovers';
      break;
    case 'Points Per Game':
      categoryKey = 'points';
      break;
    case 'Field Goal Percentage':
      categoryKey = 'fgPercentage';
      break;
    case 'Three Point Percentage':
      categoryKey = 'threePtPercentage';
      break;
    case 'Free Throw Percentage':
      categoryKey = 'ftPercentage';
  }

  const leaders = useMemo(() => {
    let leaders = [...players];
    if (selectedLeague) {
      leaders = leaders.filter(
        leader => leader.team.league.name === selectedLeague
      );
    }
    if (categoryKey) {
      leaders = leaders
        .sort((a, b) =>
          !categoryKey.includes('Percentage')
            ? b.averages[categoryKey] - a.averages[categoryKey]
            : b.percentages[categoryKey] - a.percentages[categoryKey]
        )
        .slice(0, 20)
        .map(leader => {
          return {
            _id: leader._id,
            firstName: leader.firstName,
            lastName: leader.lastName,
            team: {
              _id: leader.team._id,
              name: leader.team.name
            },
            league: leader.team.league.name,
            value: !categoryKey.includes('Percentage')
              ? leader.averages[categoryKey]
              : leader.percentages[categoryKey]
          };
        });
      return leaders;
    }
  }, [selectedLeague, players, categoryKey]);

  return (
    <>
      <Center h={200}>
        <VStack>
          <Heading
            as='h2'
            color='custom.blue'
            size='xl'
          >
            Leaderboards
          </Heading>
          <HStack mt={3}>
            <Text>League:</Text>
            <Select
              borderColor='custom-blue'
              onChange={e => setSelectedLeague(e.target.value)}
            >
              <option value=''>All Leagues</option>
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
          <HStack mt={3}>
            <Text>Category:</Text>
            <Select
              borderColor='custom-blue'
              onChange={e => setSelectedCategory(e.target.value)}
              placeholder='Select Category'
            >
              {categories.map(category => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </Select>
          </HStack>
        </VStack>
      </Center>
      <Flex
        mt={10}
        justify='center'
      >
        {leaders && (
          <LeadersCard
            category={selectedCategory}
            leaders={leaders}
          />
        )}
      </Flex>
    </>
  );
}
