import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import TeamCard from '../components/TeamCard';

export default function Dashboard() {
  const { loading, data, error } = useQuery(QUERY_ME);
  const teams = data?.me.teams;

  return (
    <>
      <h2>My Teams</h2>
      <div>
        {
          teams
          ?
          teams.map((team) => {
            return (
              <TeamCard
                key={team._id}
                teamName={team.name}
                league={team.league}
                players={team.players}
              />
            )
          })
          :
          <p>You don't have any teams yet!</p>
        }
      </div>
    </>
  );
}