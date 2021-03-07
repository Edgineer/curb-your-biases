import React from "react";
import Session from "./session";
import Welcome from "./welcome";
import Tutorial from "./tutorial";
import Settings from "./settings";
import { connect } from 'react-redux';

// root component of the app which decides what component to render
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

// the redux store state is supplied, we extract the values we need and they are mapped as props for the component
const mapStateToProps = (state) => ({
  language: state.language,
  didTutorial: state.didTutorial,
  settings: state.settings
})

// connects the Root component to the redux store, it provides the connected component with the pieces of the data it needs from the store
export default connect(mapStateToProps)(Root);
