import { Link } from 'react-router-dom';

export default function TeamCard({ players, teamName, league }) {
  const playerLinks = players.map((player) => {
    return (
      <Link key={player._id} to={`/player/${player._id}`}>{player.firstName} {player.lastName}<br /></Link>
    );
  });

  return (
    <>
      <h3>{teamName} ({league})</h3>
      <h4>Players</h4>
      <ul>
        {playerLinks}
      </ul>
    </>
  );
}