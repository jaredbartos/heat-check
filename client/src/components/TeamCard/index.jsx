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
      <h4>Players</h4>
      <ul>
        {playerLinks}
      </ul>
    </>
  );
}