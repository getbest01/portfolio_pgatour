// applied useHistory to navigate between routers programtically.
//ref: https://ultimatecourses.com/blog/programmatically-navigate-react-router

import React from "react";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";

function Tournaments(props) {
  const history = useHistory();
  const tournamentList = props.tourList.map((data, index) => (
    <tr key={nanoid()} className={index % 2 === 0 ? "even" : "odd"}>
      <td>
        <span>
          {`${props.dateConv(data.StartDate, "MMM")} ${props.dateConv(
            data.StartDate,
            "DD"
          )} - 
          ${
            props.dateConv(data.StartDate, "MMM") ===
            props.dateConv(data.EndDate, "MMM")
              ? ""
              : props.dateConv(data.EndDate, "MMM")
          } 
          ${props.dateConv(data.EndDate, "DD")}, ${props.dateConv(
            data.EndDate,
            "YYYY"
          )}`}
        </span>
      </td>
      <td>
        <div className="tour-list-name">{data.Name}</div>
        <span>{data.Venue + ", "}</span>
        <span>{data.City + ", "}</span>
        <span>{data.Country + " ~ "}</span>
        <span> Purse:${parseFloat(data.Purse).toLocaleString()}</span>
      </td>
      <td>
        <span>{data.Format}</span>
      </td>
      <td>
        <button
          id={data.TournamentID}
          onClick={(e) => {
            props.leaderBDFunc(e.target.id);
            history.replace("/Leaderboard");
          }}
          hidden={!data.IsOver}
        >
          Available
        </button>
      </td>
    </tr>
  ));

  return (
    <table className="tournament-wrap">
      <thead className="table-header">
        <tr>
          <th>DATE</th>
          <th>TOURNAMENT</th>
          <th>FORMAT</th>
          <th>LEADERBOARD</th>
        </tr>
      </thead>
      <tbody>{tournamentList}</tbody>
    </table>
  );
}

export default Tournaments;
