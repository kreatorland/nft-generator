// import { Dispatch } from "redux";
import { SET_DATA } from "../../constants/data/data";

export const setData = (data) => (dispatch) => {  //: any  : Dispatch
  console.log('haahahahahahahah') 
  dispatch({
    type: SET_DATA,
    payload: data,
  });
};
