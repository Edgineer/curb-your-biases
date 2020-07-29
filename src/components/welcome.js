import React from "react";
import '../index.css';
import { connect } from 'react-redux';
import { selectLanguage, getNewWords, setMaxNumRandWords } from '../actions';
import { getVoice, getDefaultSession } from '../functionalities';

class Welcome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      curLanguage: "english"
    }

    this.getStarted = this.getStarted.bind(this);
    this.handleLangSelection = this.handleLangSelection.bind(this);
  }

  handleLangSelection(event) { this.setState({curLanguage: event.target.value}); }

  getStarted() {
    localStorage.setItem("didTutorial","false");
    //didTutorial prop is still undefined since it is not dispatched to update
    localStorage.setItem("maxNumRandWords", "3");
    this.props.dispatch(setMaxNumRandWords("3"));

    localStorage.setItem("language",this.state.curLanguage);
    localStorage.setItem("numWords", "1");
    localStorage.setItem("userInput", "");

    var firstSession = getDefaultSession();
    localStorage.setItem("randWords", JSON.stringify(firstSession));
    this.props.dispatch(getNewWords(JSON.stringify(firstSession),"1"))

    var voice = getVoice();
    this.props.dispatch(selectLanguage(this.state.curLanguage, voice));
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
            <option value="english">English</option>
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
  settings: state.settings //do removal test later
})

export default connect(mapStateToProps)(Welcome);
