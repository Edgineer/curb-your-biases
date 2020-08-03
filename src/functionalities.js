var accents = require('remove-accents');
import {langMap} from "./languageMap";

export function getVoice () {
  var userLang = localStorage.getItem("language");
  var userLangObj = langMap.get(userLang);
  return userLangObj.voice;
}

export function getDefaultSession () {
  var userLang = localStorage.getItem("language");
  var userLangObj = langMap.get(userLang);
  return userLangObj.defaultSession;
}

export function resetWords (maxNumRandWords) {
  var randNum = Math.floor(Math.random() * maxNumRandWords) + 1; //random number between [1-maxNumRandWords]
  var translationArr = Array(randNum).fill(false);
  
  var userLang = localStorage.getItem("language");
  var userLangObj = langMap.get(userLang);
  var vocabWords = userLangObj.vocab;

  var newRandWords = [];
  for (let i = 0; i < randNum; i++) {
    var randWord = vocabWords[Math.floor(Math.random()*vocabWords.length)];
    newRandWords.push({"word": randWord.word, "translation": randWord.translation});
  }

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

export const checkInput = async function(userInput, randWords) {

  var errList = [];

  var wordsNotUsed = getRandWordsNotUsed(userInput, randWords);
  if (wordsNotUsed != ""){
    var errObj = {};
    errObj["message"] = "One or more required words were not used.";
    errObj["mistake"] = wordsNotUsed;
    errObj["suggestions"] = ["Use the required words"];
    errList.push(errObj);
  }

  var userLang = localStorage.getItem("language");
  var userLangObj = langMap.get(userLang);
  var langCode = userLangObj.code;

  var payload = new URLSearchParams();
  payload.set("text", userInput);
  payload.set("language",langCode);
  payload.set("enabledOnly","false");
  
  var res = await fetch("https://languagetool.org/api/v2/check",{
    method: 'POST',
    body: payload.toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  if(!res.ok){
    //Improve error handling
    console.log("Sorry there is an error!");
  }

  var data = await res.json();
  data.matches.forEach(error => {
    var errObj = {};
    errObj["message"] = error["message"];

    var mistake = error["sentence"].slice(error["offset"],error["offset"]+error["length"]);
    errObj["mistake"] = mistake;

    var suggestions = [];
    for (let i = 0; i < error["replacements"].length && i <= 2; i++) {
      suggestions.push(error["replacements"][i]["value"]);
    }
    errObj["suggestions"] = suggestions;

    errList.push(errObj);
  });
  return errList;
}
