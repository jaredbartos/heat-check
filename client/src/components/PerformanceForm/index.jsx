import { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { GET_SINGLE_PLAYER } from '../../utils/queries';
import { ADD_PERFORMANCE, UPDATE_PERFORMANCE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { formatEditDate } from '../../utils/dates';

export default function PerformanceForm({ action, currentPlayer, currentPerformance, makeFormInvisible }) {
  const [formState, setFormState] = useState({
    _id: '',
    date: '',
    fgAtt: '',
    fgMade: '',
    threePtAtt: '',
    threePtMade: '',
    ftAtt: '',
    ftMade: '',
    offReb: '',
    rebounds: '',
    assists: '',
    steals: '',
    blocks: '',
    turnovers: '',
    points: ''
  });

  useEffect(() => {
    // If current performance prop is provided,
    // set formState to attributes for editing
    if (currentPerformance) {
      setFormState({
        _id: currentPerformance._id,
        date: formatEditDate(currentPerformance.date),
        fgAtt: currentPerformance.fgAtt,
        fgMade: currentPerformance.fgMade,
        threePtAtt: currentPerformance.threePtAtt,
        threePtMade: currentPerformance.threePtMade,
        ftAtt: currentPerformance.ftAtt,
        ftMade: currentPerformance.ftMade,
        offReb: currentPerformance.offReb,
        rebounds: currentPerformance.rebounds,
        assists: currentPerformance.assists,
        steals: currentPerformance.steals,
        blocks: currentPerformance.blocks,
        turnovers: currentPerformance.turnovers,
        points: currentPerformance.points
      });
    }
  }, [currentPerformance, setFormState]);

  const [addPerformance] = useMutation(ADD_PERFORMANCE, {
    refetchQueries: [
      GET_SINGLE_PLAYER,
      'getSinglePlayer'
    ]
  });
  const [updatePerformance] = useMutation(UPDATE_PERFORMANCE, {
    refetchQueries: [
      GET_SINGLE_PLAYER,
      'getSinglePlayer'
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // When setting formState
    // if any key other than date is being updated, convert value to number type
    // for submission to database
    setFormState(
      name != 'date' ?
      {
        ...formState,
        [name]: Number(value)
      } :
      {
        ...formState,
        [name]: value
      }
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();    
    const { _id, ...input } = formState;
    const date = new Date(input.date);

    if (action === 'create') {
      try {
        await addPerformance({
          variables: {
            input: {
              ...input,
              date,
              player: currentPlayer._id
            },
            createdBy: Auth.getProfile().data._id
          }
        })
      } catch (error) {
        console.log(error);
      }
    } else {
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

    setFormState({
      _id: '',
      date: '',
      fgAtt: '',
      fgMade: '',
      threePtAtt: '',
      threePtMade: '',
      ftAtt: '',
      ftMade: '',
      offReb: '',
      rebounds: '',
      assists: '',
      steals: '',
      blocks: '',
      turnovers: '',
      points: ''
    });

    makeFormInvisible();    
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <table>
        <thead>
          <tr>
            <th>
              <label htmlFor="dateInput">
                DATE
              </label>
            </th>
            <th>
              <label htmlFor="fgaInput">
                FGA
              </label>
            </th>
            <th>
              <label htmlFor="fgmInput">
                FGM
              </label>
            </th>
            <th>
              <label htmlFor="3PAInput">
                3PA
              </label>
            </th>
            <th>
              <label htmlFor="3PMInput">
                3PM
              </label>
            </th>
            <th>
              <label htmlFor="ftaInput">
                FTA
              </label>
            </th>
            <th>
              <label htmlFor="ftmInput">
                FTM
              </label>
            </th>
            <th>
              <label htmlFor="offRebInput">
                OREB
              </label>
            </th>
            <th>
              <label htmlFor="totRebsInput">
                TREB
              </label>
            </th>
            <th>
              <label htmlFor="astInput">
                AST
              </label>
            </th>
            <th>
              <label htmlFor="stlInput">
                STL
              </label>
            </th>
            <th>
              <label htmlFor="blkInput">
                BLK
              </label>
            </th>
            <th>
              <label htmlFor="turnoversInput">
                TO
              </label>
            </th>
            <th>
              <label htmlFor="pointsInput">
                PTS
              </label>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                id="dateInput"
                type="date"
                name="date"
                onChange={handleInputChange}
                value={formState.date}
              />
            </td>
            <td>
              <input
                id="fgaInput"
                type="number"
                name="fgAtt"
                min="0"
                onChange={handleInputChange}
                value={formState.fgAtt}
              />
            </td>
            <td>
              <input
                id="fgmInput"
                type="number"
                name="fgMade"
                min="0"
                onChange={handleInputChange}
                value={formState.fgMade}
              />
            </td>
            <td>
              <input
                id="3PAInput"
                type="number"
                name="threePtAtt"
                min="0"
                onChange={handleInputChange}
                value={formState.threePtAtt}
              />
            </td>
            <td>
              <input
                id="3PMInput"
                type="number"
                name="threePtMade"
                min="0"
                onChange={handleInputChange}
                value={formState.threePtMade}
              />
            </td>
            <td>
              <input
                id="ftaInput"
                type="number"
                name="ftAtt"
                min="0"
                onChange={handleInputChange}
                value={formState.ftAtt}
              />
            </td>
            <td>
              <input
                id="ftmInput"
                type="number"
                name="ftMade"
                min="0"
                onChange={handleInputChange}
                value={formState.ftMade}
              />
            </td>
            <td>
              <input
                id="offRebInput"
                type="number"
                name="offReb"
                min="0"
                onChange={handleInputChange}
                value={formState.offReb}
              />
            </td>
            <td>
              <input
                id="totRebsInput"
                type="number"
                name="rebounds"
                min="0"
                onChange={handleInputChange}
                value={formState.rebounds}
              />
            </td>
            <td>
              <input
                id="astInput"
                type="number"
                name="assists"
                min="0"
                onChange={handleInputChange}
                value={formState.assists}
              />
            </td>
            <td>
              <input
                id="stlInput"
                type="number"
                name="steals"
                min="0"
                onChange={handleInputChange}
                value={formState.steals}
              />
            </td>
            <td>
              <input
                id="blkInput"
                type="number"
                name="blocks"
                min="0"
                onChange={handleInputChange}
                value={formState.blocks}
              />
            </td>
            <td>
              <input
                id="turnoversInput"
                type="number"
                name="turnovers"
                min="0"
                onChange={handleInputChange}
                value={formState.turnovers}
              />
            </td>
            <td>
              <input
                id="pointsInput"
                type="number"
                name="points"
                min="0"
                onChange={handleInputChange}
                value={formState.points}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {
        action === 'create'
        ?
        <button type="submit" id="submitNewPerformanceBtn">Add Game</button>
        :
        <button type="submit" id="updatePerformanceBtn">Update Game</button>
      }      
    </form>
  );
}