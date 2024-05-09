import { useQuery } from '@apollo/client';
import { GET_PLAYERS } from '../utils/queries/player';
import { useLeagues } from '../utils/hooks';
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
import { useParams, useNavigate } from 'react-router-dom';

export default function Leaderboards() {
  // Get the league and category from the URL, if present
  const { league, category } = useParams();
  const navigate = useNavigate();

  // Set the selected league and category based on the URL
  // or default to 'all' and an empty string
  const [selectedLeague, setSelectedLeague] = useState(league || 'all');
  const [selectedCategory, setSelectedCategory] = useState(category || '');

  const { data } = useQuery(GET_PLAYERS);
  // Get the players from the query data
  const players = useMemo(() => (data ? data.players : []), [data]);

  // Get the leagues from the custom hook
  const leagues = useLeagues();

  // Define the categories for the select dropdown
  const categories = [
    {
      name: 'FG Att Per Game',
      key: 'fgAtt'
    },
    {
      name: 'FG Made Per Game',
      key: 'fgMade'
    },
    {
      name: '3P Att Per Game',
      key: 'threePtAtt'
    },
    {
      name: '3P Made Per Game',
      key: 'threePtMade'
    },
    {
      name: 'FT Att Per Game',
      key: 'ftAtt'
    },
    {
      name: 'FT Made Per Game',
      key: 'ftMade'
    },
    {
      name: 'Off Reb Per Game',
      key: 'offReb'
    },
    {
      name: 'Rebounds Per Game',
      key: 'rebounds'
    },
    {
      name: 'Assists Per Game',
      key: 'assists'
    },
    {
      name: 'Steals Per Game',
      key: 'steals'
    },
    {
      name: 'Blocks Per Game',
      key: 'blocks'
    },
    {
      name: 'Turnovers Per Game',
      key: 'turnovers'
    },
    {
      name: 'Points Per Game',
      key: 'points'
    },
    {
      name: 'Field Goal Percentage',
      key: 'fgPercentage'
    },
    {
      name: 'Three Point Percentage',
      key: 'threePtPercentage'
    },
    {
      name: 'Free Throw Percentage',
      key: 'ftPercentage'
    }
  ];

  // Filter the players based on the selected league and category
  const leaders = useMemo(() => {
    let leaders = [...players];
    if (selectedLeague !== 'all' && selectedLeague) {
      leaders = leaders.filter(
        leader => leader.team.league._id === selectedLeague
      );
    }
    if (selectedCategory && leaders.length > 0) {
      // Sort the players based on the selected category
      leaders = leaders
        .sort((a, b) =>
          !selectedCategory.includes('Percentage')
            ? b.averages[selectedCategory] - a.averages[selectedCategory]
            : b.percentages[selectedCategory] - a.percentages[selectedCategory]
        )
        // Get the top 20 players
        .slice(0, 20)
        // Map the players to the format needed for the LeadersCard component
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
            // If the category is a percentage, use the percentage value
            value: !selectedCategory.includes('Percentage')
              ? leader.averages[selectedCategory]
              : leader.percentages[selectedCategory]
          };
        });
      return leaders;
    }
  }, [selectedLeague, players, selectedCategory]);

  const handleChange = e => {
    // Get the value and id from the select element
    const { value, id } = e.target;

    // Update the selected league or category based on the id
    if (id === 'category') {
      setSelectedCategory(value);
      // Navigate to the new URL based on the selected league and category
      navigate(
        value ? `/leaderboards/${selectedLeague}/${value}` : '/leaderboards'
      );
    } else {
      setSelectedLeague(value);
      // If the category is already selected, navigate to the new URL
      if (selectedCategory) {
        navigate(`/leaderboards/${value}/${selectedCategory}`);
      }
    }
  };

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
              id='league'
              borderColor='custom-blue'
              onChange={handleChange}
            >
              <option value='all'>All Leagues</option>
              {leagues?.map(league => (
                <option
                  selected={selectedLeague === league._id}
                  key={league._id}
                  value={league._id}
                >
                  {league.name}
                </option>
              ))}
            </Select>
          </HStack>
          <HStack mt={3}>
            <Text>Category:</Text>
            <Select
              id='category'
              borderColor='custom-blue'
              onChange={handleChange}
              placeholder='Select Category'
            >
              {categories.map(category => (
                <option
                  selected={selectedCategory === category.key}
                  key={category.key}
                  value={category.key}
                >
                  {category.name}
                </option>
              ))}
            </Select>
          </HStack>
        </VStack>
      </Center>
      {!leaders && selectedCategory && (
        <Box h={600}>
          <LoadingSpinner />
        </Box>
      )}
      <Flex
        mt={10}
        justify='center'
      >
        {leaders && (
          <LeadersCard
            category={
              // Get the name of the selected category
              categories.find(category => category.key === selectedCategory)
                .name
            }
            leaders={leaders}
          />
        )}
      </Flex>
    </>
  );
}
