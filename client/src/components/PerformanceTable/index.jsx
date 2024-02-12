export default function PerformanceTable({ player }) {
  const performancesCopy = [...player.performances];
  const sortedPerformances = performancesCopy.sort((a, b) => b.date - a.date);
  const performanceList = player.performances.map((performance) => {
    return (
      <tr key={performance._id}>
        <td>{performance.date}</td>
        <td>{performance.fgAtt}</td>
        <td>{performance.fgMade}</td>
        <td>{performance.threePtAtt}</td>
        <td>{performance.threePtMade}</td>
        <td>{performance.ftAtt}</td>
        <td>{performance.ftMade}</td>
        <td>{performance.offReb}</td>
        <td>{performance.rebounds}</td>
        <td>{performance.assists}</td>
        <td>{performance.steals}</td>
        <td>{performance.blocks}</td>
        <td>{performance.turnovers}</td>
        <td>{performance.points}</td>
      </tr>
    );
  })

  return (
    <table>
      <thead>
        <tr>
          <th>DATE</th>
          <th>FGA</th>
          <th>FGM</th>
          <th>3PA</th>
          <th>3PM</th>
          <th>FTA</th>
          <th>FTM</th>
          <th>OREB</th>
          <th>TREB</th>
          <th>AST</th>
          <th>STL</th>
          <th>BLK</th>
          <th>TO</th>
          <th>PTS</th>
        </tr>
      </thead>
      <tbody>
        {performanceList}
      </tbody>
     
    </table>
  );
}