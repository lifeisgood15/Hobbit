import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import challengeContext from "../context/challenge/ChallengeContext";
function NewChallenge() {
  const navigate = useNavigate();

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

  const { createAHabit } = useContext(challengeContext);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

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
  const returnHome = () => {
    navigate("/");
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
      };
      createAHabit(data)
        .then((message) => {
          alert(message);
          returnHome();
          setFormData({
            challengeName: "",
            challengeMotivation: "",
            targetAchievement: "",
          });
          setFormErrors({
            challengeName: false,
            challengeMotivation: false,
            targetAchievement: false,
          });
        })
        .catch((err) => {
          alert(`Something went wrong, ${err}`);
        });
    }
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
                <div className="text-danger">Name your habit</div>
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
                  What motivates you? Mention in few words
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
                <div className="text-danger">
                  What do you want to achieve by this? Please mention.
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary submit-button mb-2"
              onClick={onSubmit}
            >
              Start
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default NewChallenge;
