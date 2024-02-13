import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_SINGLE_PLAYER } from "../utils/queries";
import PerformanceTable from "../components/PerformanceTable";

export default function SinglePlayer() {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_SINGLE_PLAYER, {
    variables: { id }
  });
  const player = data?.player;

  return (
    <>
      {
        loading
        ?
        <p>Loading...</p>
        :
        <>
          <h2>{player.firstName} {player.lastName} #{player.number}</h2>
          <p>Team: {player.team.name} ({player.team.league})</p>
          <p>Position: {player.position}</p>
          <p>Height: {player.height}</p>
          <p>Weight: {player.weight}</p>

          <h3>Game Log</h3>
          <PerformanceTable player={player} />
        </>     
      }
      
    </>
  );
}