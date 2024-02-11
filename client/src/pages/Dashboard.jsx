import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import TeamCard from '../components/TeamCard';

export default function Dashboard () {
  // const [teams, setTeams] = useState([]);
  const { loading, data, error } = useQuery(QUERY_ME);
  const teams = data?.me.teams;

  return (
    <>
      <h2>Dashboard</h2>
      <div>
        <h3>My Teams</h3>
        {loading &&  <p>Loading...</p>}
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