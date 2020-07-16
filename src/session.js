import React from "react";
import './index.css';
import axios from "axios";
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
    this.mouseClick = this.mouseClick.bind(this);
    this.userTyping = this.userTyping.bind(this);
    this.checkInput = this.checkInput.bind(this);
  }

  reset () {
    var num = Math.floor(Math.random() * (5 - 2)) + 2;
    var initHover = Array(num).fill(false);
    var newWords = [];
    for (let i = 0; i < num; i++) {
      var randWord = frenchWords[Math.floor(Math.random()*frenchWords.length)];
      newWords.push({"word": randWord.word, "translation": randWord.translation});
    }
    this.setState(() => {
      return { 
        numWords: num,
        randWords: [...newWords],
        isClicked: [...initHover],
        userInput: "",
        charCount: 0,
        hasSubmitted: false,
        errors: []
      }
    });
  }

  componentDidMount() {
    this.reset();
  }

  mouseClick(index) {
    this.setState((state) => {
      const isClicked = state.isClicked.map((item,i) => {
        if (index === i) {return !item;}
        else {return item;}
      });
      return {isClicked};
    });
  }

  userTyping(event){
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
      console.log("Sorry there is an error!");
    }
    var data = await res.json();
    console.log(data);

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
    console.log(this.state.errors);
  }

  render() {
    const randWordList = this.state.randWords.map((randWord, i) =>(
      <li>
        <button onClick={() => this.mouseClick(i)}>
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
        <p id="passed">Voila! Well done</p>
        <button id="submit" onClick={this.reset}>More Words!</button>
      </>
    }
    else {
      var errorDisplay = this.state.errors.map(err => (
        <>
          <p id="mistakes">{err.message}</p>
          <p id="fixLine">Mistake: <span id="mistakes">{err.mistake}</span></p>
          <p id="fixLine"><span>Suggestions: </span> 
            {err.suggestions.map((e, i) => [
                i > 0 && ", ",
                <span id="passed">{e}</span>
            ])}
          </p>
        </>
      ));
      feedbackMessage = <>
        {errorDisplay}
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
        <textarea value={this.state.userInput} onChange={this.userTyping} spellcheck="false" maxlength="128"/>
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
