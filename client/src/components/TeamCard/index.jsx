import { Link } from 'react-router-dom';

export default function TeamCard({ teamId, players, teamName, league }) {
  const playerLinks = players.map((player) => {
    return (
      <Link key={player._id} to={`/player/${player._id}`}>{player.firstName} {player.lastName}<br /></Link>
    );
  });

  return (
    <>
      <Link to={`/team/${teamId}`}><h3>{teamName} ({league})</h3></Link>
      {
        players.length
        ?
        <>
        <h4>Players</h4>
        <ul>
          {playerLinks}
        </ul>
        </>
        :
        <p>No players have been added to this team yet!</p>
      }     
    </>
  );
}