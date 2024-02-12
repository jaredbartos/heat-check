import { QUERY_TEAMS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import TeamCard from '../components/TeamCard';
import AddTeamForm from '../components/AddTeamForm';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

export default function TeamsPage() {
  // Query all teams from database
  const { loading, data, error } = useQuery(QUERY_TEAMS);
  // Declare state variables for holding the teams and form values
  const [teams, setTeams] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [formState, setFormState] = useState({
    newTeamName: '',
    newTeamLeague: '',
    customTeamLeague: ''
  });
  // State for add team form visibility
  const [formVisible, setFormVisible] = useState(false);

  // Use database data to set teams and league states
  useEffect(() => {
    if (data) {
      // Extract leagues from the team data
      let teamLeagues = [];
      for (let i = 0; i < data.teams.length; i++) {
        const currentTeamLeague = data.teams[i].league;
        if (!teamLeagues.includes(currentTeamLeague)) {
          teamLeagues.push(currentTeamLeague);
        }
      }
      // Set teams and leagues
      setTeams(data.teams);
      setLeagues(teamLeagues);
    }
    
  }, [data, setTeams, setLeagues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <>
      {
        Auth.loggedIn()
        ?
        <button
          type="button"
          onClick={() => setFormVisible(true)}
        >
          Add Team
        </button>
        :
        <p><Link to="/login">Login</Link> or <Link to="/signup">create an account</Link> to add a new team!</p>
      }
      {
        formVisible
        &&
        <AddTeamForm
          leagues={leagues}
          newTeamName={formState.newTeamName}
          newTeamLeague={formState.newTeamLeague}
          customTeamLeague={formState.customTeamLeague}
          handleInputChange={handleInputChange}
        />
      }
      {
        teams.length
        ?
        teams.map(team => 
          <TeamCard
            key={team._id}
            players={team.players}
            teamName={team.name}
            league={team.league}
          />
        )
        :
        <p>No teams have been added yet!</p>
      }
    </>
  );
}