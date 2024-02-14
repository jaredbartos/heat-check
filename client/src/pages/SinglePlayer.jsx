import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_SINGLE_PLAYER } from "../utils/queries";
import { ADD_PERFORMANCE } from "../utils/mutations";
import PerformanceTable from "../components/PerformanceTable";
import PerformanceForm from "../components/PerformanceForm";
import { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

export default function SinglePlayer() {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_SINGLE_PLAYER, {
    variables: { id }
  });
  const [addPerformance] = useMutation(ADD_PERFORMANCE, {
    refetchQueries: [
      GET_SINGLE_PLAYER,
      'getSinglePlayer'
    ]
  })
  const [player, setPlayer] = useState();
  const [formVisible, setFormVisible] = useState(false);
  const [formState, setFormState] = useState({
    date: '',
    fgAtt: '',
    fgMade: '',
    threePtAtt: '',
    threePtMade: '',
    ftAtt: '',
    ftMade: '',
    offReb: '',
    rebounds: '',
    assists: '',
    steals: '',
    blocks: '',
    turnovers: '',
    points: ''
  });

  // Set useEffect to set player value to prepare
  // for future retrieval from indexedDB for PWA
  useEffect(() => {
    if (data) {
      setPlayer(data.player);
    }
  },[data, setPlayer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // When setting formState
    // if any key other than date is being updated, convert value to number type
    // for submission to database
    setFormState(
      name != 'date' ?
      {
        ...formState,
        [name]: Number(value)
      } :
      {
        ...formState,
        [name]: value
      }
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const date = new Date(formState.date);

    try {
      await addPerformance({
        variables: {
          input: {
            ...formState,
            date,
            player: player._id
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <>
      {
        player
        &&
        <>
          <h2>{player.firstName} {player.lastName} #{player.number}</h2>
          <p>Team: {player.team.name} ({player.team.league})</p>
          <p>Position: {player.position}</p>
          <p>Height: {player.height}</p>
          <p>Weight: {player.weight}</p>

          <h3>Game Log</h3>
          {
            Auth.loggedIn()
            ?
            <button
              type="button"
              onClick={() => setFormVisible(true)}
            >
              Add Game Entry
            </button>
            :
            <p><Link to="/login">Login</Link> or <Link to="/signup">create an account</Link> to add a new game to this player!</p>
          }
          {
            formVisible
            &&
            <PerformanceForm
              formState={formState}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
            />
          }
          <PerformanceTable player={player} />
        </>     
      }      
    </>
  );
}