import {
  SELECT_LANGUAGE, 
  COMPLETE_TUTORIAL,
  PROVIDE_NEW_INPUT,
  GET_NEW_WORDS,
  ENTER_SETTINGS,
  EXIT_SETTINGS,
  SET_MAX_NUM_RAND_WORDS
 } from './actions';

const getInitialState = () => {

  var language = localStorage.getItem("language");
  var voice = localStorage.getItem("voice");
  var didTutorial = localStorage.getItem("didTutorial");
  var numWords = localStorage.getItem("numWords");
  var userInput = localStorage.getItem("userInput");
  var randWords = localStorage.getItem("randWords");
  var maxNumRandWords = localStorage.getItem("maxNumRandWords");
  //FUTURE ADDITION: more language options & levels
  //var level = localStorage.getItem("level");

  var initState = {
    "language": language,
    "voice": voice,
    "didTutorial": didTutorial,
    "numWords": numWords,
    "userInput": userInput,
    "randWords": randWords,
    "maxNumRandWords": maxNumRandWords,
    "settings": false
    //FUTURE ADDITION: more language options & levels
    //"level": level
  };

  return initState;
}

export const rootReducer = (state = getInitialState(), action) => {
  switch (action.type){
    case SELECT_LANGUAGE:
      return Object.assign({}, state, {
        language: action.language,
        voice: action.voice
      })
    case COMPLETE_TUTORIAL:
      return Object.assign({}, state, {
        didTutorial: "true"
      })
    case GET_NEW_WORDS:
      return Object.assign({}, state, {
        userInput: "",
        randWords: action.words,
        numWords: action.num 
      })
    case PROVIDE_NEW_INPUT:
      return Object.assign({}, state, {
        userInput: action.input
      })
    case ENTER_SETTINGS:
      return Object.assign({}, state, {
        settings: true
      })
    case EXIT_SETTINGS:
      return Object.assign({}, state, {
        settings: false
      })
    case SET_MAX_NUM_RAND_WORDS:
      return Object.assign({}, state, {
        maxNumRandWords: action.maxNumRandWords
      })
    default:
      return state;
  }
}
