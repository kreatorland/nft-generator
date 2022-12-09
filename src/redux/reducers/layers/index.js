// import { Action } from "redux";
// import { iLayers } from "../../types/initialStates";
import layers from "./layers";

export default (state, action) => {   //: iLayers  : Action
  return {
    ...state,
    ...layers(state, action),
  };
};
