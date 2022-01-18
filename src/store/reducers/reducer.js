import * as actionTypes from "../actions/actionTypes";

const initialState = {
  introScreenData: {},
  startScreenData: {},
  destinationScreenData: {},
  basicInfoScreenData: {},
  contactInfoScreenData: {},
  passengersInfoScreenData: {},
};


const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.SAVE_INTRO_SCREEN_DATA:
      return saveIntroScreenData(state, action);
    case actionTypes.SAVE_START_SCREEN_DATA:
      return saveStartScreenData(state, action);
    case actionTypes.SAVE_DESTINATION_SCREEN_DATA:
      return saveDestinationScreenData(state, action);
    case actionTypes.SAVE_BASIC_INFO_SCREEN_DATA:
      return saveBasicInfoScreenData(state, action);
    case actionTypes.SAVE_CONTACT_INFO_SCREEN_DATA:
      return saveContactInfoScreenData(state, action);
    case actionTypes.SAVE_PASSENGERS_INFO_SCREEN_DATA:
      return passengersInfoScreenData(state, action);
  }
  return state;
};

const saveIntroScreenData = (state, action) => {
  return {
    ...state,
    introScreenData: action.introScreenData,
  };
};

const saveStartScreenData = (state, action) => {
  return {
    ...state,
    startScreenData: action.startScreenData,
  };
};

const saveDestinationScreenData = (state, action) => {
  return {
    ...state,
    destinationScreenData: action.destinationScreenData,
  };
};

const saveBasicInfoScreenData = (state, action) => {
  return {
    ...state,
    basicInfoScreenData: action.basicInfoScreenData,
  };
};


const saveContactInfoScreenData = (state, action) => {
  return {
    ...state,
    contactInfoScreenData: action.contactInfoScreenData,
  };
};

const passengersInfoScreenData = (state, action) => {
  console.log("akcija", action)
  console.log("akcija2", action.passengersInfoScreenData)

  return {
    ...state,
    passengersInfoScreenData: action.passengersInfoScreenData,
  };
};


export default reducer;