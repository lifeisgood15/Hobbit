import { useEffect, useState, useContext } from "react";
import challengeContext from "../context/challenge/ChallengeContext";
import EditChallenge from "./EditChallenge";

function ChallengeTile({ challenge, onAction }) {
  const [motive, setMotive] = useState('')
  const [previousCompletedDates, setPreviousCompletedDates] = useState();
  const [disableDone, setDisableDone] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [showEdit, setShowEdit] = useState(false);

  const { addLog } = useContext(challengeContext)

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    let formattedDates = [];
    const today = new Date().setHours(23, 59, 59);
    setShowMotivation(new Date().getHours() < 16 ? false : true);
    if (challenge?.pastTries?.length) {
      challenge.pastTries.forEach((logDate) => {
        let logDateFm = new Date(logDate);
        formattedDates.push(
          `${logDateFm.getDate()}/ ${logDateFm.getMonth() + 1}`
        );
      });
    }

    challenge?.logs?.forEach((logDate) => {
      let logDateFm = new Date(logDate);
      if (Math.floor((today - logDateFm) / (1000 * 60 * 60 * 24)) === 0) {
        setDisableDone(true);
      }
      formattedDates.push(
        `${logDateFm.getDate()}/ ${logDateFm.getMonth() + 1}`
      );
    });
    setPreviousCompletedDates(formattedDates?.join(", "));

    const getFormattedSentence = async () => {
      if (showMotivation && !disableDone) {
        const baseUrl = 'PYTHONPORTURL'
        const motivationResponse = await fetch(`${baseUrl}/api/change_person?sentence=${challenge.motivation}`)
        const motivationFormatted = await motivationResponse.json();
        setMotive(motivationFormatted.formatted)
      }
    }
    getFormattedSentence()
  }, [challenge?.logs, challenge.motivation, challenge.pastTries, disableDone, showMotivation]);

  const handleDone = async (e) => {
    e.preventDefault();
    addLog(challenge._id, currentUser.jwt)

  };
  return (
    <>
      <div className="card challenge-tile">
        <div className="container">
          <div className="row my-2 ">
            <div className="col-9">
              <h3 className="fs-5 fw-light">{challenge.name}</h3>
              <div className="fs-6">
                {showMotivation && !disableDone && motive && (
                  <p className="text-secondary">Don't forget why you started this challenge: {motive}</p>
                )}
              </div>
              <div className="previous-completed-dates">
                {previousCompletedDates}
              </div>
            </div>
            <div className="col">
              <button
                type="button"
                className={
                  disableDone ? "btn btn-success" : "btn btn-outline-success"
                }
                title="Completed this today"
                onClick={handleDone}
                disabled={disableDone}
              >
                Done
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary mx-2"
                title="Edit this habit"
                onClick={() => setShowEdit((prev) => !prev)}
              >
                Edit
              </button>
            </div>
          </div>
          {showEdit && (
            <EditChallenge
              challenge={challenge}
              handleSubmit={() => {
                onAction(currentUser.id, currentUser.jwt);
                setShowEdit(false);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default ChallengeTile;
