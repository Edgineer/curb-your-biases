import React from "react";
import './index.css';
import "regenerator-runtime/runtime.js";

var frenchWords = require("../french.json");

class Session extends React.Component {
  constructor(props){
    super(props);
    this.state= { 
      numWords: 0,
      randWords: [],
      isClicked: [],
      userInput: "",
      charCount: 0,
      hasSubmitted: false,
      errors: []
    }
    this.reset = this.reset.bind(this);
    this.definitionToggle = this.definitionToggle.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.checkInput = this.checkInput.bind(this);
  }

  reset () {
    var num = Math.floor(Math.random() * (5 - 2)) + 2;
    var noHover = Array(num).fill(false);
    var newRandWords = [];
    for (let i = 0; i < num; i++) {
      var randWord = frenchWords[Math.floor(Math.random()*frenchWords.length)];
      newRandWords.push({"word": randWord.word, "translation": randWord.translation});
    }
    this.setState(() => {
      return { 
        numWords: num,
        randWords: [...newRandWords],
        isClicked: [...noHover],
        userInput: "",
        charCount: 0,
        hasSubmitted: false,
        errors: []
      }
    });
  }

  componentDidMount() {
    //POSSIBLE TODO:
    //check in the google local storage and set the correct states
    this.reset();
  }

  definitionToggle(index) {
    this.setState((state) => {
      const isClicked = state.isClicked.map((item,i) => {
        if (index === i) {return !item;}
        else {return item;}
      });
      return {isClicked};
    });
  }

  handleUserInput(event){
    var input = event.target.value;
    this.setState({
      userInput: input,
      charCount: input.length
    });
  }

  async checkInput() {
    var payload = new URLSearchParams();
    payload.set("text",this.state.userInput);
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
    this.setState({
      hasSubmitted: true,
      errors: errList
    });
  }

  render() {
    const randWordList = this.state.randWords.map((randWord, i) =>(
      <li>
        <button onClick={() => this.definitionToggle(i)}>
          {this.state.isClicked[i] ? randWord.translation : randWord.word}
        </button>
      </li>
    ));

    let feedbackMessage;
    if (!this.state.hasSubmitted){
      feedbackMessage = <button id="submit" onClick={this.checkInput}>Check!</button>
    }
    else if(this.state.errors.length == 0){
      feedbackMessage = <>
        <p className="feedbackText" id="passed">Voila! Well done</p>
        <button id="submit" onClick={this.reset}>More Words!</button>
      </>
    }
    else {
      var errorsDisplay = this.state.errors.map(err => (
        <>
          <p id="mistake" className="feedbackText">{err.message}</p>
          <p className="feedbackText">Mistake: <span id="mistake">{err.mistake}</span></p>
          <p className="feedbackText"><span>Suggestions: </span> 
            { err.suggestions.length == 0 
              ? <span id="mistake">No matches found :/</span>
              : err.suggestions.map((e, i) => [
                i > 0 && ", ",
                <span id="passed">{e}</span>
              ])
            }
          </p>
          <br />
        </>
      ));
      feedbackMessage = <>
        {errorsDisplay}
        <br />
        <button id="submit" onClick={this.checkInput}>Check!</button>
      </>
    }
    return (
    <>
      <h1>Mumbo Jumbo!</h1>
      <p> Create a sentence that contains the following words:</p>
      <ul>{randWordList}</ul>
      <div>
        <textarea value={this.state.userInput} onChange={this.handleUserInput} spellcheck="false" maxlength="128"/>
      </div>
      <p id="charCount">{this.state.charCount}/128</p>
      <br />
      {feedbackMessage}
      <hr />
      <span>
        <p className="footer">Created by Edgineer</p>
      </span>
    </>
    );
  }
}

export default Session;
