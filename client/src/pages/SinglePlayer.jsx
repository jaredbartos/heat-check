import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_SINGLE_PLAYER } from "../utils/queries";
import { DELETE_PLAYER } from "../utils/mutations";
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
  const [deletePlayer] = useMutation(DELETE_PLAYER);
  const [player, setPlayer] = useState();
  const [perfFormVisible, setPerfFormVisible] = useState(false);
  const [playerFormVisible, setPlayerFormVisible] = useState(false);

  // Set useEffect to set player value to prepare
  // for future retrieval from indexedDB for PWA
  useEffect(() => {
    if (data) {
      setPlayer(data.player);
    }
  }, [data, setPlayer]);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (confirm(`Are you sure you want to delete ${player.firstName} ${player.lastName}?`)) {
      try {
        await deletePlayer({
          variables: {
            _id: player._id
          }
        });
      } catch (err) {
        console.log(err);
      }
      location.replace(`/team/${player.team._id}`);
    }
   
  };


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
            (Auth.loggedIn() && Auth.getProfile().data._id === player.createdBy._id)
            &&
            <>
              <button
                type="button"
                onClick={() => setPlayerFormVisible(true)}
              >
                Edit Player
              </button>
              <button
                type="button"
                onClick={handleDelete}
              >
                Delete Player
              </button>
            </>
          }
          {
            playerFormVisible
            &&
            <PlayerForm 
              makeFormInvisible={() => setPlayerFormVisible(false)}
              currentPlayer={player}
              action='update'
            />
          }

          <h3>Game Log</h3>
          {
            (Auth.loggedIn() && Auth.getProfile().data._id === player.createdBy._id)
            &&
            <button
              type="button"
              onClick={() => setPerfFormVisible(true)}
            >
              Add Game Entry
            </button>
          }
          {
            perfFormVisible
            &&
            <PerformanceForm
              currentPlayer={player}
              action='create'
              makeFormInvisible={() => setPerfFormVisible(false)}
            />
          }
          <PerformanceTable
            player={player}
          />
        </>     
      }      
    </>
  );
}