import { nanoid } from "nanoid";

function Leaderboard(props) {
  //console.log(props);
  const SCRAMBLEFACTOR = 1;

  const PARSTROKE = props.lbData.Tournament.Par * 4;
  const leaderboard = props.lbData.Players.filter(
    (a) => a.Rank !== null && a.Rounds.length > 3
  ).map((data, index) => (
    <tr key={nanoid()} className={index % 2 === 0 ? "even" : "odd"}>
      <td>
        <span>{data.Rank}</span>
      </td>
      <td>
        <span>{data.Country}</span>
      </td>
      <td>
        <span>{data.Name}</span>
      </td>
      <td>
        <span>
          {Math.round(data.TotalStrokes * SCRAMBLEFACTOR) - PARSTROKE}
        </span>
      </td>
      <td>
        <span>{Math.round(data.Rounds[0].Score * SCRAMBLEFACTOR)}</span>
      </td>
      <td>
        <span>{Math.round(data.Rounds[1].Score * SCRAMBLEFACTOR)}</span>
      </td>
      <td>
        <span>{Math.round(data.Rounds[2].Score * SCRAMBLEFACTOR)}</span>
      </td>
      <td>
        <span>{Math.round(data.Rounds[3].Score * SCRAMBLEFACTOR)}</span>
      </td>
      <td>
        <span>{Math.round(data.TotalStrokes * SCRAMBLEFACTOR)}</span>
      </td>
    </tr>
  ));

  return (
    <div className="leaderboard-wrap">
      <div className="leaderboard-tour-name">
        {props.lbData.Tournament.Name}
      </div>
      <div>
        <span>
          {`${props.dateConv(
            props.lbData.Tournament.StartDate,
            "DAY"
          )} ${props.dateConv(
            props.lbData.Tournament.StartDate,
            "MMM"
          )}. ${props.dateConv(
            props.lbData.Tournament.StartDate,
            "DD"
          )} - ${props.dateConv(
            props.lbData.Tournament.EndDate,
            "DAY"
          )}, ${props.dateConv(
            props.lbData.Tournament.EndDate,
            "MMM"
          )}. ${props.dateConv(
            props.lbData.Tournament.EndDate,
            "DD"
          )}, ${props.dateConv(props.lbData.Tournament.EndDate, "YYYY")} `}
          {props.lbData.Tournament.City} ,{props.lbData.Tournament.State}
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>POS</th>
            <th>COUNTRY</th>
            <th>PLAYER</th>
            <th>TOT</th>
            <th>R1</th>
            <th>R2</th>
            <th>R3</th>
            <th>R4</th>
            <th>STROKES</th>
          </tr>
        </thead>
        <tbody>{leaderboard}</tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
