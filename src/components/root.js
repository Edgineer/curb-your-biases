import React from "react";
import Session from "./session";
import Welcome from "./welcome";
import Tutorial from "./tutorial";
import Settings from "./settings";
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
    } else if (this.props.settings) {
      mainScreen = <Settings />
    } else {
      mainScreen = <Session />
    }
    return (mainScreen);
  }
}

const mapStateToProps = (state) => ({
  language: state.language,
  didTutorial: state.didTutorial,
  settings: state.settings
})

export default connect(mapStateToProps)(Root);
