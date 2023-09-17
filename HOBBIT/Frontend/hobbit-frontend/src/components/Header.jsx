import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import challengeContext from "../context/challenge/ChallengeContext";
function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [searchIp, setSearchIp] = useState('')
  const { searchChallenges } = useContext(challengeContext)

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setUser(true);
    } else {
      // navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setSearchIp(e.target.value)
  }

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      searchChallenges(searchIp)
    }
  }
  const goToHome = () => {
    navigate("/");
  };

  const goToCreateNew = () => {
    navigate("/new");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mx-1">
        <button
          className="navbar-brand btn btn-outline-light hobbit-logo"
          onClick={goToHome}
        >
          Hobbit
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <button className="nav-link" onClick={goToHome}>
                    Home <span className="sr-only"></span>
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={goToCreateNew}>
                    New Habit <span className="sr-only"></span>
                  </button>
                </li>
                <li className="nav-item">
                  <input type="search" placeholder="Search.." className="mt-1 search-box" onChange={handleChange} onKeyUp={handleKeyUp} />
                </li>
                <li className="nav-item ml-5 logout-btn">
                  <button className="nav-link" onClick={logoutUser}>
                    Logout <span className="sr-only"></span>
                  </button>
                </li>

              </>
            ) : (
              <li className="nav-item ml-5">
                <button className="nav-link" onClick={goToLogin}>
                  Login <span className="sr-only"></span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
export default Header;
