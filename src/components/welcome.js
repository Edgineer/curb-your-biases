import React from "react";
import '../index.css';
import { connect } from 'react-redux';
import { selectLanguage, getNewWords } from '../actions';
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

  handleLangSelection(event) {
    this.setState({curLanguage: event.target.value});
  }

  getStarted() {
    
    if (this.props.didTutorial == null) { 
      //Actually the first time the tutorial is being accessed, localStorage values have never been set
      localStorage.setItem("didTutorial","false");
    }

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
  didTutorial: state.didTutorial
})

export default connect(mapStateToProps)(Welcome);
