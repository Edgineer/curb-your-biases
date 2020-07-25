import React from "react";
import '../index.css';
import { connect } from 'react-redux';
import {getNewWords, provideNewInput, completeTutorial} from "../actions";
import { checkInput, resetWords } from "../functionalities";


class Tutorial extends React.Component {
  constructor(props){
    super(props);

    var randWords = localStorage.getItem("randWords");
    var numWords =  localStorage.getItem("numWords");
    this.props.dispatch(getNewWords(randWords,numWords))

    var curInput = localStorage.getItem("userInput");
    this.props.dispatch(provideNewInput(curInput));

    this.state = {
      isClicked: [false],
      charCount: curInput.length,
      hasSubmitted: false,
      errors: []
    }    

    this.translationToggle = this.translationToggle.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.validateSubmission = this.validateSubmission.bind(this);
    this.exitTutorial = this.exitTutorial.bind(this);
  }

  translationToggle(indexToSwitch) {
    this.setState((state) => {
      const isClicked = state.isClicked.map((item, i) => {
        if (indexToSwitch === i) {return !item;}
        else {return item;}
      });
      return {isClicked};
    });
  }

  handleUserInput(event) {
    var input = event.target.value;
    this.setState({
      charCount: input.length
    });
    localStorage.setItem("userInput",input);
    this.props.dispatch(provideNewInput(input));
  }

  validateSubmission() {
    var checkPromise = checkInput(this.props.userInput);
    checkPromise.then((errList) => {
      this.setState({
        hasSubmitted: true,
        errors: errList
      });
    });
  }

  exitTutorial(){
    var newSessionParams = resetWords();

    localStorage.setItem("numWords", newSessionParams.numWords);
    localStorage.setItem("userInput", "");
    localStorage.setItem("randWords", newSessionParams.randWords);

    this.props.dispatch(getNewWords(newSessionParams.randWords, newSessionParams.numWords));

    localStorage.setItem("didTutorial", "true");
    this.props.dispatch(completeTutorial());
  }

  render(){

    var randWordsObj = JSON.parse(this.props.randWords);
    var randWordsObjKeys = Object.keys(randWordsObj);
    var randWordsObjList = [];
    randWordsObjKeys.map((k) => {
      randWordsObjList.push(randWordsObj[k]);
    })
    const randWordList = randWordsObjList.map((randWord, i) =>(
      <li>
        <button onClick={() => this.translationToggle(i)}>
          {this.state.isClicked[i] ? randWord.translation : randWord.word}
        </button>
      </li>
    ));

    let feedbackMessage;
    if (!this.state.hasSubmitted){
      feedbackMessage = <button id="submit" onClick={this.validateSubmission}>Check my submission!</button>
    }
    else if(this.state.errors.length == 0){
      feedbackMessage = <>
        <p className="feedbackText" id="passed">Well done!</p>
        <br />
        <button id="submit" onClick={this.exitTutorial}>Complete Tutorial!</button>
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
        <button id="submit" onClick={this.validateSubmission}>Check again!</button>
      </>
    }

    return (
      <>
        <h1>Mumbo Jumbo Tutorial</h1>
        <p>Click on the word to see its English translation</p>
        <ul>{randWordList}</ul>
        <p> Write a sentence in {this.props.language} that contains the word(s) from the buttons:</p>
        <div>
          <textarea value={this.props.userInput} onChange={this.handleUserInput} spellcheck="false" maxlength="128"/>
          <p id="charCount">{this.state.charCount}/128</p>
        </div>
        <br />
        {feedbackMessage}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  didTutorial: state.didTutorial,
  language: state.language,
  numWords: state.numWords,
  userInput: state.userInput,
  randWords: state.randWords
})

export default connect(mapStateToProps)(Tutorial);
