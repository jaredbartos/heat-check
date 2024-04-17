// Function to extract leagues from team data
export const getLeagues = teams => {
	let teamLeagues = [];
	for (let i = 0; i < teams.length; i++) {
		const currentTeamLeague = teams[i].league;
		if (
			!teamLeagues.includes(currentTeamLeague) &&
			currentTeamLeague !== 'Independent'
		) {
			teamLeagues.push(currentTeamLeague);
		}
	}

	return teamLeagues;
};
