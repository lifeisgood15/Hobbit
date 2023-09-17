import { useEffect, useState, useContext } from "react";
import challengeContext from "../context/challenge/ChallengeContext";

function EditChallenge({ challenge, handleSubmit }) {
  const [formData, setFormData] = useState({
    challengeName: "",
    challengeMotivation: "",
    targetAchievement: "",
  });
  const [formErrors, setFormErrors] = useState({
    challengeName: false,
    challengeMotivation: false,
    targetAchievement: false,
  });

  const [currentUser, setCurrentUser] = useState();

  const { updatingAChallenge } = useContext(challengeContext)

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
      if (challenge) {
        setFormData({
          challengeName: challenge.name,
          challengeMotivation: challenge.motivation,
          targetAchievement: challenge.target,
        });
      }
    }
    if (challenge) {
      setFormData({
        challengeName: challenge.name,
        challengeMotivation: challenge.motivation,
        targetAchievement: challenge.target,
      });
    }
  }, [challenge]);

  const onChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    setFormErrors((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value?.length < 3,
      };
    });
  };



  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.challengeName ||
      !formData.challengeMotivation ||
      !formData.targetAchievement ||
      formData.challengeName.length < 3 ||
      formData.challengeMotivation.length < 3 ||
      formData.targetAchievement.length < 3
    ) {
      alert(
        `Please fill all the fields in detail. I promise these would be helpful later`
      );
    } else {
      console.log(formData);
      const data = {
        name: String(formData.challengeName).trim().normalize(),
        motivation: String(formData.challengeMotivation).trim().normalize(),
        target: String(formData.targetAchievement).trim().normalize(),
        userId: currentUser?.id,
        _id: challenge._id
      };
      updatingAChallenge(data);
    }
  };

  const handleGivingUp = (e) => {
    e.preventDefault();
    updatingAChallenge({ progress: "gaveUp", _id: challenge._id });
  };

  return (
    <>
      <div className="card mx-2 my-3">
        <div className="card-body">
          <h5 className="card-title">Start a new habit</h5>
          <form className="mx-3">
            <div className="form-group mb-4">
              <label htmlFor="challengeName">Name</label>
              <input
                type="text"
                className="form-control"
                id="challengeName"
                name="challengeName"
                value={formData.challengeName}
                placeholder="Wake up at 6"
                onChange={onChange}
              />
              {formErrors.challengeName && (
                <div className="text-danger">Please enter a valid name.</div>
              )}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="challengeMotivation">Your Motivation</label>
              <textarea
                rows="3"
                className="form-control"
                id="challengeMotivation"
                name="challengeMotivation"
                value={formData.challengeMotivation}
                placeholder="I want to wake up at six so that I have more free time for myself"
                onChange={onChange}
              />
              {formErrors.challengeMotivation && (
                <div className="text-danger">
                  Please enter a valid motivation.
                </div>
              )}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="targetAchievement">Achievement</label>
              <input
                type="text"
                className="form-control"
                id="targetAchievement"
                name="targetAchievement"
                value={formData.targetAchievement}
                placeholder="Make it a habit to wake up early"
                onChange={onChange}
              />
              {formErrors.targetAchievement && (
                <div className="text-danger">Please enter a target.</div>
              )}
            </div>
            <button
              type="submit"
              className="btn submit-button mb-2"
              onClick={onSubmit}
            >
              Modify
            </button>
            <button
              type="submit"
              className="btn do-it-later-button mb-2 mx-2"
              onClick={handleGivingUp}
            >
              I will start this habit some other time
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditChallenge;
