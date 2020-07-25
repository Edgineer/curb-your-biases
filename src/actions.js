
export const SELECT_LANGUAGE = "SELECT_LANGUAGE";
export const GET_NEW_WORDS = "GET_NEW_WORDS";
export const PROVIDE_NEW_INPUT = "PROVIDE_NEW_INPUT";
export const COMPLETE_TUTORIAL = "COMPLETE_TUTORIAL";
export const RESET_LANGUAGE = "RESET_LANGUAGE";

export const selectLanguage = lang => ({
  type: SELECT_LANGUAGE,
  language: lang
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

export const resetLanguage = () => ({
  type: RESET_LANGUAGE
});
