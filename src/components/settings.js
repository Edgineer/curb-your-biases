import React from "react";
import '../index.css';
import { connect } from 'react-redux';
import { selectLanguage, getNewWords, exitSettings, setMaxNumRandWords } from "../actions";
import { getVoice, getDefaultSession } from '../functionalities';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxNumRandWords: this.props.maxNumRandWords,
      curLanguage: this.props.language
    }

    this.selectMaxWords = this.selectMaxWords.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
    this.handleLangSelection = this.handleLangSelection.bind(this);
  }

  handleLangSelection(event) {this.setState({curLanguage: event.target.value});}

  selectMaxWords (event) {this.setState({maxNumRandWords: event.target.value});}

  saveChanges () {
    if (this.props.language !== this.state.curLanguage) {
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

    localStorage.setItem("maxNumRandWords", this.state.maxNumRandWords);
    this.props.dispatch(setMaxNumRandWords(this.state.maxNumRandWords));

    this.props.dispatch(exitSettings(this.state.maxNumRandWords));
  }

  cancelChanges () {
    this.props.dispatch(exitSettings());
  }

  render() {
    return (
      <>
        <h1>Mumbo Jumbo settings</h1>
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
        <p>Select the maximum number of words you'd like per prompt.</p>
        <form>
          <select value={this.state.maxNumRandWords} onChange={this.selectMaxWords}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </form>
        <br />
        <br />
        <div id="settings-btn-row">
          <button id="start" onClick={this.saveChanges}>Save Changes</button>
          <button onClick={this.cancelChanges}>Cancel</button>
        </div>
      </>
    )
  }

}

const mapStateToProps = (state) => ({
  language: state.language,
  maxNumRandWords: state.maxNumRandWords
})

export default connect(mapStateToProps)(Settings);
