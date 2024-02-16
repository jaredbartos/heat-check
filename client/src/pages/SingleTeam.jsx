import { useParams } from 'react-router-dom';
import { GET_SINGLE_TEAM } from '../utils/queries';
import { ADD_PLAYER,
  UPDATE_TEAM,
  DELETE_TEAM
} from '../utils/mutations';
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
  const [playerFormState, setPlayerFormState] = useState({
    firstName: '',
    lastName: '',
    number: '',
    position: 'Guard',
    height: {
      feet: '',
      inches: ''
    },
    weight: ''
  });
  const [teamFormState, setTeamFormState] = useState({
    newTeamName: '',
    newTeamLeague: 'Independent',
    customTeamLeague: ''
  })
  const [addPlayer] = useMutation(ADD_PLAYER, {
    refetchQueries: [
      GET_SINGLE_TEAM,
      'getSingleTeam'
    ]
  });
  const [updateTeam] = useMutation(UPDATE_TEAM, {
    refetchQueries: [
      GET_SINGLE_TEAM,
      'getSingleTeam'
    ]
  });
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

  // Onchange handler function for new player form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name != 'feet' && name != 'inches') {
      setPlayerFormState({
        ...playerFormState,
        [name]: value
      });
    } else {
      setPlayerFormState({
        ...playerFormState,
        height: {
          ...playerFormState.height,
          [name]: value
        }
      });
    }
  };

  // Onchange handler for edit team form
  const handleTeamInputChange = (e) => {
    const { name, value } = e.target;
    setTeamFormState({
      ...teamFormState,
      [name]: value
    });
  };

  // Submit handler function for edit team form
  const handleTeamFormSubmit = async (e) => {
    e.preventDefault();
    
    const name = teamFormState.newTeamName;
    // Set league as newTeamLeague value unless user chose to add custom name
    const league = teamFormState.newTeamLeague !== 'Enter New League Name'
      ?
      teamFormState.newTeamLeague
      :
      teamFormState.customTeamLeague;

    try{
      const { error } = await updateTeam({
        variables: {
          _id: team._id,
          name,
          league
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Submit handler function for new player form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Format height to string for database entry
    const { feet, inches } = playerFormState.height;
    const height = `${feet}'${inches}"`;
    try {
      const input = {
        ...playerFormState,
        number: Number(playerFormState.number),
        weight: Number(playerFormState.weight),
        height,
        team: team._id
      };
      await addPlayer({
        variables: {
            input,
            createdBy: Auth.getProfile().data._id
          }
        });
    } catch (error) {
      console.log(error);
    }

    setPlayerFormState({
      firstName: '',
      lastName: '',
      number: '',
      position: '',
      height: {
        feet: '',
        inches: ''
      },
      weight: ''
    });

    setPlayerFormVisible(false);
  };

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
              newTeamName={teamFormState.newTeamName}
              newTeamLeague={teamFormState.newTeamLeague}
              customTeamLeague={teamFormState.customTeamLeague}
              handleInputChange={handleTeamInputChange}
              handleFormSubmit={handleTeamFormSubmit}
            />
          }
          {
            team.players.length
            ?
            <>
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
              firstName={playerFormState.firstName}
              lastName={playerFormState.lastName}
              number={playerFormState.number}
              position={playerFormState.position}
              height={playerFormState.height}
              weight={playerFormState.weight}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              action='create'
            />
          }
          <PlayersTable team={team} />
            </>
            :
            <p>No players added yet!</p>
          }         
        </>
      }
      
    </>
  );
}