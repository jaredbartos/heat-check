export default function PlayersTable({ team }) {
  const playersCopy = [...team.players];
  const sortedPlayers = playersCopy.sort((a, b) => a.number - b.number);
  const playerList = sortedPlayers.map((player) => {
    return (
      <tr key={player._id}>
        <td>{player.number}</td>
        <td>{`${player.firstName} ${player.lastName}`}</td>
        <td>{player.position}</td>
        <td>{player.height}</td>
        <td>{player.weight}</td>
      </tr>
    );
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Position</th>
          <th>Height</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        {playerList}
      </tbody>
    </table>
  );
}