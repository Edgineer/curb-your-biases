import {
  SELECT_LANGUAGE, 
  COMPLETE_TUTORIAL,
  PROVIDE_NEW_INPUT,
  GET_NEW_WORDS,
  RESET_LANGUAGE
 } from './actions';

const getInitialState = () => {

  var language = localStorage.getItem("language");
  var didTutorial = localStorage.getItem("didTutorial");
  var numWords = localStorage.getItem("numWords");
  var userInput = localStorage.getItem("userInput");
  var randWords = localStorage.getItem("randWords");
  //FUTURE ADDITION: more language options & levels
  //var level = localStorage.getItem("level");

  var initState = {
    "language": language,
    "didTutorial": didTutorial,
    "numWords": numWords,
    "userInput": userInput,
    "randWords": randWords 
    //FUTURE ADDITION: more language options & levels
    //"level": level
  };

  return initState;
}

export const rootReducer = (state = getInitialState(), action) => {
  switch (action.type){
    case SELECT_LANGUAGE:
      return Object.assign({}, state, {
        language: action.language
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
    case RESET_LANGUAGE:
      return Object.assign({}, state, {
        language: null
      })
    default:
      return state;
  }
}
