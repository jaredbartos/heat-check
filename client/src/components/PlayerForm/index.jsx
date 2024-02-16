import { useState, useEffect } from 'react';
import { ADD_PLAYER, UPDATE_PLAYER } from '../../utils/mutations';
import { GET_SINGLE_TEAM, GET_SINGLE_PLAYER } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

export default function PlayerForm({ action, currentPlayer, currentTeam, makeFormInvisible }) {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    number: '',
    position: 'Guard',
    height: {
      feet: '',
      inches: ''
    },
    weight: ''
  });

  useEffect(() => {
    // If current player prop is provided,
    // set formState to attributes for editing
    if (currentPlayer) {
      const heightArr = currentPlayer.height.split("'");
      const feet = heightArr[0];
      const inches = heightArr[1].split('"')[0];
      setFormState({
        firstName: currentPlayer.firstName,
        lastName: currentPlayer.lastName,
        number: currentPlayer.number,
        position: currentPlayer.position,
        height: {
          feet,
          inches
        },
        weight: currentPlayer.weight
      });
    }
  }, [currentPlayer, setFormState]);


  const [addPlayer] = useMutation(ADD_PLAYER, {
    refetchQueries: [
      GET_SINGLE_TEAM,
      'getSingleTeam'
    ]
  });
  const [updatePlayer] = useMutation(UPDATE_PLAYER, {
    refetchQueries: [
      GET_SINGLE_PLAYER,
      'getSinglePlayer'
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name != 'feet' && name != 'inches') {
      setFormState({
        ...formState,
        [name]: value
      });
    } else {
      setFormState({
        ...formState,
        height: {
          ...formState.height,
          [name]: value
        }
      });
    }
  };

  // Submit handler function for form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Format height to string for database entry
    const { feet, inches } = formState.height;
    const height = `${feet}'${inches}"`;

    if (action === 'create') {
      const input = {
        ...formState,
        number: Number(formState.number),
        weight: Number(formState.weight),
        height,
        team: currentTeam._id
      };
      try {
        await addPlayer({
          variables: {
              input,
              createdBy: Auth.getProfile().data._id
            }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      const input = {
        ...formState,
        number: Number(formState.number),
        weight: Number(formState.weight),
        height
      };
      try {
        await updatePlayer({
          variables: {
            _id: currentPlayer._id,
            input
          }
        })
      } catch (err) {
        console.log(err);
      }
    }

    setFormState({
      firstName: '',
      lastName: '',
      number: '',
      position: '',
      height: {
        feet: '',
        inches: ''
      },
      weight: ''
    });

    makeFormInvisible();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="firstNameInput">
        First Name: 
      </label>
      <input
        id="firstNameInput"
        type="text"
        name="firstName"
        onChange={handleInputChange}
        value={formState.firstName}
      />
      <label htmlFor="lastNameInput">
        Last Name: 
      </label>
      <input
        id="lastNameInput"
        type="text"
        name="lastName"
        onChange={handleInputChange}
        value={formState.lastName}
      />
      <label htmlFor="numberInput">
        Number: 
      </label>
      <input
        id="numberInput"
        type="number"
        name="number"
        min="0"
        max="99"
        onChange={handleInputChange}
        value={formState.number}
      />
      <label htmlFor="positionSelect">
        Position: 
      </label>
      <select
        onChange={handleInputChange}
        value={formState.position}
        id="positionSelect"
        name="position"
      >
        <option value="Guard">Guard</option>
        <option value="Forward">Forward</option>
        <option value="Center">Center</option>
      </select>
      <label htmlFor="feetInput">
        Height:  
      </label>
      <input
        id="feetInput"
        type="number"
        min="3"
        max="7"
        name="feet"
        onChange={handleInputChange}
        value={formState.height.feet}
      ></input>
      feet 
      <input
        id="inchesInput"
        type="number"
        min="0"
        max="11"
        name="inches"
        onChange={handleInputChange}
        value={formState.height.inches}
      />
      inches 
      <label htmlFor="weightInput">
        Weight: 
      </label>
      <input
        id="weightInput"
        type="number"
        min="0"
        name="weight"
        onChange={handleInputChange}
        value={formState.weight}
      />
      {
        action === 'create'
        ?
        <button type="submit" id="submitNewPlayerBtn">Add Player</button>
        :
        <button type="submit" id="updatePlayerBtn">Update Player</button>
      }     
    </form>
  );
}