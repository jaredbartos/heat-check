// Function to extract leagues from team data
export const getLeagues = teams => {
  // Always include independent option
  let teamLeagues = ['Independent'];
  for (let i = 0; i < teams.length; i++) {
    const currentTeamLeague = teams[i].league;
    if (!teamLeagues.includes(currentTeamLeague)) {
      teamLeagues.push(currentTeamLeague);
    }
  }
  teamLeagues.sort();

  return teamLeagues;
};
