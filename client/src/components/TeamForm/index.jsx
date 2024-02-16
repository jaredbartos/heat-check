import { GET_TEAMS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

export default function TeamForm(props) {
  const [leagues, setLeagues] = useState([]);
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

  const leagueOptions = leagues.map((league, index) => 
    <option key={index} value={league}>{league}</option>
  );

  return (
    <form onSubmit={props.handleFormSubmit}>
      <label htmlFor="newTeamNameInput">
        Name: 
      </label>
      <input
        id="newTeamNameInput"
        type="text"
        name="newTeamName"
        onChange={props.handleInputChange}
        value={props.newTeamName}
      />
      <label htmlFor="newTeamLeagueOption">
        League: 
      </label>
      <select
        onChange={props.handleInputChange}
        value={props.newTeamLeague}
        name="newTeamLeague"
      >
        <option value="Independent">Independent</option>
        {leagueOptions}       
        <option value="Enter New League Name">Enter New League Name</option>
      </select>
      {
        (props.newTeamLeague === 'Enter New League Name')
        &&
        <input
          id="customTeamLeagueInput"
          onChange={props.handleInputChange}
          type="text"
          name="customTeamLeague"
          value={props.customTeamLeague}
        />
      }
      <button type="submit" id="submitNewTeamBtn">Add Team</button>
    </form>
  );
}