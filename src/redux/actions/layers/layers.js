// import { Dispatch } from "redux";
import {
  ADD_LAYER_IMAGE,
  CREATE_LAYER,
  DELETE_IMAGE,
  REMOVE_LAYER_IMAGE,
  SET_SELECTED_LAYER,
  UPDATE_LAYERS,
  UPDATE_RARITY,
  REMOVE_LAYER,
} from "../../constants/layers/layers";
// import { Image, Layer } from "../../../engine";

export const createLayers = (layer) => (dispatch) => {    //: Layer : Dispatch
  console.log('create layer', layer, dispatch)
  dispatch({
    type: CREATE_LAYER,
    payload: layer,
  });
};

export const updateLayers = (layers) => (dispatch) => { //: Array<Layer>  : Dispatch
  dispatch({
    type: UPDATE_LAYERS,
    payload: layers,
  });
};

export const removeLayers = (layers) => (dispatch) => { //: Array<Layer>  : Dispatch
  dispatch({
    type: REMOVE_LAYER,
    payload: layers,
  });
};

export const setSelectedLayer = (layerIndex) => (   //: number
  dispatch    //: Dispatch
) => {
  dispatch({
    type: SET_SELECTED_LAYER,
    payload: layerIndex,
  });
};

export const addLayerPath = (layerIndex, image) => (   //: number   : Image
  dispatch    //: Dispatch
) => {
  dispatch({
    type: ADD_LAYER_IMAGE,
    payload: { index: layerIndex, image },
  });
};

export const removeLayerPath = (layerIndex, image) => (    //: number   : Image
  dispatch    //: Dispatch
) => {
  dispatch({
    type: REMOVE_LAYER_IMAGE,
    payload: { index: layerIndex, image },
  });
};

export const updateRarity = (
  index,    //: number
  imageIndex,   //: number
  rarity    //: number
) => (dispatch) => {    //: Dispatch
  dispatch({
    type: UPDATE_RARITY,
    payload: {
      index,
      imageIndex,
      rarity,
    },
  });
};

export const deleteImage = (layerIndex, imageIndex) => (    //: number    : number
  dispatch    //: Dispatch
) => {
  dispatch({
    type: DELETE_IMAGE,
    payload: { layerIndex, imageIndex },
  });
};
