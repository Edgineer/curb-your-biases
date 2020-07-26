import React from "react";
import '../index.css';
import { connect } from 'react-redux';
import { selectLanguage, getNewWords, provideNewInput } from '../actions';

class Welcome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      curLanguage: "french"
    }

    this.getStarted = this.getStarted.bind(this);
    this.handleLangSelection = this.handleLangSelection.bind(this);
  }

  handleLangSelection(event) {
    this.setState({curLanguage: event.target.value});
  }

  getStarted() {
    var firstSession;
    var voice;
    switch (this.state.curLanguage) {
      case "french":
        firstSession = {"0": {"word":"Bonjour","translation":"Hello"}};
        voice = "French Female";
        break;
      case "spanish":
        firstSession = {"0": {"word":"Hola","translation":"Hello"}};
        voice = "Spanish Female";
        break;
      default:
        break;
    }

    if (this.props.didTutorial == null) { 
      //Actually the first time the tutorial is being accessed, localStorage values have never been set
      localStorage.setItem("didTutorial","false");
    }
    localStorage.setItem("numWords", "1");
    localStorage.setItem("userInput", "");
    localStorage.setItem("randWords", JSON.stringify(firstSession));

    var randWords = localStorage.getItem("randWords");
    var numWords =  localStorage.getItem("numWords");
    this.props.dispatch(getNewWords(randWords,numWords))

    this.props.dispatch(selectLanguage(this.state.curLanguage, voice));
    localStorage.setItem("language",this.state.curLanguage);
    localStorage.setItem("voice", voice);
  }

  render(){
    return (
      <>
        <h1>Welcome to Mumbo Jumbo!</h1>
        <p>Select a language to begin practicing!</p>
        <br />
        <form>
          <select value={this.state.curLanguage} onChange={this.handleLangSelection}>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
          </select>
        </form>
        <br />
        <button id="start" onClick={this.getStarted}>Get Started!</button>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  didTutorial: state.didTutorial
})

export default connect(mapStateToProps)(Welcome);
