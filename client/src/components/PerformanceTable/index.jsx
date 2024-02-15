import { formatDate, formatEditDate } from '../../utils/dates';
import { UPDATE_PERFORMANCE } from '../../utils/mutations';
import { GET_SINGLE_PLAYER } from '../../utils/queries';
import PerformanceForm from '../PerformanceForm';
import { useState } from 'react';
import { useMutation } from '@apollo/client';

export default function PerformanceTable(props) {
  const [formVisible, setFormVisible] = useState(false)
  const [updatePerformance] = useMutation(UPDATE_PERFORMANCE, {
    refetchQueries: [
      GET_SINGLE_PLAYER,
      'getSinglePlayer'
    ]
  });

  const handleEditClick = (e, performance) => {
    e.preventDefault();

    props.setFormState({
      _id: performance._id,
      date: formatEditDate(performance.date),
      fgAtt: performance.fgAtt,
      fgMade: performance.fgMade,
      threePtAtt: performance.threePtAtt,
      threePtMade: performance.threePtMade,
      ftAtt: performance.ftAtt,
      ftMade: performance.ftMade,
      offReb: performance.offReb,
      rebounds: performance.rebounds,
      assists: performance.assists,
      steals: performance.steals,
      blocks: performance.blocks,
      turnovers: performance.turnovers,
      points: performance.points
    });

    setFormVisible(true);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { _id, ...input } = props.formState;
    const date = new Date(input.date);
    console.log(_id);
    try {
      await updatePerformance({
        variables: {
          _id,
          input: {
            ...input,
            date
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Create copy of performance array and sort it by date
  const performancesCopy = [...props.player.performances];
  const sortedPerformances = performancesCopy.sort((a, b) => Number(b.date) - Number(a.date));
  const performanceList = sortedPerformances.map((performance) => {
    return (
      <tr key={performance._id}>
        <td>{formatDate(performance.date)}</td>
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
        <td>
          <button
            type="button"
            className="editPerformanceBtn"
            onClick={(e) => handleEditClick(e, performance)}
          >
            Edit
          </button>
        </td>
      </tr>
    );
  })

  return (
    <>
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
    {
      formVisible
      &&
      <PerformanceForm
        handleInputChange={props.handleInputChange}
        handleFormSubmit={handleFormSubmit}
        formState={props.formState}
        action='update'
      />
    }
    </>
  );
}