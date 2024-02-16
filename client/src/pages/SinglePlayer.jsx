import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_SINGLE_PLAYER } from "../utils/queries";
import { ADD_PERFORMANCE, UPDATE_PLAYER } from "../utils/mutations";
import PerformanceTable from "../components/PerformanceTable";
import PerformanceForm from "../components/PerformanceForm";
import PlayerForm from "../components/PlayerForm";
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
  });
  const [updatePlayer] = useMutation(UPDATE_PLAYER, {
    refetchQueries: [
      GET_SINGLE_PLAYER,
      'getSinglePlayer'
    ]
  });
  const [player, setPlayer] = useState();
  const [perfFormVisible, setPerfFormVisible] = useState(false);
  const [perfFormState, setPerfFormState] = useState({
    _id: '',
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
  const [playerFormVisible, setPlayerFormVisible] = useState(false);
  const [playerFormState, setPlayerFormState] = useState({
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

  // Set useEffect to set player value to prepare
  // for future retrieval from indexedDB for PWA
  useEffect(() => {
    if (data) {
      setPlayer(data.player);
      const heightArr = data.player.height.split("'");
      const feet = heightArr[0];
      const inches = heightArr[1].split('"')[0];
      setPlayerFormState({
        firstName: data.player.firstName,
        lastName: data.player.lastName,
        number: data.player.number,
        position: data.player.position,
        height: {
          feet,
          inches
        },
        weight: data.player.weight
      });
    }
  },[data, setPlayer, setPlayerFormState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // When setting formState
    // if any key other than date is being updated, convert value to number type
    // for submission to database
    setPerfFormState(
      name != 'date' ?
      {
        ...perfFormState,
        [name]: Number(value)
      } :
      {
        ...perfFormState,
        [name]: value
      }
    );
  };

  const handlePlayerInputChange = (e) => {
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
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();    
    const { _id, ...input } = perfFormState;
    const date = new Date(input.date);
    try {
      await addPerformance({
        variables: {
          input: {
            ...input,
            date,
            player: player._id
          },
          createdBy: Auth.getProfile().data._id
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Handler function for edit player submit
  const handlePlayerSubmit = async (e) => {
    e.preventDefault();
    const {feet, inches} = playerFormState.height;
    const height = `${feet}'${inches}"`;
    const input = {
      ...playerFormState,
      number: Number(playerFormState.number),
      weight: Number(playerFormState.weight),
      height
    }
    try {
      await updatePlayer({
        variables: {
          _id: player._id,
          input
        }
      })
    } catch (err) {
      console.log(err);
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
          {
            Auth.loggedIn()
            &&
            <button
              type="button"
              onClick={() => setPlayerFormVisible(true)}
            >
              Edit Player
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
              handleInputChange={handlePlayerInputChange}
              handleFormSubmit={handlePlayerSubmit}
              action='update'
            />
          }

          <h3>Game Log</h3>
          {
            Auth.loggedIn()
            ?
            <button
              type="button"
              onClick={() => setPerfFormVisible(true)}
            >
              Add Game Entry
            </button>
            :
            <p><Link to="/login">Login</Link> or <Link to="/signup">create an account</Link> to add a new game to this player!</p>
          }
          {
            perfFormVisible
            &&
            <PerformanceForm
              formState={perfFormState}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              action='create'
            />
          }
          <PerformanceTable
            player={player}
            formState={perfFormState}
            setFormState={setPerfFormState}
            handleInputChange={handleInputChange}
          />
        </>     
      }      
    </>
  );
}