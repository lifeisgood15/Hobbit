import { createContext, useReducer } from "react";
import challengeReducer from "./ChallengeReducer";
const challengeContext = createContext();

export const ChallengeProvider = ({ children }) => {
  const initialState = {
    challenges: [],
  };

  const [state, dispatch] = useReducer(challengeReducer, initialState);

  const fetchChallenges = async () => {
    try {
      const user = localStorage.getItem("user");
      const { id, jwt } = JSON.parse(user);

      const response = await fetch(
        `http://localhost:8000/challenge/my-challenges/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const responseData = await response.json();
      if (responseData) {
        console.log(responseData);
        let challengesFormatted = {
          inProgress: [],
          toRestart: [],
          completed: [],
          toStart: [],
        };
        responseData?.forEach((element) => {
          if (element.progress === "completed") {
            challengesFormatted.completed.push(element);
          } else if (element.progress === "gaveUp") {
            challengesFormatted.toStart.push(element);
          } else if (element.progress === "inProgress") {
            if (element.logs && element.logs.length > 0) {
              const lastEntry = element.logs[element.logs.length - 1];
              const todayMidnight = new Date().setHours(23, 59, 59);
              const daysSinceLastAttempt =
                (todayMidnight - new Date(lastEntry)) / (1000 * 60 * 60 * 24);
              if (daysSinceLastAttempt < 2) {
                challengesFormatted.inProgress.push(element);
              } else {
                challengesFormatted.toRestart.push(element);
              }
            } else {
              challengesFormatted.inProgress.push(element);
            }
          }
        });
        dispatch({ type: "GET_MY_CHALLENGES", payload: challengesFormatted });
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  const searchChallenges = async (searchStr) => {
    if (searchStr?.trim().length > 0) {
      try {
        const user = localStorage.getItem("user");
        const { id, jwt } = JSON.parse(user);

        const response = await fetch(
          `http://localhost:8000/challenge/my-challenges/${id}?search=${searchStr.trim()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }

        const responseData = await response.json();
        if (responseData) {
          console.log(responseData);
          let challengesFormatted = {
            inProgress: [],
            toRestart: [],
            completed: [],
            toStart: [],
          };
          responseData?.forEach((element) => {
            if (element.progress === "completed") {
              challengesFormatted.completed.push(element);
            } else if (element.progress === "gaveUp") {
              challengesFormatted.toStart.push(element);
            } else if (element.progress === "inProgress") {
              if (element.logs && element.logs.length > 0) {
                const lastEntry = element.logs[element.logs.length - 1];
                const todayMidnight = new Date().setHours(23, 59, 59);
                const daysSinceLastAttempt =
                  (todayMidnight - new Date(lastEntry)) / (1000 * 60 * 60 * 24);
                if (daysSinceLastAttempt < 2) {
                  challengesFormatted.inProgress.push(element);
                } else {
                  challengesFormatted.toRestart.push(element);
                }
              } else {
                challengesFormatted.inProgress.push(element);
              }
            }
          });
          dispatch({ type: "GET_MY_CHALLENGES", payload: challengesFormatted });
        }
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    }
  };

  const addLog = async (challengeId, token) => {
    return new Promise((resolve, reject) => {
      const url = `http://localhost:8000/challenge/add-log/${challengeId}`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.message) {
            alert(data.message);
            fetchChallenges();
            resolve(data.message);
          } else if (data?.error) {
            alert(data.error);
            reject(data.error);
          }
        })
        .catch((error) => {
          alert("An error occurred when trying to add log for today");
          reject("An error occurred when trying to add log for today", error);
        });
    });
  };

  const updatingAChallenge = async (challenge) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(
      `http://localhost:8000/challenge/update-challenge/${challenge._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.jwt}`,
        },
        body: JSON.stringify(challenge),
      }
    );
    const responseData = await response.json();
    if (responseData.message) {
      fetchChallenges();
      alert(responseData.message);
    } else if (responseData.error) {
      alert(responseData.error);
    }
  };

  const createAHabit = async (data) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    return new Promise(async (resolve, reject) => {
      const response = await fetch(
        "http://localhost:8000/challenge/add-challenge",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.jwt}`,
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      if (responseData.message) {
        resolve(responseData.message);
      } else if (responseData.error) {
        reject(responseData.error);
      }
    });
  };

  return (
    <challengeContext.Provider
      value={{
        ...state,
        dispatch,
        fetchChallenges,
        searchChallenges,
        addLog,
        updatingAChallenge,
        createAHabit,
      }}
    >
      {children}
    </challengeContext.Provider>
  );
};

export default challengeContext;
