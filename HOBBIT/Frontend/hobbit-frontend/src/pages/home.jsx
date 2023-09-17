import { useEffect, useContext } from "react";
import challengeContext from "../context/challenge/ChallengeContext";
import { useNavigate } from "react-router-dom";
import ChallengeTile from "../components/ChallengeTile";
function Home() {
  const navigate = useNavigate();
  const { challenges, fetchChallenges } = useContext(challengeContext)

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      fetchChallenges();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <nav>
        <div className="nav nav-tabs challenge-stages" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-active-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-Active"
            type="button"
            role="tab"
            aria-controls="nav-Active"
            aria-selected="true"
          >
            Active
          </button>
          <button
            className="nav-link"
            id="nav-completed-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-completed"
            type="button"
            role="tab"
            aria-controls="nav-completed"
            aria-selected="false"
          >
            Completed
          </button>
          <button
            className="nav-link"
            id="nav-to-start-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-to-start"
            type="button"
            role="tab"
            aria-controls="nav-to-start"
            aria-selected="false"
          >
            Start
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-Active"
          role="tabpanel"
          aria-labelledby="nav-Active-tab"
        >
          {challenges?.inProgress &&
            challenges.inProgress.map((challenge) => {
              return (
                <ChallengeTile
                  challenge={challenge}
                  key={challenge._id}
                  onAction={fetchChallenges}
                />
              );
            })}

          {challenges?.toRestart?.length > 0 && (
            <>
              <div className="text-warning">
                You stopped these. No problem, you can restart!
              </div>
              {challenges.toRestart.map((challenge) => {
                return (
                  <ChallengeTile
                    challenge={challenge}
                    key={challenge._id}
                    onAction={fetchChallenges}
                  />
                );
              })}
            </>
          )}
        </div>
        <div
          className="tab-pane fade"
          id="nav-completed"
          role="tabpanel"
          aria-labelledby="nav-completed-tab"
        >
          {challenges?.inProgress &&
            challenges.completed.map((challenge) => {
              return (
                <ChallengeTile
                  challenge={challenge}
                  key={challenge._id}
                  onAction={fetchChallenges}
                />
              );
            })}
        </div>
        <div
          className="tab-pane fade"
          id="nav-to-start"
          role="tabpanel"
          aria-labelledby="nav-to-start-tab"
        >
          {challenges?.inProgress &&
            challenges.toStart.map((challenge) => {
              return (
                <ChallengeTile
                  challenge={challenge}
                  key={challenge._id}
                  onAction={fetchChallenges}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
