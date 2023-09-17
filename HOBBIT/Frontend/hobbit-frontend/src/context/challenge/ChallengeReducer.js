const challengeReducer = (state, action) => {
  switch (action.type) {
    case "GET_MY_CHALLENGES":
      return {
        ...state,
        challenges: action.payload,
        loading: false,
      };
    case "GET_SEARCH":
      return {
        ...state,
        challenges: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default challengeReducer;
