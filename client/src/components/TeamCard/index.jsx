export default function TeamCard ({ players, teamName, league }) {
  const playerItems = players.map((player) => {
    return (
      <li key={player._id}>{player.firstName} {player.lastName} {player.position}</li>
    )
  });

  return (
    <>
      <h3>{teamName}</h3>
      <p>{league}</p>
      <h4>Players</h4>
      <ul>
        {playerItems}
      </ul>
    </>
  );
}