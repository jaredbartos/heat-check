import { GET_TEAMS, GET_ME } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_SINGLE_TEAM } from '../../utils/queries';
import { ADD_TEAM, UPDATE_TEAM } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function TeamForm({ currentTeam, action, makeFormInvisible }) {
  const [leagues, setLeagues] = useState([]);
  const [formState, setFormState] = useState(
    currentTeam ? {
      newTeamName: currentTeam.name,
      newTeamLeague: currentTeam.league,
      customTeamLeague: ''
    } : {
      newTeamName: '',
      newTeamLeague: 'Independent',
      customTeamLeague: ''
    }
  );
  const [addTeam] = useMutation(ADD_TEAM, {
    refetchQueries: [
      GET_ME,
      GET_TEAMS,
    ]
  });
  const [updateTeam] = useMutation(UPDATE_TEAM, {
    refetchQueries: [
      GET_SINGLE_TEAM
    ]
  });
  const { data } = useQuery(GET_TEAMS);

  // Use database data to set league states
  useEffect(() => {
    if (data) {
      // Extract leagues from the team data
      let teamLeagues = [];
      for (let i = 0; i < data.teams.length; i++) {
        const currentTeamLeague = data.teams[i].league;
        if (!teamLeagues.includes(currentTeamLeague) && currentTeamLeague !== 'Independent') {
          teamLeagues.push(currentTeamLeague);
        }
      }
      // Set leagues
      setLeagues(teamLeagues);
    }
    
  }, [data, setLeagues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const name = formState.newTeamName;
    // Set league as newTeamLeague value unless user chose to add custom name
    const league = formState.newTeamLeague !== 'Enter New League Name'
      ?
      formState.newTeamLeague
      :
      formState.customTeamLeague;

    if (action === 'create') {
      try {
        await addTeam({
          variables: {
            name,
            league,
            createdBy: Auth.getProfile().data._id
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await updateTeam({
          variables: {
            _id: currentTeam._id,
            name,
            league
          }
        });
      } catch (err) {
        console.log(err);
      }
    }

    setFormState({
      newTeamName: '',
      newTeamLeague: 'Independent',
      customTeamLeague: ''
    });

    makeFormInvisible();
  };

  const leagueOptions = leagues.map((league, index) => 
    <option key={index} value={league}>{league}</option>
  );

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="newTeamNameInput">
        Name: 
      </label>
      <input
        id="newTeamNameInput"
        type="text"
        name="newTeamName"
        onChange={handleInputChange}
        value={formState.newTeamName}
      />
      <label htmlFor="newTeamLeagueOption">
        League: 
      </label>
      <select
        onChange={handleInputChange}
        value={formState.newTeamLeague}
        name="newTeamLeague"
      >
        <option value="Independent">Independent</option>
        {leagueOptions}       
        <option value="Enter New League Name">Enter New League Name</option>
      </select>
      {
        (formState.newTeamLeague === 'Enter New League Name')
        &&
        <input
          id="customTeamLeagueInput"
          onChange={handleInputChange}
          type="text"
          name="customTeamLeague"
          value={formState.customTeamLeague}
        />
      }
      {
        action === 'create'
        ?
        <button type="submit" id="submitNewTeamBtn">Add Team</button>
        :
        <button type="submit" id="updateTeamBtn">Update Team</button>
      }
      
    </form>
  );
}