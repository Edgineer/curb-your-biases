
var frenchWords = require("../languages/french.json");
var spanishWords = require("../languages/spanish.json");

export const langMap = new Map([
  ["french", {
    "language": "French",
    "code": "fr",
    "voice": "French Female",
    "vocab": frenchWords,
    "defaultSession": {"0": {"word":"Bonjour","translation":"Hello"}}
  }],
  ["spanish", {
    "language": "Spanish",
    "code": "es",
    "voice": "Spanish Female",
    "vocab": spanishWords,
    "defaultSession": {"0": {"word":"Hola","translation":"Hello"}}
  }],
])
