import { GET_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import TeamCard from '../components/TeamCard';
import TeamForm from '../components/TeamForm';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { loading, data, error } = useQuery(GET_ME);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if (data) {
      setTeams(data.me.teams);
      setPlayers(data.me.players);
    }
  }, [data, setTeams, setPlayers]);

  return (
    <>
      <h2>Your Dashboard</h2>
      <button
          type="button"
          onClick={() => setFormVisible(true)}
        >
          Add Team
      </button>
      {
        formVisible
        &&
        <TeamForm
          makeFormInvisible={() => setFormVisible(false)}
          action='create'  
        />
      }
      <div>
        {
          teams.length
          ?
          teams.map((team) => {
            return (
              <TeamCard
                key={team._id}
                teamId={team._id}
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