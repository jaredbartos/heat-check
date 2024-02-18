import { useParams } from 'react-router-dom';
import { GET_SINGLE_TEAM } from '../utils/queries';
import { DELETE_TEAM } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import PlayersTable from '../components/PlayersTable';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import PlayerForm from '../components/PlayerForm';
import TeamForm from '../components/TeamForm';

export default function SingleTeam() {
  const { id } = useParams();
  const [team, setTeam] = useState();
  const [playerFormVisible, setPlayerFormVisible] = useState(false)
  const [teamFormVisible, setTeamFormVisible] = useState(false);
  const [deleteTeam] = useMutation(DELETE_TEAM);
  const { loading, data } = useQuery(GET_SINGLE_TEAM, {
    variables: { id }
  });

  // Set useEffect to set team value to prepare
  // for future retrieval from indexedDB for PWA
  useEffect(() => {
    if (data) {
      setTeam(data.team);
    }
  }, [data, setTeam]);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm(`Are you sure you want to delete the ${team.name}?`)) {
      try {
        await deleteTeam({
          variables: {
            _id: team._id
          }
        });
      } catch (err) {
        console.log(err);
      }

      location.replace('/teams');
    }
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <>
      {
        team
        &&
        <>
          <h2>{team.name} ({team.league})</h2>
          {
            (Auth.loggedIn() && Auth.getProfile().data._id === team.createdBy._id)
            &&
            <>
              <button
                type="button"
                onClick={() => setTeamFormVisible(true)}
              >
                Edit Team
              </button>
              <button
                type="button"
                onClick={handleDelete}
              >
                Delete Team
              </button>
            </>
          }
          {
            teamFormVisible
            &&
            <TeamForm
              makeFormInvisible={() => setTeamFormVisible(false)}
              currentTeam={team}
              action='update'
            />
          }
            <h3>Players</h3>
          {
            (Auth.loggedIn() && Auth.getProfile().data._id === team.createdBy._id)
            &&
            <button
              type="button"
              onClick={() => setPlayerFormVisible(true)}
            >
              Add Player
            </button>
          }
          {
            playerFormVisible
            &&
            <PlayerForm
              action='create'
              makeFormInvisible={() => setPlayerFormVisible(false)}
              currentTeam={team}
            />
          }
          {
            team.players.length
            ?
            <PlayersTable team={team} />
            :
            <p>No players have been added yet!</p>
          }         
        </>       
      }     
    </>
  );
}