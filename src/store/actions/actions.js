import * as actionTypes from './actionTypes';

export const saveIntroScreenData = (introScreenData) => {
  return {
    type: actionTypes.SAVE_INTRO_SCREEN_DATA,
    introScreenData: introScreenData
  };
};

export const saveStartScreenData = (startScreenData) => {
  return {
    type: actionTypes.SAVE_START_SCREEN_DATA,
    startScreenData: startScreenData
  };
};

export const saveDestinationScreenData = (destinationScreenData) => {
  return {
    type: actionTypes.SAVE_DESTINATION_SCREEN_DATA,
    destinationScreenData: destinationScreenData
  };
};

export const saveBasicInfoScreenData = (basicInfoScreenData) => {
  return {
    type: actionTypes.SAVE_BASIC_INFO_SCREEN_DATA,
    basicInfoScreenData: basicInfoScreenData
  };
};

export const saveContactInfoScreenData = (contactInfoScreenData) => {
  return {
    type: actionTypes.SAVE_CONTACT_INFO_SCREEN_DATA,
    contactInfoScreenData: contactInfoScreenData
  };
};

export const savePassengersInfoScreenData = (passengersInfoScreenData) => {
  return {
    type: actionTypes.SAVE_PASSENGERS_INFO_SCREEN_DATA,
    passengersInfoScreenData: passengersInfoScreenData
  };
};