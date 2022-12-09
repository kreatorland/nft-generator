// import { Action } from "redux";
// import { iData } from "../../types/initialStates";
import data from "./data";

export default (state, action) => {   //: iData  : Action
  return {
    ...state,
    ...data(state, action),
  };
};
