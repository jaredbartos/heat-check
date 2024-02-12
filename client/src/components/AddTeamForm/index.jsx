export default function AddTeamForm(props) {
  const leagueOptions = props.leagues.map((league, index) => 
    <option key={index} value={league}>{league}</option>
  );

  return (
    <form>
      <label htmlFor="newTeamNameInput">
        Name: 
      </label>
      <input
        id="newTeamNameInput"
        type="text"
        name="newTeamName"
        value={props.newTeamName}
      />
      <label htmlFor="newTeamLeagueOption">
        League: 
      </label>
      <select value={props.newTeamLeague} name="newTeamLeague">
        {leagueOptions}
        <option value="None">None</option>
        <options value="Enter New League Name">Enter New League Name</options>
      </select>
      {
        (props.newTeamLeague === 'Enter New League Name')
        &&
        <input
          id="customTeamLeagueInput"
          type="text"
          name="customTeamLeague"
          value={props.customTeamLeague}
        />
      }
      <button type="submit" id="submitNewTeamBtn">Add Team</button>
    </form>
  );
}