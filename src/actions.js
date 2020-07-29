export const SELECT_LANGUAGE = "SELECT_LANGUAGE";
export const GET_NEW_WORDS = "GET_NEW_WORDS";
export const PROVIDE_NEW_INPUT = "PROVIDE_NEW_INPUT";
export const COMPLETE_TUTORIAL = "COMPLETE_TUTORIAL";
export const ENTER_SETTINGS = "ENTER_SETTINGS";
export const EXIT_SETTINGS = "EXIT_SETTINGS";
export const SET_MAX_NUM_RAND_WORDS = "SET_MAX_NUM_RAND_WORDS";

export const selectLanguage = (lang, voice) => ({
  type: SELECT_LANGUAGE,
  language: lang,
  voice: voice
});

export const getNewWords = (words, num) => ({
  type: GET_NEW_WORDS,
  words: words,
  num: num
});

export const provideNewInput = input => ({
  type: PROVIDE_NEW_INPUT,
  input
});

export const completeTutorial = () => ({
  type: COMPLETE_TUTORIAL
});

export const enterSettings = () => ({
  type: ENTER_SETTINGS
});

export const exitSettings = () => ({
  type: EXIT_SETTINGS,
});

export const setMaxNumRandWords = maxNumRandWords => ({
  type: SET_MAX_NUM_RAND_WORDS,
  maxNumRandWords
})
