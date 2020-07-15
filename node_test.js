var SpellChecker = require('simple-spellchecker');
var dictionary = SpellChecker.getDictionarySync("fr-FR");   

var userInput = "j'habiter";

function checkInput() {
  console.log("userInput is: " + userInput);
    var misspelled = !dictionary.spellCheck(userInput);
    if(misspelled) {
        var suggestions = dictionary.getSuggestions(userInput);
        console.log("incorrecto: " + suggestions);
    } else {console.log("Spelled Correctly!");}
}

checkInput();