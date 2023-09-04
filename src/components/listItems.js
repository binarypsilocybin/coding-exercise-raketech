import { useEffect, useState } from "react";
import {
  BsCheckCircleFill,
  BsFillDashCircleFill,
  BsFillXCircleFill,
} from "react-icons/bs";

const List = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [isError, setIsError] = useState(false);
  const [visible, setVisible] = useState(5);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        let response = await fetch(
          "https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=2020-2021"
        );
        if (response.status === 200) {
          setIsLoading(false);
          let data = await response.json();
          setTeams(data.table);
        }
      } catch (error) {
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  const styleLost = { color: "red", background: "white", borderRadius: "50%" };
  const styleWin = { color: "green", background: "white", borderRadius: "50%" };
  const styleDraw = { color: "gray", background: "white", borderRadius: "50%" };

  const FORM = {
    W: <BsCheckCircleFill style={styleWin} />,
    L: <BsFillXCircleFill style={styleLost} />,
    D: <BsFillDashCircleFill style={styleDraw} />,
  };

  const handleForm = (team) => {
    const icons = team.split("").map((l) => FORM[l]);
    return icons;
  };

  const handleShowMorePosts = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  return (
    <main>
      <section>
        {isLoading && <span>Loading...</span>}
        <div className="label">
          <span></span>
          <span></span>
          <span></span>
          <span>Form</span>
          <span>GP</span>
          <span>W</span>
          <span>D</span>
          <span>L</span>
          <span>GF</span>
          <span>GA</span>
          <span>GD</span>
          <span>Pts</span>
        </div>
        <div className="table">
          {teams.slice(0, visible).map((team, index) => {
            return (
              <div className="table-grid" key={index}>
                <span className="table-id">{index + 1}</span>
                <span>
                  <img src={team.strTeamBadge} alt="badge-team" />
                </span>
                <span className="table-team">{team.strTeam}</span>
                <span className="form-items">{handleForm(team.strForm)}</span>
                <span>{team.intPlayed}</span>
                <span>{team.intWin}</span>
                <span>{team.intDraw}</span>
                <span>{team.intLoss}</span>
                <span>{team.intGoalsFor}</span>
                <span>{team.intGoalsAgainst}</span>
                <span>{team.intGoalDifference}</span>
                <span>{team.intPoints}</span>
              </div>
            );
          })}
        </div>
        <button onClick={handleShowMorePosts}>Load more</button>
      </section>
    </main>
  );
};

export default List;
