import { useParams } from 'react-router-dom';
import { GET_SINGLE_TEAM } from '../utils/queries';
import { ADD_PLAYER } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import PlayersTable from '../components/PlayersTable';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import PlayerForm from '../components/PlayerForm';

export default function SingleTeam() {
  const { id } = useParams();
  const [team, setTeam] = useState();
  const [formVisible, setFormVisible] = useState(false)
  const [formState, setFormState] = useState({
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
  const [addPlayer] = useMutation(ADD_PLAYER, {
    refetchQueries: [
      GET_SINGLE_TEAM,
      'getSingleTeam'
    ]
  });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name != 'feet' && name != 'inches') {
      setFormState({
        ...formState,
        [name]: value
      });
    } else {
      setFormState({
        ...formState,
        height: {
          ...formState.height,
          [name]: value
        }
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Format height to string for database entry
    const { feet, inches } = formState.height;
    const height = `${feet}'${inches}"`;
    try {
      const input = {
        ...formState,
        number: Number(formState.number),
        weight: Number(formState.weight),
        height,
        team: team._id
      };
      await addPlayer({
        variables: {
            input
          }
        });
    } catch (error) {
      console.log(error);
    }

    setFormState({
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

    setFormVisible(false);
  };

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
          <h3>Players</h3>
          {
            Auth.loggedIn()
            ?
            <button
              type="button"
              onClick={() => setFormVisible(true)}
            >
              Add Player
            </button>
            :
            <p><Link to="/login">Login</Link> or <Link to="/signup">create an account</Link> to add a new player!</p>
          }
          {
            formVisible
            &&
            <PlayerForm
              firstName={formState.firstName}
              lastName={formState.lastName}
              number={formState.number}
              position={formState.position}
              height={formState.height}
              weight={formState.weight}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
            />
          }
          <PlayersTable team={team} />
        </>
      }
      
    </>
  );
}