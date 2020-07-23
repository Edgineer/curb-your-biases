import React from "react";
import '../index.css';
import { connect } from 'react-redux';
import { selectLanguage, getNewWords, provideNewInput } from '../actions';

class Welcome extends React.Component {
  constructor(props){
    super(props);

    if (this.props.didTutorial == null) { 
      //Actually the first time the tutorial is being accessed, localStorage values have never been set
      localStorage.setItem("didTutorial","false");
      localStorage.setItem("numWords", "1");
      localStorage.setItem("userInput", "");
      var firstSet = {"0": {"word":"Bonjour","translation":"Hello"}};
      localStorage.setItem("randWords", JSON.stringify(firstSet));
    }

    var randWords = localStorage.getItem("randWords");
    var numWords =  localStorage.getItem("numWords");
    this.props.dispatch(getNewWords(randWords,numWords))

    var curInput = localStorage.getItem("userInput");
    this.props.dispatch(provideNewInput(curInput));

    this.getStarted = this.getStarted.bind(this);
  }

  getStarted() {
    this.props.dispatch(selectLanguage("french"));
    localStorage.setItem("language","french");
  }

  render(){
    return (
      <>
        <h1>Welcome to Mumbo Jumbo!</h1>
        <p>Let's get you started practicing French!</p>
        <br />
        <button onClick={this.getStarted}>Get Started!</button>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  didTutorial: state.didTutorial
})

export default connect(mapStateToProps)(Welcome);
