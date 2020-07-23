var frenchWords = require("../languages/french.json");
var spanishWords = require("../languages/spanish.json");

export function resetWords () {
  var num = Math.floor(Math.random() * (5 - 2)) + 2;
  var noHover = Array(num).fill(false);
  
  var userLanguage = localStorage.getItem("language");
  var words;
  switch (userLanguage) {
    case "french":
      words = frenchWords;
      break;
    case "spanish":
      words = spanishWords;
      break;  
    default:
     break;
 }
  var newRandWords = [];
  for (let i = 0; i < num; i++) {
    var randWord = words[Math.floor(Math.random()*words.length)];
    newRandWords.push({"word": randWord.word, "translation": randWord.translation});
  }

  var randWordsObject = {};
  newRandWords.map((word,i) => {
    randWordsObject[i] = word;
  });
  
  var numRandWordsStr = newRandWords.length.toString();

  var newSessionParams = {
    isClicked: noHover,
    numWords: numRandWordsStr,
    randWords: JSON.stringify(randWordsObject)
  }
  return newSessionParams;
}


export const checkInput = async function(userInput) {
  var userLanguage = localStorage.getItem("language");
  var langCode;
  switch (userLanguage) {
    case "french":
      langCode = "fr";
      break;
    case "spanish":
      langCode = "es";
      break;  
    default:
     break;
 }

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
  var errList = [];
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
