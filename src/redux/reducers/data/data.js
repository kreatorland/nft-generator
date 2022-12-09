import { SET_DATA } from "../../constants/data/data";
// import { iData } from "../../types/initialStates";

export default (state, { type, payload }) => {   //: iData : any
  switch (type) {
    case SET_DATA:
      return { ...state, ...payload };
    default:
      return null;
  }
};
