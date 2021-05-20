import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Tournaments from "./Tournaments";
import Leaderboard from "./Leaderboard";
import News from "./News";

/*
- React router is used in Nav 
- While fetching, navigation link is ignored
 
*/
function Nav(props) {
  return (
    <Router>
      <div>
        <nav className="main-nav">
          <p className="scramble-warning">
            *** Scrambled info by data provider ***
          </p>
          <p className="main-title">
            PGA TOUR clone{" "}
            <span hidden={props.fetchingFlag !== "fetching" ? true : false}>
              ...Loading
            </span>
          </p>{" "}
          <ul className="main-nav-list">
            <li>
              <Link
                to={
                  props.fetchingFlag === "not-fetching" ? "/Tournaments" : "#"
                }
              >
                Tournaments
              </Link>
            </li>
            <li>
              <Link
                to={
                  props.fetchingFlag === "not-fetching" ? "/Leaderboard" : "#"
                }
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link to={props.fetchingFlag === "not-fetching" ? "/News" : "#"}>
                News
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/Tournaments">
            <Tournaments
              tourList={props.tourList}
              leaderBDFunc={props.leaderLoadFunc}
              dateConv={props.dateFunc}
            />
          </Route>
          <Route path="/Leaderboard">
            {props.leadBdData !== null ? (
              <Leaderboard
                lbData={props.leadBdData}
                dateConv={props.dateFunc}
              />
            ) : (
              ""
            )}
          </Route>
          <Route path="/News">
            <News newsData={props.news} dateConv={props.dateFunc} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Nav;
