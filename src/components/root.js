import React from "react";
import Session from "./session.js";
import Welcome from "./welcome.js";
import Tutorial from "./tutorial.js";
import { connect } from 'react-redux';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    var mainScreen;
    if(this.props.language == null){
      mainScreen = <Welcome />
    } else if (this.props.didTutorial != "true") {
      mainScreen = <Tutorial />
    } else {
      mainScreen = <Session />
    }
    return (mainScreen);
  }
}

const mapStateToProps = (state) => ({
  language: state.language,
  didTutorial: state.didTutorial
})

export default connect(mapStateToProps)(Root);
