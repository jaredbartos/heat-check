import { formatDate } from '../../utils/dates';
import { DELETE_PERFORMANCE } from '../../utils/mutations';
import { GET_SINGLE_PLAYER } from '../../utils/queries';
import PerformanceForm from '../PerformanceForm';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

export default function PerformanceTable({ player }) {
  const [formVisible, setFormVisible] = useState(false)
  const [selectedPerformance, setSelectedPerformance] = useState();

  const [deletePerformance] = useMutation(DELETE_PERFORMANCE, {
    refetchQueries: [
      GET_SINGLE_PLAYER,
      'getSinglePlayer'
    ]
  });

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await deletePerformance({
        variables: {
          _id: id
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Create copy of performance array and sort it by date
  const performancesCopy = [...player.performances];
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
          {
            // Only allow user to edit or delete if they created the entry
            (Auth.loggedIn() && Auth.getProfile().data._id === player.createdBy._id)
            &&
            <>
              <button
                type="button"
                className="editPerformanceBtn"
                onClick={() => {
                    setFormVisible(true);
                    setSelectedPerformance(performance);
                  }
                }
              >
                Edit
              </button>
              <button
                type="button"
                className="deletePerformanceBtn"
                onClick={(e) => handleDelete(e, performance._id)}
              >
                Delete
              </button>
            </>
          }

        </td>
      </tr>
    );
  })

  return (
    <>
    {
      player.performances
      ?
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
            makeFormInvisible={() => setFormVisible(false)}
            currentPerformance={selectedPerformance}
            action='update'
          />
        }
      </>
      :
      <p>This player has no games played!</p>
    }    
    </>
  );
}