import { GET_TEAMS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import TeamCard from '../components/TeamCard';
import TeamForm from '../components/TeamForm';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

export default function TeamsPage() {
  // Query all teams from database
  const { loading, data, error } = useQuery(GET_TEAMS);

  // Declare state variables for holding the teams and form values
  const [teams, setTeams] = useState([]);

  // State for add team form visibility
  const [formVisible, setFormVisible] = useState(false);

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
        <TeamForm
          makeFormInvisible={() => setFormVisible(false)}
          action='create'  
        />
      }
      {
        teams.length
        ?
        teams.map(team => 
          <TeamCard
            key={team._id}
            teamId={team._id}
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