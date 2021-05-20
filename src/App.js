import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";

function App() {
  const [tourList, settourList] = useState("");
  const [tourId, settourId] = useState("");
  const [leaderboardData, setleaderboardData] = useState("");
  const [newsData, setnewsData] = useState("");
  const [fetching, setfetching] = useState("not-fetching");

  //fetch PGA tournament data
  useEffect(() => {
    setfetching("fetching");
    fetch(`https://jason-11.herokuapp.com/pga-tourlist?season=2021`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "",
      },
      method: "get",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        settourList(data);
        // take the most recent ended tourID for leaderboard initoal population when initnated
        settourId(
          data
            .filter(
              (a) =>
                a.StartDate ===
                data
                  .filter((a) => a.IsOver)
                  .map((a) => a.StartDate)
                  .reduce((acc, value) => (acc > value ? acc : value))
            )
            .map((a) => a.TournamentID)
        );
      })

      .catch((err) => {
        setfetching("not-fetching");
        console.error(err);
      });

    fetch(`https://jason-11.herokuapp.com/pga-news`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "",
      },
      method: "get",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setnewsData(data);
      })

      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (tourId !== "") {
      loadLeaderboard(tourId);
    }
  }, [tourId]);

  //leaderboard fetch function based on tour id
  function loadLeaderboard(a) {
    setfetching("fetching");
    fetch(`https://jason-11.herokuapp.com/pga-leaderboard?tourId=${a}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "",
      },
      method: "get",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setleaderboardData(data);
        setfetching("not-fetching");
      })

      .catch((err) => {
        console.error(err);
      });
  }

  //date conversion function for various usages throught the app
  function dateConv(dateStr, arg) {
    let tempDate = new Date(dateStr);
    let returnVal;

    switch (arg) {
      case "YYYY":
        returnVal = tempDate.getFullYear();
        break;
      case "MMM":
        switch (tempDate.getMonth()) {
          case 0:
            returnVal = "Jan";
            break;
          case 1:
            returnVal = "Feb";
            break;
          case 2:
            returnVal = "Mar";
            break;
          case 3:
            returnVal = "Apr";
            break;
          case 4:
            returnVal = "May";
            break;
          case 5:
            returnVal = "Jun";
            break;
          case 6:
            returnVal = "Jul";
            break;
          case 7:
            returnVal = "Aug";
            break;
          case 8:
            returnVal = "Sep";
            break;
          case 9:
            returnVal = "Oct";
            break;
          case 10:
            returnVal = "Nov";
            break;
          case 11:
            returnVal = "Dec";
            break;
          default:
        }
        break;
      case "DD":
        returnVal = tempDate.getDate();
        break;
      case "DAY":
        switch (tempDate.getDay()) {
          case 0:
            returnVal = "Sunday";
            break;
          case 1:
            returnVal = "Monday";
            break;
          case 2:
            returnVal = "Tuesday";
            break;
          case 3:
            returnVal = "Wednesday";
            break;
          case 4:
            returnVal = "Thursday";
            break;
          case 5:
            returnVal = "Friday";
            break;
          case 6:
            returnVal = "Saturday";
            break;
          default:
        }
        break;
      default:
    }

    return returnVal;
  }

  return (
    <>
      <Nav
        fetchingFlag={fetching}
        tourList={tourList}
        leaderLoadFunc={loadLeaderboard}
        leadBdData={leaderboardData}
        news={newsData}
        dateFunc={dateConv}
      />
    </>
  );
}

export default App;
