var accents = require('remove-accents');
import {langMap} from "./languageMap";

/*
 * Retrieves the voice to be used in the voice API based on the state's current language
 * @returns {String} value passed to the text to speech API that indicated which voice to use
 */
export function getVoice () {
  var userLang = localStorage.getItem("language");
  var userLangObj = langMap.get(userLang);
  return userLangObj.voice;
}

/*
 * Retrieves the default hello session of the state's current langauge, used for the tutorial component
 * @returns {Object}  {"0": {"word": "hello", "translation": "hello"}}
 */
export function getDefaultSession () {
  var userLang = localStorage.getItem("language");
  var userLangObj = langMap.get(userLang);
  return userLangObj.defaultSession;
}

/*
 * Calculates the number of words, creates the translation array, and selects the words for the next session
 *
 * @params {Integer} maxNumRandWords - the maximum number of random words to be given per session
 * @returns {Object} {
 *  isClicked - bool arr of size randNum set to false to see original words first
 *  numWords - number of words in the next session
 *  randWords - object containing the new words and their translations
 * }
 */
export function resetWords (maxNumRandWords) {
  // get a random number between [1-maxNumRandWords]
  var randNum = Math.floor(Math.random() * maxNumRandWords) + 1;
  
  // initialize array of size randNum
  var translationArr = Array(randNum).fill(false);
  
  // gather language paramters
  var userLang = localStorage.getItem("language");
  var userLangObj = langMap.get(userLang);
  var vocabWords = userLangObj.vocab;

  // get the new words
  var newRandWords = [];
  for (let i = 0; i < randNum; i++) {
    var randWord = vocabWords[Math.floor(Math.random()*vocabWords.length)];
    newRandWords.push({"word": randWord.word, "translation": randWord.translation});
  }

  // create object of new words
  var randWordsObject = {};
  newRandWords.map((word,i) => {
    randWordsObject[i] = word;
  });

  var newSessionParams = {
    isClicked: translationArr,
    numWords:   randNum.toString(),
    randWords: JSON.stringify(randWordsObject)
  }
  return newSessionParams;
}

/*
 * Finds the required words that were not used by the users in their text submission
 *
 * @params {String} userInput - the current value typed into the textbox by the user
 * @params {Object} randWords - object containing the session required words
 * @returns {String} concatenation of words that were not used by user
 */
function getRandWordsNotUsed (userInput, randWords) {
  var lowerInput = userInput.toLowerCase();
  var santizedInput = accents.remove(lowerInput);
  var wordsNotUsed = [];

  var randWordsObj = JSON.parse(randWords);
  var randWordsObjKeys = Object.keys(randWordsObj);
  var randWordsObjList = [];

  randWordsObjKeys.map((k) => {
    randWordsObjList.push(randWordsObj[k]);
  })

  randWordsObjList.forEach(wordObj => {
    var lowerWord = wordObj.word.toLowerCase();
    var sanitizedWord = accents.remove(lowerWord);
    if (!santizedInput.includes(sanitizedWord)) {
      wordsNotUsed.push(wordObj.word);
    }
  });

  return wordsNotUsed.join(", ");
}

/*
 * Check the user submitted input for use of every word and mistakes via lang tool api
 *
 * @params {String} userInput - the current value typed into the textbox by the user
 * @params {Object} randWords - object containing the session required words
 * @returns {Object} list of errors found when checking input
 */
export const checkInput = async function(userInput, randWords) {
  var errList = [];

  // add words not used to errList
  var wordsNotUsed = getRandWordsNotUsed(userInput, randWords);
  if (wordsNotUsed != ""){
    var errObj = {};
    errObj["message"] = "One or more required words were not used.";
    errObj["mistake"] = wordsNotUsed;
    errObj["suggestions"] = ["Use the required words"];
    errList.push(errObj);
  }

  // grab current language properties
  var userLang = localStorage.getItem("language");
  var userLangObj = langMap.get(userLang);
  var langCode = userLangObj.code;

  // set lang tool api parameters
  var payload = new URLSearchParams();
  payload.set("text", userInput);
  payload.set("language",langCode);
  payload.set("enabledOnly","false");
  
  // send request to lang tool api
  var res = await fetch("https://languagetool.org/api/v2/check",{
    method: 'POST',
    body: payload.toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  // request failed
  if(!res.ok){
    //Improve error handling
    console.log("Sorry there is an unexpected error!");
  }

  // request was successful
  var data = await res.json();
  // add errors found by lang tool api to errList
  data.matches.forEach(error => {
    var errObj = {};
    errObj["message"] = error["message"];

    var mistake = error["sentence"].slice(error["offset"],error["offset"]+error["length"]);
    errObj["mistake"] = mistake;

    var suggestions = [];
    // grab the top 3 suggestions to fix the error offered by lang tool
    for (let i = 0; i < error["replacements"].length && i <= 2; i++) {
      suggestions.push(error["replacements"][i]["value"]);
    }
    errObj["suggestions"] = suggestions;

    errList.push(errObj);
  });
  return errList;
}
