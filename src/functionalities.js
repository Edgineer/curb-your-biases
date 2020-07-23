var frenchWords = require("../languages/french.json");

export function resetWords () {
  var num = Math.floor(Math.random() * (5 - 2)) + 2;
  var noHover = Array(num).fill(false);
  var newRandWords = [];
  for (let i = 0; i < num; i++) {
    var randWord = frenchWords[Math.floor(Math.random()*frenchWords.length)];
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
  var payload = new URLSearchParams();
  payload.set("text", userInput);
  payload.set("language","fr");
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
